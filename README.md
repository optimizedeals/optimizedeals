<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./.github/cover-dark.jpg">
  <img alt="OptimizeDeals — Frontend Systems Platform" src="./.github/cover-light.jpg">
</picture>

<p align="center">
  <em>A runtime-oriented frontend engineering platform. Built with AI assistance.<br>Architected, supervised, and validated by human engineers.</em>
</p>

<p align="center">
  <a href="https://optimize.deals"><strong>optimize.deals</strong></a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#local-development">Develop</a> ·
  <a href="#open-source-philosophy">Philosophy</a> ·
  <a href="#contributing">Contribute</a>
</p>

---

## Overview

OptimizeDeals is a frontend systems platform. It is not a marketing website, not a SaaS dashboard, and not a content blog in the traditional sense. It is a runtime-oriented engineering environment designed to demonstrate, document, and distribute frontend infrastructure patterns at production scale.

The platform contains:

- **Solutions pages** — engineering capability descriptions organized as structured content
- **Products pages** — platform offerings with runtime-oriented documentation
- **Labs** — an active R&D environment for frontend experiments, runtime architecture investigations, and engineering research
- **Insights** — a full MDX-powered content system for deep engineering articles, architectural retrospectives, and systems-thinking pieces
- **Legal pages** — localized privacy and terms infrastructure with dynamic cookie data tables
- **Internationalization** — full locale-based content delivery across English and Brazilian Portuguese
- **SEO infrastructure** — deterministic metadata, structured data, sitemaps, hreflang, canonical URLs, and LLM.txt generation
- **AI-consumable repository design** — structured conventions, AGENTS.md, LLM.txt, and metadata systems built for both human and AI consumption

The platform was developed over 72 hours in an AI-assisted workflow involving three AI systems (v0.dev, Claude Code, ChatGPT) operating under continuous human supervision. The repository is open source. The conversation logs that produced it are available for inspection. The engineering is transparent by design.

---

## Engineering Philosophy

### Architecture Over Generation

AI accelerates implementation. It does not replace architectural reasoning. Every decision in this platform was supervised, validated, or directly made by a human engineer. The AI systems executed. The human layer stabilized.

### Systems Thinking

The platform is not a collection of pages. It is a system of interconnected runtime layers:

```
Metadata → SEO → Content → Localization → Rendering → Discovery
```

Each layer feeds the next. Metadata drives SEO. SEO drives content discoverability. Content feeds localization. Localization produces canonical and hreflang references. The rendering pipeline consumes all of it. This is not optional infrastructure. It is the architecture.

### Composability

Every component, page, and content type follows consistent patterns. The MDX rendering pipeline, the metadata generation system, the SEO infrastructure, and the internationalization layer all share a common architectural substrate. Adding a new feature means extending existing systems, not building new ones.

### Transparency

The repository is open source. The development process is documented. The AI conversation logs are available. This is not marketing. It is an engineering decision. Transparent systems invite scrutiny, and scrutiny improves quality.

---

## Architecture

### Platform Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Edge / CDN                             │
│              (Vercel Edge Network, caching)                  │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Next.js 16 Runtime                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Middleware (locale routing, redirects)               │  │
│  │  Server Components (default rendering strategy)       │  │
│  │  Client Components (when interactivity is required)   │  │
│  │  API Routes (OG image generation, sitemap, metadata)  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Content Layer                              │
│  ┌─────────────────────────┐  ┌───────────────────────────┐  │
│  │  MDX Runtime            │  │  i18n System              │  │
│  │  • next-mdx-remote/rsc  │  │  • Locale-based routing   │  │
│  │  • Shiki highlighting   │  │  • Translated content     │  │
│  │  • Custom components    │  │  • Localized metadata     │  │
│  │  • Dynamic metadata     │  │  • Hreflang generation    │  │
│  └─────────────────────────┘  └───────────────────────────┘  │
│  ┌─────────────────────────┐  ┌───────────────────────────┐  │
│  │  SEO Infrastructure    │  │  AI Repository Layer      │  │
│  │  • Canonical URLs      │  │  • AGENTS.md              │  │
│  │  • Structured data     │  │  • LLM.txt                │  │
│  │  • OpenGraph           │  │  • Structured metadata    │  │
│  │  • Sitemap / robots    │  │  • Machine-readable docs  │  │
│  └─────────────────────────┘  └───────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Route Architecture

