"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIndexHtml = exports.getAbsoluteFSPath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { getAbsoluteFSPath } = require("./swagger-ui-dist");
exports.getAbsoluteFSPath = getAbsoluteFSPath;
const htmlHead = `
<!-- HTML for static distribution bundle build -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Swagger UI</title>
    <link rel="stylesheet" type="text/css" href="./swagger-ui.css" />
    <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
    <style>
      html
      {
        box-sizing: border-box;
        overflow: -moz-scrollbars-vertical;
        overflow-y: scroll;
      }

      *,
      *:before,
      *:after
      {
        box-sizing: inherit;
      }

      body
      {
        margin:0;
        background: #fafafa;
      }
    </style>
  </head>

  <body>
    <div id="swagger-ui"></div>

    <script src="./swagger-ui-bundle.js" charset="UTF-8"> </script>
    <script src="./swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
    <script>
    window.onload = function() {
      // Begin Swagger UI call region
      const ui = SwaggerUIBundle({
`;
const htmlTail = `
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        displayRequestDuration: true,
        defaultModelsExpandDepth: -1,
      });
      // End Swagger UI call region

      window.ui = ui;
    };
  </script>
  </body>
</html>
`;
const generateIndexHtml = (spec, filePath) => {
    let htmlBody = '        urls: [\n';
    let primaryName;
    if (Array.isArray(spec)) {
        primaryName = spec[0].name;
        spec.forEach(e => htmlBody += `            { name: '${e.name}', url: \`\${location.origin}${e.url}\` },\n`);
    }
    else {
        primaryName = spec.name;
        htmlBody += `            { name: '${spec.name}', url: \`\${location.origin}${spec.url}\` },\n`;
    }
    htmlBody += '        ],\n';
    htmlBody += `        'urls.primaryName': '${primaryName}',`;
    fs_1.default.writeFileSync(path_1.default.join(filePath, 'index.html'), htmlHead + htmlBody + htmlTail);
    return htmlHead + htmlBody + htmlTail;
};
exports.generateIndexHtml = generateIndexHtml;
//# sourceMappingURL=index.js.map