// Behavioural tests for the portfolio's "Ask my agent" widget.
// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { ask, KNOWLEDGE } from "../portfolio/chat.js";

test("every knowledge entry links to a section on the page", () => {
  for (const entry of KNOWLEDGE) {
    assert.match(entry.href, /^#[a-z0-9-]+$/, `${entry.id} needs an on-page anchor`);
    assert.ok(entry.answer.length > 40, `${entry.id} needs a real answer`);
  }
});

test("answers a Betterfound search question from the Betterfound write-up", () => {
  const r = ask("How does a search work in Betterfound?");
  assert.equal(r.matched, true);
  assert.equal(r.sources[0].href, "#betterfound");
});

test("names the models Betterfound uses", () => {
  const r = ask("Which models does Betterfound use?");
  assert.match(r.answer, /Haiku/);
  assert.match(r.answer, /Sonnet/);
});

test("answers MCP questions from the Heumyn write-up", () => {
  const r = ask("Why did you build MCP first?");
  assert.equal(r.matched, true);
  assert.equal(r.sources[0].href, "#heumyn");
});

test("explains human approval gates in the agent factory", () => {
  const r = ask("Where do humans approve things in the agent factory?");
  assert.equal(r.sources[0].href, "#agent-factory");
});

test("ignores case and punctuation", () => {
  const a = ask("A11YCHECK???");
  const b = ask("a11ycheck");
  assert.equal(a.sources[0].href, b.sources[0].href);
});

test("gives the contact email when asked how to get in touch", () => {
  const r = ask("How can I contact you?");
  assert.match(r.answer, /samar@betterfound\.ai/);
});

test("admits when nothing on the page answers the question", () => {
  const r = ask("What is the weather in Paris?");
  assert.equal(r.matched, false);
  assert.equal(r.sources.length, 0);
  assert.match(r.answer, /samar@betterfound\.ai/);
});

test("asks for a question when the input is blank", () => {
  const r = ask("   ");
  assert.equal(r.matched, false);
  assert.equal(r.trace.length, 0);
});

test("returns a trace of the search it ran", () => {
  const r = ask("evaluation test sets");
  assert.equal(r.trace[0].tool, "notes.search");
  assert.match(r.trace[0].detail, /match/);
});

test("every source the chat links to exists on the portfolio page", async () => {
  const { readFile } = await import("node:fs/promises");
  const html = await readFile(new URL("../portfolio/index.html", import.meta.url), "utf8");
  for (const entry of KNOWLEDGE) {
    assert.ok(html.includes(`id="${entry.href.slice(1)}"`), `${entry.href} is missing from index.html`);
  }
});