```
/[locale]/
├── (home)               — Landing, hero, trust, insights section
├── solutions/           — Engineering capability pages
├── products/            — Platform offering pages
├── labs/                — R&D experiments and investigations
├── insights/            — MDX-powered engineering articles
│   └── [slug]           — Individual article (SSG with generateStaticParams)
├── company/             — About, careers, contact
├── book/                — Booking and consultation
├── careers/             — Careers and positions (MDX-powered)
├── og-preview/          — OG image preview gallery (dev-only)
└── legal/               — Privacy policy, terms (localized MDX)

Static routes:
├── robots.txt           — Generated robots configuration
└── api/
    ├── og               — Dynamic OG image generation
    └── sitemap          — Generated sitemap endpoint
```

---

## Core Technologies

| Layer                | Technology                                                   |
| -------------------- | ------------------------------------------------------------ |
| Framework            | [Next.js 16](https://nextjs.org) (App Router, RSC)           |
| Language             | TypeScript (strict mode)                                     |
| Styling              | Tailwind CSS (canonical utilities, OKLCH design tokens)      |
| Animation            | Framer Motion (client-side, disabled for no-JS crawlers)     |
| Content              | MDX via next-mdx-remote/rsc                                  |
| Syntax Highlight     | Shiki (rehype-pretty-code)                                   |
| Design Tokens        | OKLCH color space, semantic CSS custom properties            |
| Icons                | Lucide React + Simple Icons                                  |
| Internationalization | Custom locale system, message files via next-intl patterns   |
| SEO                  | Native Next.js Metadata API, JSON-LD, OpenGraph              |
| Analytics            | Google Analytics + Google Tag Manager (cookie-consent gated) |

---

## Runtime Systems & Frontend Infrastructure

### Metadata Architecture

Every route in the platform generates its own metadata deterministically. There is no manual metadata management. The metadata system consumes content frontmatter, locale context, and route configuration to produce:

- Page titles and descriptions
- OpenGraph tags (title, description, image, type)
- Twitter card metadata
- JSON-LD structured data (Article, Organization, BreadcrumbList)
- Canonical URL references
- Hreflang alternate links
- Locale-specific OG images

The metadata pipeline:

```
Content Frontmatter  ─┐
Route Configuration  ─┼──▶ Metadata Generator ──▶ Next.js Metadata API
Locale Context       ─┘                              │
                                                      ▼
                                              <head> output
                                              JSON-LD script
                                              OG meta tags
                                              Canonical + hreflang
```

### SEO Infrastructure

SEO is not a marketing layer in this platform. It is a runtime system.

- **Sitemap.xml**: Dynamically generated from all content collections. Each article, page, and locale variant produces its own entry with correct `lastModified`, `changeFrequency`, and `priority`.
- **Robots.txt**: Generated with environment-aware rules. Public pages are indexed. Admin, API, and preview routes are disallowed.
- **LLM.txt**: A machine-readable repository context file designed for AI agent consumption. Contains architecture overview, content organization, conventions, and discoverable paths.
- **Canonical URLs**: Every page declares its canonical URL. Every localized variant produces hreflang alternates. The system is environment-aware (production vs development) and locale-aware.
- **Structured Data**: Articles produce JSON-LD with full metadata. Organization schema is applied to the root. BreadcrumbList schema is generated for navigation paths.

### Performance Architecture

The platform achieves Lighthouse scores of 98+ across all categories through:

- Server Components as the default rendering strategy
- Client Components only where interactivity is required
- Optimized font loading with `swap` display and preload
- Image optimization via Next.js Image component with WebP/AVIF
- Framer Motion disabled for no-JS crawlers (content-first rendering)
- Critical CSS inlining
- Bundle size reduction through code splitting and tree shaking
- Layout shift prevention (explicit dimensions, font metrics)
- Caching strategy implementation at the edge

---

## SEO & Internationalization Infrastructure

### Locale Architecture

The platform serves content in multiple locales, each operating as a first-class content system:

```
content/
├── insights/
│   ├── en-us/       — English articles (canonical)
│   └── pt-br/       — Portuguese translations
├── legal/
│   ├── en-us/       — English legal content
│   └── pt-br/       — Portuguese legal content
```

Each locale has its own:

- Routes and slugs
- Metadata and descriptions
- OpenGraph images
- SEO configuration
- Hreflang references
- Canonical URL

The i18n system handles:

- Locale-based route prefixing
- Translated metadata generation
- Cross-locale canonical consistency
- Hreflang alternate generation
- Content duplication management
- Slug translation and normalization

### Internationalization Flow

```
Request ──▶ Middleware ──▶ Locale Detection ──▶ Route Resolution
                       │                          │
                       │                          ▼
                       │                 Content Directory Lookup
                       │                 (content/[type]/[locale]/)
                       │                          │
                       │                          ▼
                       │                 Metadata Generation
                       │                 (locale-aware, translated)
                       │                          │
                       │                          ▼
                       └──────▶ Rendered Page + Hreflang + Canonical
```

---

## MDX & Content Runtime

### MDX Rendering Pipeline

The content system is built on `next-mdx-remote/rsc` with a custom components map and rehype plugins:

```
MDX Source ──▶ compileMDX ──▶ rehype-pretty-code ──▶ rehype-slug ──▶ Rendered Content
                   │                                      │
                   ▼                                      ▼
           Custom Components                        Heading Anchors
           Map Injection                            (hover chain links)
                   │
                   ▼
           Server-Side Rendering
           (zero client JS for content)
```

### Custom Components

The MDX system provides a rich set of components for engineering storytelling:

| Component             | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| `Callout`             | Info, tip, success, warning, error, performance variants |
| `CodeBlock`           | Syntax-highlighted code with filename and copy button    |
| `MetricsCard`         | Data display with label, value, change, trend            |
| `ArchitectureDiagram` | Custom node/edge diagrams + presets                      |
| `ComparisonTable`     | Feature matrix with checkmark/cross/partial              |
| `Steps`               | Ordered step-by-step workflows                           |
| `QuoteBlock`          | Styled pull quotes with attribution                      |
| `Tabs`                | Tabbed content containers                                |
| `Accordion`           | FAQ-style expandable sections                            |
| `FileTree`            | Filesystem tree visualization                            |
| `FeatureGrid`         | Icon + title + description grid                          |
| `Image`               | Next.js Image wrapper                                    |
| `ArticleImage`        | Image with caption and lightbox                          |
| `ImageGallery`        | Multi-column image grid with captions                    |
| `Video`               | Self-hosted MP4 with custom controls                     |
| `YouTube`             | Privacy-respecting youtube-nocookie embed                |
| `AudioPlayer`         | Custom-styled audio player                               |
| `Embed`               | Generic iframe embed (CodePen, Figma, etc.)              |

### Content as Infrastructure

Articles in this platform are not static documents. They participate in the full runtime:

- Each article generates its own OpenGraph metadata and OG image
- Each article produces JSON-LD structured data
- Each article creates hreflang entries for its translated variants
- Each article appears in the sitemap with correct metadata
- Each article is indexed by the tag and author filtering systems
- Each article is available through the LLM.txt context

The content system is designed for engineering storytelling at scale.

---

## AI-Native Engineering Workflow

### Development Model

This platform was built in an AI-assisted workflow where three AI systems operated under continuous human supervision:

| System              | Role                    | Strength               |
| ------------------- | ----------------------- | ---------------------- |
| v0.dev              | UI exploration          | Visual iteration speed |
| Claude Code         | Repository engineering  | Execution capacity     |
| ChatGPT             | System reasoning        | Architecture thinking  |
| Big Pickle/OpenCode | Article & documentation | Technical storytelling |

### How It Works

1. **Human specifies** the engineering task with precise constraints, directory paths, and architectural context
2. **AI executes** repository-wide modifications, code generation, or content migration
3. **Human validates** every change systematically
4. **Issues are identified** and corrected through iterative refinement
5. **The corrected state** becomes the baseline for the next cycle

This pattern mirrors pair programming but operates at repository scale.

### Key Observations

- AI accelerated implementation timelines dramatically (72 hours for what would have been multiple engineering sprints)
- Architecture reasoning remained human-led across every phase
- The quality of AI output was directly proportional to the precision of the engineering specification
- Every failure mode (regressions, drift, inconsistency) was detected by human review, never self-corrected by AI
- The bottleneck moved from typing code to validating systems
- Systems thinking became the differentiator between successful and failed sessions

### Repository Design for AI Consumption

The repository is designed for both human and AI consumption:

- **AGENTS.md**: Agent-specific instructions that tell AI systems how to operate in this repository
- **LLM.txt**: Generated structured context file for LLM consumption
- **CLAUDE.md**: Claude-specific instructions with project conventions and patterns
- **Structured conventions**: Consistent directory organization, naming, and code patterns
- **Metadata-driven content**: Machine-readable metadata on every page and article
- **Deterministic URLs**: Predictable URL patterns that AI systems can generate reliably

---

## Repository Structure

```
/
├── AGENTS.md                    # AI agent instructions
├── CLAUDE.md                    # Claude-specific project context
├── README.md                    # This file
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── proxy.ts                     # Development proxy configuration
│
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout (i18n, theme, analytics)
│   ├── globals.css              # OKLCH design tokens (brand + semantic)
│   ├── robots.ts                # Dynamic robots.txt generation
│   ├── [locale]/                # Locale-based routes
│   │   ├── page.tsx             # Home page
│   │   ├── layout.tsx           # Locale layout wrapper
│   │   ├── insights/            # MDX article routes
│   │   ├── labs/                # R&D experiment routes
│   │   ├── solutions/           # Solutions pages
│   │   ├── products/            # Products pages
│   │   ├── company/             # Company pages
│   │   ├── book/                # Booking page
│   │   ├── careers/             # Careers pages
│   │   ├── (legal)/             # Legal content routes
│   │   └── og-preview/          # OG image preview (dev only)
│   └── api/
│       └── og/                  # Dynamic OG image generation
│
├── components/                  # React component library
│   ├── blog/                    # MDX rendering + article components
│   │   ├── mdx-content.tsx      # MDX compilation pipeline
│   │   └── mdx-components/      # Custom MDX component registry
│   ├── ui/                      # Primitive UI components
│   ├── analytics/               # GA4 + GTM integration
│   ├── legal/                   # Legal page components
│   ├── icons/                   # Icon system
│   ├── hero.tsx                 # Home hero section
│   ├── mega-menu.tsx            # Navigation megamenu
│   ├── footer.tsx               # Site footer
│   ├── navigation.tsx           # Main navigation
│   └── ...                      # Page-specific sections
│
├── content/                     # Content system
│   ├── insights/                # Engineering articles
│   │   ├── en-us/               # English articles
│   │   └── pt-br/               # Portuguese translations
│   └── legal/                   # Legal content
│       ├── en-us/               # English legal pages
│       └── pt-br/               # Portuguese legal pages
│
├── lib/                         # Core libraries
│   ├── mdx.ts                   # MDX utilities
│   ├── seo/                     # SEO infrastructure
│   ├── i18n/                    # Internationalization
│   ├── og/                      # OG image generation
│   ├── authors.ts               # Author management
│   ├── env.ts                   # Environment configuration
│   ├── site-routes.ts           # Route definitions
│   └── utils.ts                 # Shared utilities
│
├── messages/                    # i18n message files
├── public/                      # Static assets
│   └── posts/                   # Article images and author avatars
│
├── styles/                      # Global styles and tokens
├── hooks/                       # Shared React hooks
└── .env.example                 # Environment variable template
```

---

## Local Development

### Prerequisites

- Node.js 18+ (20+ recommended)
- pnpm (preferred) or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/optimizedeals/optimizedeals.git
cd optimizedeals

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
pnpm dev
```

The development server starts at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

```bash
pnpm dev          # Start development server with turbopack
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

---

## Environment Variables

```env
# Site
NEXT_PUBLIC_SITE_URL=https://optimize.deals    # Production URL

# Analytics (optional, gated by cookie consent)
NEXT_PUBLIC_GA_ID=                             # Google Analytics 4
NEXT_PUBLIC_GTM_ID=                            # Google Tag Manager
```

---

## Deployment Architecture

The platform deploys on Vercel with the following configuration:

- **Edge Network**: Global CDN with caching at the edge
- **SSG (Static Site Generation)**: Content pages, articles, labs, legal pages
- **ISR (Incremental Static Regeneration)**: Dynamic content with cache revalidation
- **Middleware**: Locale detection, redirect handling, bot detection
- **Serverless Functions**: OG image generation (Satori + React)
- **Static Generation**: robots.txt, sitemap

### Build Pipeline

```
pnpm dev          — Turbopack-powered development with Fast Refresh
pnpm build        — Production build with full optimization
  ├── Static page generation (SSG)
  ├── Route generation via generateStaticParams
  ├── MDX compilation and metadata extraction
  ├── Sitemap and robots generation
  └── Bundle optimization and code splitting
```

---

## Open Source Philosophy

### Why This Repository Is Open Source

The decision to open source this platform is not a marketing choice. It is an engineering decision based on the following principles:

**Architecture transparency.** Engineering systems improve when they are visible. Making the architecture public invites scrutiny, enables learning, and establishes a quality baseline that private development cannot replicate.

**AI-native development research.** The AI-assisted development workflow that produced this platform is still evolving. Making the process, the conversation logs, and the results public accelerates the collective understanding of how human-supervised AI development works in practice.

**Pattern distribution.** The MDX content system, the SEO infrastructure, the i18n architecture, and the runtime-oriented design patterns are reusable. Open sourcing them allows other engineering teams to adopt, adapt, and improve these patterns.

**Educational value.** The repository serves as a reference implementation for anyone building modern frontend infrastructure: server components, MDX pipelines, dynamic metadata, internationalization, design token systems, and AI-consumable repository design.

**Recursive improvement.** Open source code improves AI training data, which improves the AI systems used to build the platform. Contributing back to the ecosystem that enabled the platform is a deliberate choice.

### What You Can Learn From This Repository

- How to structure a Next.js 16 App Router project with locales
- How to implement a production MDX rendering pipeline with custom components
- How to build deterministic SEO infrastructure (metadata, structured data, sitemaps, hreflang)
- How to implement internationalization at the routing and content layers
- How to migrate a design system from hexadecimal to OKLCH color tokens
- How to normalize Tailwind CSS usage for canonical utility patterns
- How to design a repository for both human and AI consumption
- How to implement dynamic OG image generation
- How to structure an AI-assisted engineering workflow with active supervision

---

## Contributing

Contributions are welcome, particularly in the following areas:

- **Content**: Engineering articles, labs experiments, technical writing
- **Infrastructure**: Performance optimization, SEO improvements, i18n expansion
- **Patterns**: Component additions, architectural improvements, tooling enhancements
- **Research**: AI-assisted development workflows, runtime architecture investigations
- **Localization**: Additional locale support, translation improvements

### Guidelines

- Open an issue or discussion before significant changes
- Maintain the existing architectural conventions and patterns
- Ensure metadata, SEO, and i18n consistency across changes
- Run `pnpm build` to verify the production build
- Follow the conventions established in AGENTS.md and CLAUDE.md

---

## Future Research Directions

The platform serves as an active research environment for frontend engineering. Current and planned investigation areas include:

- **Distributed frontend systems**: Module Federation topologies, micro-frontend architecture patterns
- **AI-native repository design**: Evolving AGENTS.md and LLM.txt patterns for improved AI collaboration
- **Runtime rendering systems**: Streaming SSR, partial prerendering, progressive rendering strategies
- **Cross-locale content syndication**: Automated translation pipelines with human validation layers
- **Performance research**: Core Web Vitals optimization at the architectural level
- **Design token evolution**: Expanding the OKLCH token system for dynamic theming and dark mode
- **Content system scaling**: MDX pipeline optimization for large-scale content operations

The Labs section of the platform contains active experiments and research artifacts.

---

## License

This project is open source. The code, content, and architecture patterns are available for learning, adaptation, and contribution.

---

<p align="center">
  <small>
    Built with AI assistance. Architected by humans.<br>
    <a href="https://optimize.deals">optimize.deals</a>
  </small>
</p>
