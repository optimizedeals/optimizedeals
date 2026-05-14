<?xml version="1.0" encoding="UTF-8"?>
<!--
  Browser-friendly stylesheet for sitemap.xml.

  Crawlers ignore the XSLT and read the raw XML. Humans hitting the URL
  in Chrome 120+ (which no longer renders XML as a tree by default) get
  a sortable HTML table with hreflang alternates inline.
-->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <xsl:output method="html" indent="yes" encoding="UTF-8" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OptimizeDeals Sitemap</title>
        <style>
          :root {
            color-scheme: dark;
            --bg: #000216;
            --card: #0a0f24;
            --border: rgba(255,255,255,0.08);
            --muted: #7A8BA7;
            --fg: #e7ecf3;
            --accent: #3B80EC;
            --primary: #0054D6;
          }
          html, body {
            background: var(--bg);
            color: var(--fg);
            font-family: ui-sans-serif, system-ui, -apple-system, "Geist", sans-serif;
            margin: 0;
            padding: 0;
          }
          .wrap {
            max-width: 1100px;
            margin: 0 auto;
            padding: 48px 24px 80px;
          }
          h1 {
            font-size: 28px;
            font-weight: 500;
            margin: 0 0 8px;
          }
          p.lead {
            color: var(--muted);
            margin: 0 0 24px;
            font-size: 14px;
          }
          .meta {
            display: inline-flex;
            gap: 12px;
            padding: 4px 12px;
            border: 1px solid var(--border);
            border-radius: 999px;
            font-family: ui-monospace, "Geist Mono", monospace;
            font-size: 12px;
            color: var(--muted);
            margin-bottom: 32px;
          }
          .meta strong { color: var(--fg); font-weight: 500; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
          }
          thead th {
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--muted);
            padding: 12px 16px;
            background: rgba(255,255,255,0.02);
            border-bottom: 1px solid var(--border);
            font-weight: 500;
          }
          tbody td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border);
            font-size: 13px;
            vertical-align: top;
          }
          tbody tr:last-child td { border-bottom: 0; }
          a { color: var(--accent); text-decoration: none; }
          a:hover { color: var(--fg); text-decoration: underline; }
          .alts {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 6px;
          }
          .alts a {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            border: 1px solid var(--border);
            border-radius: 999px;
            font-size: 11px;
            font-family: ui-monospace, "Geist Mono", monospace;
            color: var(--muted);
          }
          .alts a:hover { color: var(--fg); border-color: var(--accent); }
          .priority {
            font-family: ui-monospace, "Geist Mono", monospace;
            color: var(--muted);
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1>Sitemap</h1>
          <p class="lead">
            Crawler-targeted index of every public URL on this site, across all supported locales.
          </p>
          <div class="meta">
            <span><strong><xsl:value-of select="count(sm:urlset/sm:url)" /></strong> URLs</span>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 52%;">URL</th>
                <th style="width: 14%;">Updated</th>
                <th style="width: 14%;">Frequency</th>
                <th style="width: 8%;">Priority</th>
                <th style="width: 12%;">Alternates</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <tr>
                  <td>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="sm:loc" />
                      </xsl:attribute>
                      <xsl:value-of select="sm:loc" />
                    </a>
                    <div class="alts">
                      <xsl:for-each select="xhtml:link">
                        <a>
                          <xsl:attribute name="href">
                            <xsl:value-of select="@href" />
                          </xsl:attribute>
                          <xsl:value-of select="@hreflang" />
                        </a>
                      </xsl:for-each>
                    </div>
                  </td>
                  <td><xsl:value-of select="substring(sm:lastmod, 1, 10)" /></td>
                  <td><xsl:value-of select="sm:changefreq" /></td>
                  <td class="priority"><xsl:value-of select="sm:priority" /></td>
                  <td class="priority"><xsl:value-of select="count(xhtml:link)" /></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
