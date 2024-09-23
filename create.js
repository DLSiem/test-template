import fs from "fs";
import path from "path";

// destination folder
const targetDir = process.argv[2] || "rest-template";

// template folder
const templateDir = path.resolve(__dirname, "template");

// copy files from template to destination

fs.copy(templateDir, targetDir, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Template created successfully");
});
