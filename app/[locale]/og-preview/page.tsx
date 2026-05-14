import { Metadata } from "next";
import { getAllArticlesAcrossLocales } from "@/lib/mdx";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "OG Preview",
  robots: { index: false, follow: false },
};

const PAGES: { path: string; label: string }[] = [
  { path: "", label: "Homepage" },
  { path: "solutions", label: "Solutions" },
  { path: "products", label: "Products" },
  { path: "labs", label: "Labs" },
  { path: "insights", label: "Insights" },
  { path: "company", label: "Company" },
  { path: "careers", label: "Careers" },
  { path: "book", label: "Book" },
];

function buildPageOgUrl(path: string, locale: string) {
  const params = new URLSearchParams();
  params.set("locale", locale);
  if (path) params.set("path", path);
  return `/api/og?${params.toString()}`;
}

function buildArticleOgUrl(
  article: { title: string; description?: string; category?: string },
  locale: string,
) {
  const params = new URLSearchParams({
    locale,
    title: article.title,
    description: article.description || "",
    category: article.category || "",
  });
  return `/api/og?${params.toString()}`;
}

export default async function OgPreviewPage({ params }: PageProps) {
  const { locale } = await params;
  const articles = await getAllArticlesAcrossLocales();

  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-medium mb-2">OG Preview</h1>
          <p className="text-muted-foreground text-sm">
            Live render of every Open Graph image. Pages on top, articles below.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-xl font-medium mb-6 text-muted-foreground uppercase tracking-wider font-mono">
            Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PAGES.map(({ path, label }) => {
              const url = buildPageOgUrl(path, locale);
              return (
                <figure
                  key={path || "home"}
                  className="rounded-xl overflow-hidden border border-border/50 bg-card/30"
                >
                  <img
                    src={url}
                    alt={`OG image for ${label}`}
                    width={1200}
                    height={630}
                    className="w-full h-auto block"
                  />
                  <figcaption className="px-4 py-3 flex items-center justify-between text-sm">
                    <span className="font-medium">{label}</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-accent hover:text-foreground truncate ml-4"
                    >
                      {url}
                    </a>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-6 text-muted-foreground uppercase tracking-wider font-mono">
            Articles ({articles.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => {
              const url = buildArticleOgUrl(article, locale);
              return (
                <figure
                  key={article.slug}
                  className="rounded-xl overflow-hidden border border-border/50 bg-card/30"
                >
                  <img
                    src={url}
                    alt={`OG image for ${article.title}`}
                    width={1200}
                    height={630}
                    className="w-full h-auto block"
                  />
                  <figcaption className="px-4 py-3 flex flex-col gap-1 text-sm">
                    <span className="font-medium line-clamp-2">
                      {article.title}
                    </span>
                    <a
                      href={`/insights/${article.slug}`}
                      className="font-mono text-xs text-accent hover:text-foreground truncate"
                    >
                      /insights/{article.slug}
                    </a>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
