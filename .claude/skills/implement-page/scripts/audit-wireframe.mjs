#!/usr/bin/env node
// Audits one page of the Claude Design wireframe bundle (design/wireframes.html),
// or any plain HTML file (for example a built page in dist/).
//
// Usage:
//   node audit-wireframe.mjs --list [file]              list the view ids in the bundle
//   node audit-wireframe.mjs <view-id> [file]           audit one view of the bundle
//   node audit-wireframe.mjs --extract <view-id> <out>  write that view as a standalone HTML page
//   node audit-wireframe.mjs --html <file.html>         audit a plain HTML file (headings + landmarks only)
//
// The bundle stores its HTML as a JSON string inside <script type="__bundler/template">,
// so grep on the raw file does not work. This script decodes it first.
// No dependencies: regex parsing is enough for this exported markup.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DEFAULT_BUNDLE = 'design/wireframes.html';

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function readTemplate(file) {
  const raw = readFileSync(resolve(file), 'utf8');
  const m = raw.match(/<script type="__bundler\/template">([\s\S]*?)<\/script>/);
  if (!m) fail(`${file} is not a Claude Design bundle (no __bundler/template). Use --html for plain files.`);
  return JSON.parse(m[1]);
}

function viewSlices(html) {
  const re = /<div class="view" id="([^"]+)"/g;
  const starts = [...html.matchAll(re)].map((m) => ({ id: m[1], index: m.index }));
  const end = html.indexOf('</x-dc>') === -1 ? html.length : html.indexOf('</x-dc>');
  return starts.map((s, i) => ({ id: s.id, html: html.slice(s.index, i + 1 < starts.length ? starts[i + 1].index : end) }));
}

const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\{\{[^}]*\}\}/g, '').replace(/\s+/g, ' ').trim();

function headings(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => ({ level: Number(m[1]), text: text(m[2]) }));
}

function landmarks(html) {
  const out = [];
  for (const m of html.matchAll(/<(header|nav|main|footer|section|aside|article)\b([^>]*)>/g)) {
    const attr = (name) => m[2].match(new RegExp(`${name}="([^"]*)"`))?.[1];
    const parts = [m[1]];
    if (attr('id')) parts.push(`#${attr('id')}`);
    if (attr('class')) parts.push(`.${attr('class').trim().split(/\s+/).join('.')}`);
    if (attr('aria-label')) parts.push(`aria-label="${attr('aria-label')}"`);
    if (attr('aria-labelledby')) parts.push(`aria-labelledby="${attr('aria-labelledby')}"`);
    out.push(parts.join(' '));
  }
  return out;
}

// Indented tree of block-level structure: semantic tags plus any element with a class.
// Shows nesting and order (for example, whether a date sits inside or after .page-title).
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const INLINE = new Set(['a', 'span', 'strong', 'em', 'b', 'i', 'code', 'abbr', 'small', 'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'g', 'use', 'time', 'sc-if']);
const SHOW_TEXT = /^(h[1-6]|p|li|th|td|caption|dt|dd|figcaption|a)$/;

function outline(html) {
  const lines = [];
  const stack = [];
  const re = /<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    const [, closing, rawTag, attrs, selfClose] = m;
    const tag = rawTag.toLowerCase();
    if (closing) {
      const idx = stack.lastIndexOf(tag);
      if (idx !== -1) stack.length = idx;
      continue;
    }
    const cls = attrs.match(/class="([^"]*)"/)?.[1]?.trim();
    const show = !INLINE.has(tag) && (cls || /^(header|nav|main|footer|section|aside|article|h[1-6]|ul|ol|li|table|caption|thead|tbody|tr|th|td|p|dl|dt|dd|figure)$/.test(tag));
    if (show) {
      let label = tag + (cls ? `.${cls.split(/\s+/).join('.')}` : '');
      const aria = attrs.match(/aria-label="([^"]*)"/)?.[1];
      if (aria) label += ` [aria-label="${aria}"]`;
      if (SHOW_TEXT.test(tag)) {
        const close = html.indexOf(`</${tag}>`, re.lastIndex);
        const t = close === -1 ? '' : text(html.slice(re.lastIndex, close));
        if (t) label += `: "${t.slice(0, 60)}${t.length > 60 ? '…' : ''}"`;
      }
      lines.push(`${'  '.repeat(stack.filter((s) => s !== null).length)}${label}`);
    }
    if (!VOID.has(tag) && !selfClose) stack.push(show ? tag : null);
  }
  return lines;
}

function headingProblems(hs) {
  const problems = [];
  const h1s = hs.filter((h) => h.level === 1).length;
  if (h1s !== 1) problems.push(`expected exactly one h1, found ${h1s}`);
  for (let i = 1; i < hs.length; i++) {
    if (hs[i].level > hs[i - 1].level + 1) problems.push(`skipped level: h${hs[i - 1].level} -> h${hs[i].level} ("${hs[i].text}")`);
  }
  return problems;
}

// Flattens CSS into { selector, body, media } rules. Handles one level of @media/@supports nesting,
// which is all the bundle uses. @font-face and @keyframes are skipped.
function cssRules(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  const walk = (src, media) => {
    let i = 0;
    while (i < src.length) {
      const open = src.indexOf('{', i);
      if (open === -1) break;
      const prelude = src.slice(i, open).trim();
      let depth = 1;
      let j = open + 1;
      while (j < src.length && depth) {
        if (src[j] === '{') depth++;
        else if (src[j] === '}') depth--;
        j++;
      }
      const body = src.slice(open + 1, j - 1);
      if (/^@(media|supports|container)/.test(prelude)) walk(body, prelude);
      else if (!prelude.startsWith('@')) rules.push({ selector: prelude, body: body.trim(), media });
      i = j;
    }
  };
  walk(css, null);
  return rules;
}

