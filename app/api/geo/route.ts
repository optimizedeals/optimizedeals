import { NextResponse, type NextRequest } from "next/server";
import { htmlToMarkdown } from "@/lib/geo/convert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INTERNAL_FETCH_HEADER = "x-llm-internal-fetch";
const MAX_HTML_SIZE = 5 * 1024 * 1024;
const MAX_REDIRECTS = 3;

function isValidPath(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//")) return false;
  if (path.includes("://")) return false;
  const segments = path.split("/");
  if (segments.some((s) => s === ".." || s === ".")) return false;
  return true;
}

async function resolveHtml(
  request: NextRequest,
  path: string,
  depth = 0,
): Promise<{ html: string; finalUrl: string } | null> {
  if (depth >= MAX_REDIRECTS) return null;

  const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
  const url = new URL(path, baseUrl);
  const base = new URL(baseUrl);
  if (url.host !== base.host) return null;

  const headers: Record<string, string> = {
    [INTERNAL_FETCH_HEADER]: "1",
    Accept: "text/html",
  };
  const cookie = request.headers.get("cookie");
  if (cookie) headers["Cookie"] = cookie;

  const response = await fetch(url.toString(), {
    headers,
    redirect: "manual",
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (!location) return null;
    const redirectUrl = new URL(location, url);
    if (redirectUrl.host !== base.host) return null;
    return resolveHtml(request, redirectUrl.pathname + redirectUrl.search, depth + 1);
  }

  if (!response.ok) return null;

  const contentLength = response.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_HTML_SIZE) return null;

  const html = await response.text();
  if (!html.trim() || html.length > MAX_HTML_SIZE) return null;

  return { html, finalUrl: url.toString() };
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const rawPath =
    request.headers.get("x-llm-target-path") ??
    request.nextUrl.searchParams.get("path");

  if (!rawPath) {
    return new NextResponse("Missing path parameter", { status: 400 });
  }
  if (!isValidPath(rawPath)) {
    return new NextResponse("Invalid path parameter", { status: 400 });
  }

  try {
    const fetched = await resolveHtml(request, rawPath);
    if (!fetched) {
      return new NextResponse(`No markdown available for ${rawPath}`, {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const { markdown } = htmlToMarkdown(fetched.html, {
      url: fetched.finalUrl,
    });

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept, User-Agent",
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (err) {
    return new NextResponse(
      `Markdown generation failed: ${err instanceof Error ? err.message : "unknown"}`,
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }
}
