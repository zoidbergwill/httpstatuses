#!/usr/bin/env node
const fs = require("fs");
const yaml = require("js-yaml");

const base = "contents/codes";
const files = fs.readdirSync(base);

files.map((filename) => {
  if (!filename.endsWith(".md")) {
    return
  }
  const result = `build/${filename.replace(".md", ".json")}`;
  // TODO: Make this work in a portable way
  filename = `${base}/${filename}`;
  console.log(`Processing ${filename}`);
  console.log(`Writing it to ${result}`);
  let output = {};

  const documents = fs.readFileSync("contents/codes/200.md").toString().split("---\n");
  const frontmatter = documents[1];
  output.description = documents[2].trim();

  try {
    const doc = yaml.load(frontmatter);
    output = Object.assign(output, doc);
  } catch (e) {
    console.log(e);
  }

  fs.writeFileSync(result, JSON.stringify(output, null, '\t'));
})

