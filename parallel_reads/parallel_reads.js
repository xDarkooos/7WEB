const http = require('http');
const fs = require('fs').promises;

const PORT = process.argv[2] || 3000;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/parallel') {
    const start = Date.now();

    try {
      // паралельне читання
      const [a, b, c] = await Promise.all([
        fs.readFile('a.txt', 'utf-8'),
        fs.readFile('b.txt', 'utf-8'),
        fs.readFile('c.txt', 'utf-8')
      ]);

      const combined = a.trim() + b.trim() + c.trim();
      const elapsedMs = Date.now() - start;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ combined, elapsedMs }));

    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File read error' }));
    }

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});