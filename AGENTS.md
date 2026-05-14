<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:large-mdx-rules -->

# Large MDX files: ALWAYS read and process in chunks

`content/insights/**/*.mdx` articles are long-form technical pieces. Many exceed several hundred lines and a single file can saturate a request's context window. Loading one entirely in one operation is a stability hazard, not a convenience.

## Rule

Never read an `.mdx` file under `content/insights/` in a single `Read` call without bounds. Always use `offset` + `limit` and walk the file incrementally. Default chunk size: 150–200 lines. Use `wc -l` first to size the file and plan passes.

This rule is non-negotiable for any workflow that touches MDX content end-to-end:

- translation and localization (`en-us` → `pt-br` and any future locale)
- SEO and metadata extraction or rewriting
- frontmatter audits and migrations
- bulk MDX refactors (component renames, schema changes)
- content analysis, summarization, or classification
- structural transformations (heading normalization, TOC regeneration)

## Why

Loading entire large MDX files in a single pass causes, in order of likelihood:

- **Context overflow** — the file alone consumes the budget needed for output.
- **Token explosion** — input cost scales with file size; one careless read multiplies cost across every subsequent turn.
- **Request failures** — oversized prompts get rejected or truncated mid-response.
- **Degraded reasoning** — long contexts dilute attention; the model misses details in the middle of the file.
- **Unstable, partial outputs** — translations and refactors silently drop sections at chunk boundaries you never saw.

## How to process safely

- **Size first.** Run `wc -l <file>` before reading. If the file is > ~250 lines, plan multiple passes.
- **Chunk by `offset`/`limit`.** Walk the file in ordered windows. Do not skip ranges.
- **Chunk on semantic boundaries when transforming.** Prefer heading-aware splits (`##`, `###`) over arbitrary line counts so a section is never cut mid-thought.
- **Preserve continuity.** When translating or transforming chunk N+1, keep the last heading and last sentence of chunk N in working memory so tone, terminology, and pronoun references stay consistent.
- **Progressive merging.** Write the output once at the end via a single `Write`, or accumulate by `Edit` against a scaffold file. Never emit partial files the user has to stitch together.
- **Validate at the end.** After merge: confirm frontmatter is valid YAML, MDX components/JSX are balanced, code fences are closed, no duplicated or dropped sections. Cheap check: section count and line count parity against the source.

## Scope

Applies repository-wide to every agent working in this repo. Not task-specific. Not optional for "small" articles you have not measured. Measure, then chunk.

<!-- END:large-mdx-rules -->
