// Builds a 1200x630 Open Graph preview card for a page, as a PNG.
// Layout is described with satori's flexbox element tree (no JSX needed),
// rendered to SVG, then rasterized with resvg.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const require = createRequire(import.meta.url);
const fontDir = path.dirname(require.resolve("@fontsource/inter/package.json"));
const fonts = [400, 600, 700].map((weight) => ({
  name: "Inter",
  weight,
  style: "normal",
  data: readFileSync(path.join(fontDir, "files", `inter-latin-${weight}-normal.woff`)),
}));

export const WIDTH = 1200;
export const HEIGHT = 630;
const PAD_X = 80;
const CONTENT_WIDTH = WIDTH - PAD_X * 2;

const COLORS = {
  primary: "#ff4500",
  text: "#1a1a1a",
  muted: "#666666",
  bg: "#ffffff",
};

const MIME = { ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };

// Satori needs images inlined. Only SVG/PNG/JPEG are supported (not WebP).
export function imageDataUri(file) {
  const mime = MIME[path.extname(file).toLowerCase()];
  if (!mime) return null;
  return `data:${mime};base64,${readFileSync(file).toString("base64")}`;
}

const h = (type, style, children) => ({ type, props: { style, children } });

// Shrink long titles so they still fit in about three lines.
function titleSize(title, hasIcon) {
  const len = title.length * (hasIcon ? 1.25 : 1);
  if (len > 70) return 52;
  if (len > 45) return 62;
  return 72;
}

function truncate(text, max) {
  if (!text || text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)).replace(/[\s,.;:—-]+$/, "") + "…";
}

/**
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} [opts.description]
 * @param {string} [opts.eyebrow]  small label above the title (e.g. a date)
 * @param {string} [opts.icon]     data URI of an icon shown on the right
 * @param {string} opts.logo       data URI of the site logo
 * @param {string} opts.domain     shown in the footer
 */
export async function renderOgImage({ title, description, eyebrow, icon, logo, domain }) {
  const text = h(
    "div",
    { display: "flex", flexDirection: "column", width: icon ? 680 : CONTENT_WIDTH },
    [
      eyebrow &&
        h("div", { fontSize: 26, fontWeight: 600, color: COLORS.primary, marginBottom: 20, textTransform: "uppercase", letterSpacing: 2 }, eyebrow),
      h("div", { fontSize: titleSize(title, !!icon), fontWeight: 700, color: COLORS.text, lineHeight: 1.1, letterSpacing: -1.5 }, title),
      description &&
        h("div", { fontSize: 30, color: COLORS.muted, marginTop: 28, lineHeight: 1.4 }, truncate(description, 140)),
    ].filter(Boolean)
  );

  // Satori sizes boxes as content-box, so padding lives on an inner wrapper
  // rather than on the fixed-size root.
  const tree = h(
    "div",
    { width: WIDTH, height: HEIGHT, display: "flex", flexDirection: "column", backgroundColor: COLORS.bg, fontFamily: "Inter" },
    [
      h(
        "div",
        { display: "flex", flexDirection: "column", flexGrow: 1, paddingTop: 64, paddingBottom: 40, paddingLeft: PAD_X, paddingRight: PAD_X },
        [
          { type: "img", props: { src: logo, height: 52, width: Math.round((52 * 3162) / 526) } },
          h("div", { display: "flex", flexGrow: 1, alignItems: "center", justifyContent: "space-between" }, [
            text,
            icon && { type: "img", props: { src: icon, width: 240, height: 240, style: { borderRadius: 54 } } },
          ].filter(Boolean)),
          h("div", { fontSize: 24, fontWeight: 600, color: COLORS.muted }, domain),
        ]
      ),
      h("div", { height: 16, backgroundColor: COLORS.primary }),
    ]
  );

  const svg = await satori(tree, { width: WIDTH, height: HEIGHT, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng();
}
