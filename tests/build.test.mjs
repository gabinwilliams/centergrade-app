import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { join, extname } from "node:path";
const pages = ["/", "/guides/60-40-centering/"];
const source = path => readFile(join("dist", path, "index.html"), "utf8");

test("built pages have distinct canonical URLs and resolve their local links and assets", async () => {
  for (const page of pages) {
    const html = await source(page);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
    assert.equal(canonical, `https://centergradeapp.com${page}`);
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll("&amp;", "&"), canonical);
      if (url.origin !== "https://centergradeapp.com") continue;
      const file = extname(url.pathname) ? url.pathname : join(url.pathname, "index.html");
      await access(join("dist", file));
      if (url.hash) {
        const target = await readFile(join("dist", file), "utf8");
        assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `${page}: ${url.href}`);
      }
    }
  }
});

test("calculator starts with disabled inputs for a truthful no-JavaScript fallback", async () => {
  const html = await source("/guides/60-40-centering/");
  const inputs = [...html.matchAll(/<input\b[^>]*>/g)].map(value => value[0]);
  assert.equal(inputs.length, 4);
  for (const input of inputs) assert.match(input, /\bdisabled\b/);
  assert.ok(/id="horizontal-ratio"[^>]*>Left \/ right: 60 \/ 40<\/output>/.test(html), "Horizontal worked example missing");
  assert.ok(/id="vertical-ratio"[^>]*>Top \/ bottom: 50 \/ 50<\/output>/.test(html), "Vertical worked example missing");
  assert.ok(html.includes("[data-margin-calculator]"), "Calculator initialization is not bundled into the page");
});
