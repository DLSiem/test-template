#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// get __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// destination folder
const args = process.argv.slice(2);

const projectDir = args[0]
  ? path.resolve(process.cwd(), args[0])
  : process.cwd();

// template folder
const templateDir = path.resolve(__dirname, "template");

// function to copy files from template to destination
const copyTemplateFiles = (src, dest) => {
  fs.readdirSync(src).forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyTemplateFiles(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

// check if a folder need to be created and copy files
if (args[0]) {
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
    console.log(`Created directory: ${projectDir}`);
  }
} else {
  console.log(`Using current directory: ${projectDir}`);
}

copyTemplateFiles(templateDir, projectDir);

console.log("Template setup completed!");
