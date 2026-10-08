import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { planCaptures, prepareAppXaml, publishCaptures } from './screenshots.mjs';

const manifest = {
  locales: { en: { culture: 'en-US', root: 'docs' },
    ja: { culture: 'ja-JP', root: 'i18n/ja/docusaurus-plugin-content-docs/current' } },
  scenarios: [{ id: 'view-settings', path: 'settings/_images/view-settings.png' }]
};
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aL1sAAAAASUVORK5CYII=', 'base64');

test('both locales target current documentation and filters reject typos', () => {
  const captures = planCaptures(manifest);
  assert.equal(captures.length, 2);
  assert.equal(captures[1].path, 'i18n/ja/docusaurus-plugin-content-docs/current/settings/_images/view-settings.png');
  assert.equal(planCaptures(manifest, { locale: 'ja', scenario: 'view-settings' }).length, 1);
  assert.throws(() => planCaptures(manifest, { locale: 'jp' }), /Unknown locale/);
  assert.throws(() => planCaptures(manifest, { scenario: 'view-setting' }), /Unknown scenario/);
});

test('invalid manifests cannot overwrite historical docs or unrelated files', () => {
  for (const root of ['versioned_docs/version-1', 'i18n/ja/docusaurus-plugin-content-docs/version-1', '../docs']) {
    assert.throws(() => planCaptures({ ...manifest, locales: { en: { culture: 'en-US', root } } }));
  }
  for (const image of ['../README.md', 'settings/_images/../../README.png', '/tmp/_images/image.png']) {
    assert.throws(() => planCaptures({ ...manifest, scenarios: [{ id: 'view-settings', path: image }] }));
  }
  assert.throws(() => planCaptures({ ...manifest, scenarios: [...manifest.scenarios, ...manifest.scenarios] }), /duplicate/);
});

test('production application resources remain in the generated application', () => {
  const source = '<Application x:Class="Beutl.App"><StyleInclude Source="/Views/Dock/DockStyles.axaml" /><StyleInclude Source="avares://NewTheme/Styles.axaml" /></Application>';
  const prepared = prepareAppXaml(source);
  assert.match(prepared, /x:Class="Beutl.Docs.Screenshots.ScreenshotApp"/);
  assert.match(prepared, /avares:\/\/Beutl\/Views\/Dock\/DockStyles.axaml/);
  assert.match(prepared, /avares:\/\/NewTheme\/Styles.axaml/);
  assert.throws(() => prepareAppXaml('<Application />'), /class has changed/);
});

async function fixture(context) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'beutl-docs-screenshot-test-'));
  context.after(() => rm(root, { recursive: true, force: true }));
  return { source: path.join(root, 'rendered'), destination: path.join(root, 'docs-repo') };
}

async function save(root, relative, content) {
  await mkdir(path.dirname(path.join(root, relative)), { recursive: true });
  await writeFile(path.join(root, relative), content);
}

test('check reports stale images without writing, update is repeatable', async context => {
  const { source, destination } = await fixture(context);
  const captures = planCaptures(manifest);
  for (const capture of captures) {
    await save(source, capture.path, png);
    await save(destination, capture.path, 'old screenshot');
  }
  const checked = await publishCaptures(captures, source, destination, 'check');
  assert.equal(checked.changed.length, 2);
  assert.equal((await readFile(path.join(destination, captures[0].path))).toString(), 'old screenshot');
  const updated = await publishCaptures(captures, source, destination, 'update');
  assert.equal(updated.changed.length, 2);
  assert.deepEqual(await readFile(path.join(destination, captures[1].path)), png);
  assert.equal((await publishCaptures(captures, source, destination, 'check')).changed.length, 0);
});

test('missing or corrupt output in the second locale preserves all checked-in assets', async context => {
  const { source, destination } = await fixture(context);
  const captures = planCaptures(manifest);
  await save(source, captures[0].path, png);
  for (const capture of captures) await save(destination, capture.path, 'original');
  await assert.rejects(publishCaptures(captures, source, destination, 'update'), /ENOENT/);
  await save(source, captures[1].path, 'not a rendered image');
  await assert.rejects(publishCaptures(captures, source, destination, 'update'), /Invalid rendered PNG/);
  for (const capture of captures)
    assert.equal((await readFile(path.join(destination, capture.path))).toString(), 'original');
});
