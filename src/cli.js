import babelParser from '@babel/parser';
import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';
import prettier from 'prettier';

const entry = process.argv[2];
const appName = entry.endsWith('/index.js')
  ? path.basename(path.dirname(entry))
  : entry.replace('.js', '');
const file = `${fs.readFileSync(entry)}`;

const outDir = path.join(path.dirname(entry), 'actual');

console.log('--- BEFORE ---');
console.log(file);

const ast = babelParser.parse(file, {
  sourceType: 'module',
  tokens: true,
});

const body = ast.program.body;
const exportDefault = _.find(body, n => n.type === 'ExportDefaultDeclaration');

if (!exportDefault) {
  throw new Error('No default export found in source');
}

// console.log(ast);
// console.log(exportDefault);

switch (exportDefault.declaration.type) {
  case 'StringLiteral': {
    const indexHtml = prettier.format(
      html(appName, exportDefault.declaration.value),
      {
        parser: 'html',
      },
    );
    console.log('--- AFTER ---');
    console.log(indexHtml);
    fs.ensureDirSync(outDir);
    fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
    break;
  }

  case 'TaggedTemplateExpression': {
    console.log(exportDefault.declaration);
    // const indexHtml = prettier.format(
    //   html(appName, exportDefault.declaration.value),
    //   {
    //     parser: 'html',
    //   },
    // );
    // console.log('--- AFTER ---');
    // console.log(indexHtml);
    // fs.ensureDirSync(outDir);
    // fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
    break;
  }

  case 'CallExpression':
    // figure out if it is static or not
    break;
}

function html(title, body) {
  return `<!doctype html>
    <html>
      <head><title>${title}</title></head>
      <body>${body}</body>
    </html>`;
}
