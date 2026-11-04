# cloudgatestudios.github.io

Source for [cloudgatestudios.com](https://cloudgatestudios.com) — a one-person studio building apps, tools, and services.

Built with [Eleventy (11ty)](https://www.11ty.dev/) and deployed to GitHub Pages via GitHub Actions.

---

## Development

**Prerequisites:** Node.js 20+

```bash
npm install
npm start        # dev server at http://localhost:8080
npm run build    # production build → _site/
```

---

## Project Structure

```
cloudgatestudios.github.io/
├── .github/
│   └── workflows/
│       ├── deploy.yml         # Push to master → build → deploy to gh-pages
│       └── pr-check.yml       # PR checks: build + spell check
├── src/
│   ├── _data/
│   │   ├── site.json          # Global metadata (title, email, location)
│   │   └── projects.json      # Projects list — edit here to add/update projects
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk       # Root HTML shell (nav, footer, scripts)
│   │   │   └── post.njk       # Blog post layout
│   │   ├── nav.njk
│   │   ├── footer.njk
│   │   └── app-card.njk       # Project card component (apps, tools, services)
│   ├── assets/
│   │   ├── css/styles.css     # All styles — CSS custom properties + sections
│   │   ├── img/               # Images (logo.svg, app icons, screenshots)
│   │   └── js/main.js         # Mobile nav toggle
│   ├── apps/
│   │   └── bikesharebuddy/
│   │       ├── index.njk      # App landing page → /BikeShareBuddy/
│   │       └── privacy-policy.njk  # → /BikeShareBuddy/privacyPolicy.htm
│   ├── blog/
│   │   ├── blog.json          # Auto-applies layout + tag to all posts
│   │   └── YYYY-MM-DD-slug.md # Blog posts
│   ├── index.njk              # Homepage
│   ├── blog.njk               # Blog listing → /blog/
│   └── 404.njk                # Custom 404
├── CNAME                      # cloudgatestudios.com
├── cspell.json                # Spell check config
├── eleventy.config.js         # Eleventy configuration
└── package.json               # npm scripts and dependencies
```

---

## Adding a Project

1. Add an entry to `src/_data/projects.json`:

```json
{
  "name": "My New Project",
  "slug": "mynewproject",
  "tagline": "One-line description",
  "description": "Longer description.",
  "icon": "/assets/img/MyProjectIcon.png",
  "url": "/MyNewProject/",
  "appStoreUrl": "https://apps.apple.com/...",  ← optional, null if not applicable
  "playStoreUrl": null,                          ← optional, null if not applicable
  "platform": ["ios"],                           ← optional (e.g. ["ios"], ["android"], ["web"])
  "status": "active",
  "featured": true
}
```

> **Note:** `appStoreUrl`, `playStoreUrl`, and `platform` are optional — they control whether store badges appear on the project card. Set them to `null` (or omit them) for tools, services, or anything that isn't a mobile app.

2. Place the icon image in `src/assets/img/`.
3. *(Optional)* If the project needs its own landing page, create one at `src/projects/mynewproject/index.njk` with `permalink: /MyNewProject/` in the front matter. If the project links directly to an external URL (e.g. a web service), you can skip this step and point `url` in `projects.json` to the external address instead.

---

## Writing a Blog Post

Create a markdown file in `src/blog/`:

```
src/blog/YYYY-MM-DD-your-post-slug.md
```

Front matter:

```yaml
---
title: "Your Post Title"
date: 2026-03-13
description: "One or two sentence summary shown in listing cards and meta tags."
---

Post content in markdown...
```

The post will automatically appear at `/blog/your-post-slug/` and in the blog preview on the homepage (up to 3 most recent posts shown).

---

## Social Previews (Open Graph)

Every page gets Open Graph and Twitter/X card tags from `src/_includes/layouts/base.njk`, using the page's `title` and `description`.

The preview image is generated at build time: `{% ogImage %}` (defined in `eleventy.config.js`, drawn by `lib/og-image.js`) renders a 1200×630 PNG for each page into `_site/og/`. Blog posts show their date, and any page under a project's `url` shows that project's icon. No extra steps are needed when adding a page or post.

Optional front matter:

```yaml
ogTitle: "Text for the card"      # defaults to title
ogImage: /assets/img/Custom.png   # use this image instead of generating one
ogImageAlt: "Describe the image"
```

Check a page's preview after deploying with a tool like [opengraph.xyz](https://www.opengraph.xyz/).

---

## Brand

| Token | Value |
|-------|-------|
| Primary color | `#FF4500` |
| Primary dark | `#CC3700` |
| Footer background | `#111111` |
| Font | Inter (Google Fonts) |

All design tokens are CSS custom properties in the `:root` block at the top of `src/assets/css/styles.css`.

---

## PR Checks

Every pull request into `master` runs two checks in parallel:

- **Build** — runs `npm run build` and fails if Eleventy throws any errors
- **Spell Check** — runs `cspell` across blog posts, app pages, and the README

Run spell check locally before pushing:

```bash
npm run spellcheck
```

If a word is flagged that isn't a typo (brand name, technical term, etc.), add it to the `words` array in `cspell.json`.

---

## Deployment

Pushing to `master` automatically triggers a GitHub Actions build and deploys the `_site/` output to the `gh-pages` branch.

**One-time setup:** In the repo settings, set Pages source to the `gh-pages` branch, root folder.

The `CNAME` file (`cloudgatestudios.com`) is automatically included in every deploy.

