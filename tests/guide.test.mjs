import { test } from "node:test";
import assert from "node:assert/strict";
import { marginRatio } from "../src/lib/centering.ts";
import { appStoreLink } from "../src/lib/appStoreLink.ts";

test("margin examples preserve direction and scale, with no invalid-to-50/50 fallback", () => {
  assert.deepEqual(marginRatio(3, 2), [60, 40]);
  assert.deepEqual(marginRatio(2, 3), [40, 60]);
  assert.deepEqual(marginRatio(30, 20), [60, 40]);
  assert.deepEqual(marginRatio(2, 2), [50, 50]);
  assert.deepEqual(marginRatio(0, 2), [0, 100]);
  for (const [a, b] of [[0, 0], [-1, 2], [NaN, 2], [1, Infinity], [1e308, 1e308]])
    assert.equal(marginRatio(a, b), undefined);
});

test("campaign links require real configuration and never change the download destination", () => {
  const plain = appStoreLink("guide-60-40");
  assert.equal(plain, "https://apps.apple.com/app/centergrade-app/id6759246214");
  for (const token of ["", "sample", "123&ct=bad", "123 " ]) assert.equal(appStoreLink("guide-60-40", token), plain);
  const campaign = new URL(appStoreLink("guide-60-40", "123456"));
  assert.equal(campaign.origin, "https://apps.apple.com");
  assert.equal(campaign.pathname, "/app/centergrade-app/id6759246214");
  assert.deepEqual(Object.fromEntries(campaign.searchParams), { pt: "123456", ct: "guide-60-40", mt: "8" });
  assert.equal(appStoreLink("bad campaign", "123456"), plain);
});
