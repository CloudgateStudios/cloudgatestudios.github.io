import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderOgImage, imageDataUri } from "./lib/og-image.js";
import site from "./src/_data/site.json" with { type: "json" };
import projects from "./src/_data/projects.json" with { type: "json" };

const INPUT_DIR = "src";
const OUTPUT_DIR = "_site";

export default function (eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  // Collections
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByTag("post").reverse()
  );

  // Filters
  eleventyConfig.addFilter("dateFormat", (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  eleventyConfig.addFilter("dateISO", (d) =>
    new Date(d).toISOString().slice(0, 10)
  );

  // Absolute URL (for og:url, og:image, canonical). Respects pathPrefix,
  // so PR previews point at their own copy of the site.
  eleventyConfig.addFilter("absoluteUrl", function (p) {
    return new URL(eleventyConfig.getFilter("url")(p), site.url).href;
  });

  // Open Graph preview images.
  // `{% ogImage %}` renders /og/<page-slug>.png for the current page and
  // returns its absolute URL. Front matter can steer it with:
  //   ogTitle       — title on the card (defaults to `title`)
  //   ogImage       — use this image instead of generating one
  // Pages under a project's URL show that project's icon automatically.
  const logo = imageDataUri(path.join(INPUT_DIR, "assets/img/logo.svg"));
  const domain = new URL(site.url).host;
  const rendered = new Map();

  eleventyConfig.addShortcode("ogImage", async function () {
    const data = this.ctx;
    const page = this.page;
    const absoluteUrl = eleventyConfig.getFilter("absoluteUrl");
    if (data.ogImage) return absoluteUrl(data.ogImage);

    const slug = page.url.replace(/\.[a-z]+$/i, "").replace(/^\/|\/$/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "index";
    const outPath = `/og/${slug}.png`;

    const project = projects.find((p) => p.url?.startsWith("/") && page.url.startsWith(p.url));
    const isPost = (data.tags || []).includes("post");
    const card = {
      title: data.ogTitle || data.title || site.title,
      description: data.description,
      eyebrow: isPost ? `Blog · ${eleventyConfig.getFilter("dateFormat")(page.date)}` : undefined,
      icon: project?.icon ? imageDataUri(path.join(INPUT_DIR, project.icon)) : undefined,
      logo,
      domain,
    };

    // Shortcode runs for each tag that uses it; render each page once per build.
    const key = outPath + JSON.stringify(card);
    if (!rendered.has(key)) {
      rendered.set(key, (async () => {
        const file = path.join(OUTPUT_DIR, outPath);
        await mkdir(path.dirname(file), { recursive: true });
        await writeFile(file, await renderOgImage(card));
      })());
    }
    await rendered.get(key);
    return absoluteUrl(outPath);
  });

  return {
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: INPUT_DIR,
      output: OUTPUT_DIR,
      includes: "_includes",
      data: "_data",
      layouts: "_includes/layouts",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
