import { NextResponse, type NextRequest } from "next/server";

const INTERNAL_FETCH_HEADER = "x-llm-internal-fetch";
const GEO_ROUTE = "/api/geo";

const EXCLUDE_PATHS = [
  "/api/*",
  "/_next/*",
  "/monitoring*",
];

const BOT_USER_AGENTS = [
  "ChatGPT-User",
  "ClaudeBot",
  "GPTBot",
  "PerplexityBot",
  "Applebot-Extended",
  "Google-Extended",
  "CCBot",
  "anthropic-ai",
  "cohere-ai",
  "Claude-SearchTool",
];

function isExcluded(pathname: string): boolean {
  for (const pattern of EXCLUDE_PATHS) {
    if (pattern.endsWith("*")) {
      if (pathname.startsWith(pattern.slice(0, -1))) return true;
    } else if (pathname === pattern) {
      return true;
    }
  }
  return false;
}

function parseAcceptMarkdown(accept: string): number {
  for (const part of accept.split(",").map((s) => s.trim())) {
    const [mediaType, ...params] = part.split(";").map((s) => s.trim());
    if (mediaType?.toLowerCase() === "text/markdown") {
      const qParam = params.find((p) => p.startsWith("q="));
      if (qParam) {
        const q = parseFloat(qParam.slice(2));
        return isNaN(q) ? 1 : q;
      }
      return 1;
    }
  }
  return 0;
}

function detectLlmSignal(pathname: string, accept: string | null, userAgent: string | null): { targetPath: string } | null {
  if (pathname.endsWith(".md")) {
    return { targetPath: pathname.slice(0, -3) || "/" };
  }

  if (accept && parseAcceptMarkdown(accept) > 0) {
    return { targetPath: pathname };
  }

  if (userAgent) {
    for (const bot of BOT_USER_AGENTS) {
      if (userAgent.includes(bot)) {
        return { targetPath: pathname };
      }
    }
  }

  return null;
}

export default function proxy(request: NextRequest): NextResponse | null {
  if (request.headers.get(INTERNAL_FETCH_HEADER)) return null;

  const { pathname } = request.nextUrl;
  if (isExcluded(pathname)) return null;

  const accept = request.headers.get("accept");
  const userAgent = request.headers.get("user-agent");
  const signal = detectLlmSignal(pathname, accept, userAgent);

  if (!signal) return null;

  const url = request.nextUrl.clone();
  url.pathname = GEO_ROUTE;
  url.searchParams.set("path", signal.targetPath);

  const response = NextResponse.rewrite(url, {
    request: {
      headers: new Headers({
        ...Object.fromEntries(request.headers),
        "x-llm-target-path": signal.targetPath,
      }),
    },
  });

  response.headers.set("Vary", "Accept, User-Agent");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/og|api/geo).*)",
  ],
};
