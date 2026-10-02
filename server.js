/* ---------------------------------------------------------------------------
 * server.js — zero-dependency static server for local preview.
 *   node server.js      →  http://127.0.0.1:4173
 *
 * The theme-source/ folder holds the original Google Stitch exports kept for
 * design reference; it is served read-only so the implementation can be
 * compared against the source design.
 * ------------------------------------------------------------------------- */
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT) || 4173;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

/** Clean, single-file URLs for the two real pages. */
const routes = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/project': 'project.html',
  '/projects': 'project.html',
  '/project.html': 'project.html'
};

http
  .createServer((request, response) => {
    let requested = decodeURIComponent((request.url || '/').split('?')[0]);
    if (requested.length > 1 && requested.endsWith('/')) {
      requested = requested.slice(0, -1);
    }

    const relative = routes[requested] || requested.replace(/^\/+/, '');
    const filePath = path.join(root, relative);

    // Never serve outside the project directory.
    if (!filePath.startsWith(root)) {
      response.writeHead(403, { 'Content-Type': 'text/plain' });
      return response.end('Forbidden');
    }

    fs.stat(filePath, (statError, stats) => {
      if (statError || !stats.isFile()) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        return response.end('Not found: ' + relative);
      }

      const type = types[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
      response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });

      if (request.method === 'HEAD') return response.end();
      fs.createReadStream(filePath).pipe(response);
    });
  })
  .listen(port, () => {
    console.log('Portfolio running at http://127.0.0.1:' + port);
    console.log('  Homepage   -> http://127.0.0.1:' + port + '/');
    console.log('  Case study -> http://127.0.0.1:' + port + '/project?slug=karmavriti');
  });