const RAW_VALUE = /#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:px|rem|em)\b|(?:oklch|rgb|rgba|hsl|hsla)\([^)]*\)/g;

// clamp()/calc()/min()/max() count as one value (a fluid token), not as three loose numbers.
function valueParts(value) {
  const parts = [];
  let rest = value;
  const fn = /\b(clamp|calc|min|max)\(/;
  let m;
  while ((m = rest.match(fn))) {
    let depth = 0;
    let j = m.index + m[0].length - 1;
    for (; j < rest.length; j++) {
      if (rest[j] === '(') depth++;
      else if (rest[j] === ')' && --depth === 0) break;
    }
    const span = rest.slice(m.index, j + 1);
    if (RAW_VALUE.test(span)) parts.push(span);
    RAW_VALUE.lastIndex = 0;
    rest = rest.slice(0, m.index) + ' ' + rest.slice(j + 1);
  }
  return parts.concat(rest.match(RAW_VALUE) ?? []);
}

function rawValues(rules, usedClasses) {
  const hits = new Map();
  for (const r of rules) {
    const classes = [...r.selector.matchAll(/\.([A-Za-z0-9_-]+)/g)].map((m) => m[1]);
    // Keep rules that target a class used in this view. Token definitions (:root, [data-theme]) and
    // bare element selectors are global and are left out on purpose.
    if (!classes.some((c) => usedClasses.has(c))) continue;
    for (const decl of r.body.split(';')) {
      const [prop, ...rest] = decl.split(':');
      const value = rest.join(':').trim();
      if (!prop || !value) continue;
      for (const v of valueParts(value)) {
        const key = `${v}\t${prop.trim()}`;
        const entry = hits.get(key) ?? { value: v, prop: prop.trim(), count: 0, selectors: new Set() };
        entry.count++;
        entry.selectors.add(r.media ? `${r.selector} (${r.media})` : r.selector);
        hits.set(key, entry);
      }
    }
  }
  return [...hits.values()].sort((a, b) => b.count - a.count);
}

function styleBlocks(html) {
  return [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
}

function printAudit(label, html, css) {
  const hs = headings(html);
  console.log(`# Audit: ${label}\n`);
  console.log('## Headings');
  for (const h of hs) console.log(`${'  '.repeat(h.level - 1)}h${h.level} ${h.text.slice(0, 80)}`);
  const problems = headingProblems(hs);
  console.log(problems.length ? `\nProblems:\n${problems.map((p) => `- ${p}`).join('\n')}` : '\nNo heading problems.');
  console.log('\n## Landmarks');
  for (const l of landmarks(html)) console.log(`- ${l}`);
  console.log('\n## Outline (nesting and order)');
  for (const l of outline(html)) console.log(l);
  if (css === null) return;
  const used = new Set([...html.matchAll(/class="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/)).filter(Boolean));
  console.log('\n## Classes used');
  console.log([...used].sort().join(' '));
  console.log('\n## Raw values in CSS rules that target those classes (map each to a token)');
  console.log('count\tvalue\tproperty\tselectors');
  for (const h of rawValues(cssRules(css), used)) {
    console.log(`${h.count}\t${h.value}\t${h.prop}\t${[...h.selectors].slice(0, 4).join(' | ')}${h.selectors.size > 4 ? ' | …' : ''}`);
  }
}

function extract(template, id, out) {
  const view = viewSlices(template).find((v) => v.id === id);
  if (!view) fail(`No view "${id}". Run --list.`);
  const css = styleBlocks(template);
  const body = view.html.replace(/\shidden(?:="[^"]*")?/g, '').replace(/href="\{\{[^}]*\}\}"/g, 'href="#"').replace(/\{\{[^}]*\}\}/g, '');
  const page = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>Wireframe: ${id}</title>
<!-- Extracted by audit-wireframe.mjs. Reference only, never copy this code. Toggle dark mode by setting data-mode="dark" on .site. -->
<style>${css}</style></head>
<body><div class="site" data-theme="salvia" data-mode="light">
${body}
</div></body></html>`;
  writeFileSync(resolve(out), page);
  console.log(`Wrote ${out}`);
}

const args = process.argv.slice(2);
if (!args.length) fail('Usage: see the header of this file.');

if (args[0] === '--list') {
  for (const v of viewSlices(readTemplate(args[1] ?? DEFAULT_BUNDLE))) console.log(v.id);
} else if (args[0] === '--extract') {
  if (args.length < 3) fail('Usage: --extract <view-id> <out.html> [bundle]');
  extract(readTemplate(args[3] ?? DEFAULT_BUNDLE), args[1], args[2]);
} else if (args[0] === '--html') {
  if (!args[1]) fail('Usage: --html <file.html>');
  const html = readFileSync(resolve(args[1]), 'utf8');
  const body = html.match(/<body[\s\S]*<\/body>/)?.[0] ?? html;
  printAudit(args[1], body, null);
} else {
  const template = readTemplate(args[1] ?? DEFAULT_BUNDLE);
  const view = viewSlices(template).find((v) => v.id === args[0]);
  if (!view) fail(`No view "${args[0]}". Available: ${viewSlices(template).map((v) => v.id).join(', ')}`);
  printAudit(`view #${view.id}`, view.html, styleBlocks(template));
}
