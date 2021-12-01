const cliSelect = require("cli-select");
const fs = require("fs");
const path = require("path");

const argv = process.argv.slice(2);
const rootdir = argv[0];

const childDirs = fs
  .readdirSync(rootdir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .filter((name) => !name.startsWith("."));

cliSelect({ values: ["root", ...childDirs], outputStream: process.stderr })
  .then((x) => {
    if (x.value === "root") {
      console.log(rootdir);
      return;
    }
    console.log(path.join(rootdir, x.value));
  })
  .catch(() => {
    console.log(".");
    return;
  });
