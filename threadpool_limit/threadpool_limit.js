const http = require('http');
const crypto = require('crypto');
const { promisify } = require('util');

const pbkdf2 = promisify(crypto.pbkdf2);

const PORT = process.argv[2] || 3000;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/threadpool-limit') {
    const start = Date.now();

    try {
      const tasks = 8;

      const promises = [];

      for (let i = 0; i < tasks; i++) {
        promises.push(
          pbkdf2('password', 'salt', 100000, 64, 'sha512')
        );
      }

      await Promise.all(promises);

      const durationMs = Date.now() - start;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        tasks,
        durationMs
      }));

    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error' }));
    }

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});