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
src/
├── _data/
│   ├── site.json          # Global metadata (title, email, location)
│   └── projects.json      # Projects list — edit here to add/update projects
├── _includes/
│   ├── layouts/
│   │   ├── base.njk       # Root HTML shell (nav, footer, scripts)
│   │   └── post.njk       # Blog post layout
│   ├── nav.njk
│   ├── footer.njk
│   └── app-card.njk       # Project card component
├── assets/
│   ├── css/styles.css     # All styles — CSS custom properties + sections
│   ├── img/               # Images (logo.svg, app icons, screenshots)
│   └── js/main.js         # Mobile nav toggle
├── apps/
│   └── bikesharebuddy/
│       ├── index.njk      # App landing page → /BikeShareBuddy/
│       └── privacy-policy.njk  # → /BikeShareBuddy/privacyPolicy.htm
├── blog/
│   ├── blog.json          # Auto-applies layout + tag to all posts
│   └── YYYY-MM-DD-slug.md # Blog posts
├── index.njk              # Homepage
├── blog.njk               # Blog listing → /blog/
└── 404.njk                # Custom 404
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
  "appStoreUrl": "https://apps.apple.com/...",
  "playStoreUrl": null,
  "platform": ["ios"],
  "status": "active",
  "featured": true
}
```

2. Place the icon image in `src/assets/img/`.
3. Create a landing page at `src/apps/mynewproject/index.njk` with `permalink: /MyNewProject/` in the front matter.

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

## Brand

| Token | Value |
|-------|-------|
| Primary color | `#FF4500` |
| Primary dark | `#CC3700` |
| Footer background | `#111111` |
| Font | Inter (Google Fonts) |

All design tokens are CSS custom properties in the `:root` block at the top of `src/assets/css/styles.css`.

---

## Deployment

Pushing to `master` automatically triggers a GitHub Actions build and deploys the `_site/` output to the `gh-pages` branch.

**One-time setup:** In the repo settings, set Pages source to the `gh-pages` branch, root folder.

The `CNAME` file (`cloudgatestudios.com`) is automatically included in every deploy.

---

## Cleanup (pending)

The following legacy directories are still in the repo root but are no longer served — safe to delete after the live deploy is verified:

- `BikeShareBuddy/` — replaced by `src/apps/bikesharebuddy/`
- `index.html`, `_config.yml`
- `css/`, `js/`, `fonts/`, `font-awesome/`, `img/`, `mail/`
