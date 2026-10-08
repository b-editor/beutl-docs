import { createHash } from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectRoot = path.join(repoRoot, 'tools/screenshots');
const pngSignature = Buffer.from('89504e470d0a1a0a', 'hex');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

function safeRelative(value) {
  return typeof value === 'string' && value.length > 0 && !value.includes('\\')
    && !path.posix.isAbsolute(value) && value.split('/').every(part => part && part !== '.' && part !== '..');
}

export function planCaptures(manifest, { locale, scenario } = {}) {
  const ids = new Set();
  const paths = new Set();
  if (!manifest.scenarios?.length || !Object.keys(manifest.locales ?? {}).length)
    throw new Error('The screenshot manifest needs locales and scenarios.');
  for (const item of manifest.scenarios) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || ids.has(item.id))
      throw new Error(`Invalid or duplicate scenario: ${item.id}`);
    if (!safeRelative(item.path) || !item.path.includes('/_images/') || !item.path.endsWith('.png') || paths.has(item.path))
      throw new Error(`Invalid or duplicate screenshot path: ${item.path}`);
    ids.add(item.id);
    paths.add(item.path);
  }
  for (const [name, entry] of Object.entries(manifest.locales)) {
    if (!safeRelative(entry.root) || !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(entry.culture))
      throw new Error(`Invalid locale: ${name}`);
    if (entry.root !== 'docs' && !/^i18n\/[^/]+\/docusaurus-plugin-content-docs\/current$/.test(entry.root))
      throw new Error(`Screenshots can only update current documentation: ${entry.root}`);
  }
  if (locale && !manifest.locales[locale]) throw new Error(`Unknown locale: ${locale}`);
  if (scenario && !ids.has(scenario)) throw new Error(`Unknown scenario: ${scenario}`);
  return Object.entries(manifest.locales).filter(([name]) => !locale || locale === name)
    .flatMap(([name, entry]) => manifest.scenarios.filter(item => !scenario || scenario === item.id)
      .map(item => ({ id: item.id, locale: name, culture: entry.culture, path: `${entry.root}/${item.path}` })));
}

export function prepareAppXaml(source) {
  if (!source.includes('x:Class="Beutl.App"')) throw new Error('The desktop App.axaml class has changed.');
  return source.replace('x:Class="Beutl.App"', 'x:Class="Beutl.Docs.Screenshots.ScreenshotApp"')
    .replaceAll('Source="/', 'Source="avares://Beutl/');
}

export async function inspectCaptures(captures, root) {
  // Validate every rendered image before replacing any checked-in asset.
  return Promise.all(captures.map(async capture => {
    const file = path.join(root, capture.path);
    const bytes = await readFile(file);
    if (bytes.length < 33 || !bytes.subarray(0, 8).equals(pngSignature)
      || bytes.toString('ascii', 12, 16) !== 'IHDR' || bytes.readUInt32BE(16) === 0 || bytes.readUInt32BE(20) === 0)
      throw new Error(`Invalid rendered PNG: ${capture.path}`);
    return { ...capture, bytes, sha256: hash(bytes), width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }));
}

export async function publishCaptures(captures, renderedRoot, destinationRoot, mode) {
  const rendered = await inspectCaptures(captures, renderedRoot);
  const changed = [];
  for (const capture of rendered) {
    const destination = path.join(destinationRoot, capture.path);
    const current = await readFile(destination).catch(error => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (current && current.equals(capture.bytes)) continue;
    changed.push(capture.path);
    if (mode === 'update') {
      await mkdir(path.dirname(destination), { recursive: true });
      await copyFile(path.join(renderedRoot, capture.path), destination);
    }
  }
  return { rendered, changed };
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: repoRoot, stdio: 'inherit', ...options });
    child.on('error', reject);
    child.on('exit', (code, signal) => code === 0 ? resolve() : reject(new Error(`${command} failed (${signal ?? code}).`)));
  });
}

