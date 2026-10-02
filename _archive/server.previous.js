const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const types = { '.html': 'text/html', '.png': 'image/png', '.js': 'text/javascript' };
const stitchProjectsPage = 'theme-source/stitch_personal_portfolio_website/featured_projects_interactive_ascii_architecture/code.html';

http.createServer((request, response) => {
  let requestedPath = decodeURIComponent(request.url.split('?')[0]);
  if (requestedPath === '/') requestedPath = `/${stitchProjectsPage}`;
  const filePath = path.join(root, requestedPath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    return response.end('Forbidden');
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      return response.end('Not found');
    }
    const type = types[path.extname(filePath)] || 'application/octet-stream';
    if (requestedPath.endsWith(stitchProjectsPage)) {
      const enhancedPage = data.toString().replace('</body>', '<script src="/project-data.js"></script><script src="/showcase.js"></script></body>');
      response.writeHead(200, { 'Content-Type': type });
      return response.end(enhancedPage);
    }
    response.writeHead(200, { 'Content-Type': type });
    response.end(data);
  });
}).listen(4173, () => console.log('Portfolio available at http://127.0.0.1:4173'));
