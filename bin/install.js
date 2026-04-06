#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgRoot = path.resolve(__dirname, "..");
const target = path.join(os.homedir(), ".agents", "skills", "clean-code");

const sourceReal = fs.realpathSync(pkgRoot);
const targetReal = fs.existsSync(target) ? fs.realpathSync(target) : null;
if (targetReal && sourceReal === targetReal) {
  console.log(`Skill already present at ${target}`);
  process.exit(0);
}

fs.mkdirSync(target, { recursive: true });

const copyFile = (from, to) => {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};

copyFile(path.join(pkgRoot, "SKILL.md"), path.join(target, "SKILL.md"));
copyFile(path.join(pkgRoot, "README.md"), path.join(target, "README.md"));

const refSrc = path.join(pkgRoot, "references");
const refDst = path.join(target, "references");
fs.mkdirSync(refDst, { recursive: true });
for (const entry of fs.readdirSync(refSrc, { withFileTypes: true })) {
  if (entry.isFile()) {
    copyFile(path.join(refSrc, entry.name), path.join(refDst, entry.name));
  }
}

console.log(`Installed clean-code skill to ${target}`);