function git(source, args) {
  const result = spawnSync('git', ['-C', source, ...args], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error('The desktop source must be a Git checkout.');
  return result.stdout.trim();
}

async function main(args) {
  const { values, positionals } = parseArgs({ args, allowPositionals: true, options: {
    'beutl-source': { type: 'string' }, locale: { type: 'string' }, scenario: { type: 'string' },
    output: { type: 'string' }, help: { type: 'boolean' }
  } });
  const [mode] = positionals;
  if (values.help) {
    console.log('node scripts/screenshots.mjs <list|render|update|check> [--beutl-source ../beutl] [--locale en|ja] [--scenario ID] [--output DIR]');
    return;
  }
  if (positionals.length !== 1 || !['list', 'render', 'update', 'check'].includes(mode))
    throw new Error('Specify list, render, update, or check. Use --help for options.');
  if (values.output && mode !== 'render') throw new Error('--output is only supported with render.');
  const manifest = JSON.parse(await readFile(path.join(repoRoot, 'screenshots/manifest.json'), 'utf8'));
  const captures = planCaptures(manifest, values);
  if (mode === 'list') {
    for (const capture of captures) console.log(`${capture.locale}/${capture.id} -> ${capture.path}`);
    return;
  }

  const source = path.resolve(values['beutl-source'] ?? process.env.BEUTL_SOURCE ?? path.join(repoRoot, '../beutl'));
  const sourceCommit = git(source, ['rev-parse', 'HEAD']);
  const sourceDirty = git(source, ['status', '--porcelain']).length > 0;
  const xaml = prepareAppXaml(await readFile(path.join(source, 'src/Beutl/App.axaml'), 'utf8'));
  await mkdir(path.join(projectRoot, '.generated'), { recursive: true });
  await writeFile(path.join(projectRoot, '.generated/ScreenshotApp.axaml'), xaml);

  const cache = path.join(repoRoot, '.cache/screenshots');
  await mkdir(cache, { recursive: true });
  const runRoot = await mkdtemp(path.join(cache, 'run-'));
  const buildRoot = path.join(cache, 'build');
  const env = { ...process.env, DOTNET_CLI_TELEMETRY_OPTOUT: '1',
    DOTNET_CLI_HOME: path.join(cache, 'dotnet-home'), NUGET_HTTP_CACHE_PATH: path.join(cache, 'nuget-http'),
    NUGET_PACKAGES: process.env.NUGET_PACKAGES ?? path.join(os.homedir(), '.nuget/packages'),
    MSBUILDDISABLENODEREUSE: '1' };
  delete env.DISPLAY;
  delete env.WAYLAND_DISPLAY;
  const sdk = spawnSync('dotnet', ['--version'], { cwd: source, env, encoding: 'utf8' });
  if (sdk.status !== 0) throw new Error('Install the .NET SDK required by the desktop global.json.');
  await run('dotnet', ['build', path.join(projectRoot, 'Beutl.Docs.Screenshots.csproj'),
    '-c', 'Release', '--artifacts-path', buildRoot, `-p:BeutlSource=${source}`, '-p:NuGetAudit=false',
    '-m:1', '--disable-build-servers', '--nologo', '-v', 'minimal'], { env, cwd: source });
  const renderer = path.join(buildRoot, 'bin/Beutl.Docs.Screenshots/release/Beutl.Docs.Screenshots.dll');
  // A fresh process for each culture prevents static localized strings and singleton settings leaking.
  for (const locale of new Set(captures.map(capture => capture.locale))) {
    const selected = captures.filter(capture => capture.locale === locale);
    const request = path.join(runRoot, `${locale}.json`);
    await writeFile(request, JSON.stringify({ culture: selected[0].culture,
      captures: selected.map(capture => ({ id: capture.id, output: path.join(runRoot, capture.path) })) }));
    await run('dotnet', [renderer, request], { env, timeout: 180_000 });
  }
  const rendered = await inspectCaptures(captures, runRoot);
  const report = {
    desktop: { repository: 'https://github.com/b-editor/beutl', commit: sourceCommit, dirty: sourceDirty },
    profile: { platform: process.platform, architecture: process.arch, dotnetSdk: sdk.stdout.trim(),
      theme: 'beutl.dark.border', scale: 1 },
    images: rendered.map(({ bytes, ...capture }) => ({ ...capture,
      desktopCommit: sourceCommit, desktopDirty: sourceDirty }))
  };
  await writeFile(path.join(runRoot, 'generated.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Rendered ${captures.length} images from desktop ${sourceCommit}${sourceDirty ? ' (with local changes)' : ''}.`);
  console.log(`Preview and report: ${runRoot}`);
  if (mode === 'render') {
    if (values.output) {
      const destination = path.resolve(values.output);
      // Artifacts retain current-docs paths so they can be reviewed and copied back as a group.
      await publishCaptures(captures, runRoot, destination, 'update');
      await copyFile(path.join(runRoot, 'generated.json'), path.join(destination, 'generated.json'));
      console.log(`Artifact: ${destination}`);
    }
    return;
  }
  const { changed } = await publishCaptures(captures, runRoot, repoRoot, mode);
  for (const file of changed) console.log(`${mode === 'update' ? 'Updated' : 'Stale'}: ${file}`);
  console.log(`${changed.length} of ${captures.length} screenshots ${mode === 'update' ? 'updated' : 'differ'}.`);
  if (mode === 'update') {
    // Merge provenance for partial updates instead of losing records for other scenarios/locales.
    const reportPath = path.join(repoRoot, 'screenshots/generated.json');
    const previous = JSON.parse(await readFile(reportPath, 'utf8').catch(error => {
      if (error.code === 'ENOENT') return '{"images":[]}';
      throw error;
    }));
    const updated = new Set(captures.map(capture => capture.path));
    const provenance = { ...report, images: [
      ...previous.images.filter(image => !updated.has(image.path)),
      ...report.images
    ].sort((left, right) => left.path.localeCompare(right.path)) };
    await writeFile(reportPath, `${JSON.stringify(provenance, null, 2)}\n`);
  }
  if (mode === 'check' && changed.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
