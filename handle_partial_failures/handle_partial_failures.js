const http = require('http');
const fs = require('fs').promises;

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/error-handling') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      let files;

      // перевірка JSON
      try {
        files = JSON.parse(body);
        if (!Array.isArray(files)) {
          throw new Error();
        }
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }

      try {
        const results = await Promise.allSettled(
          files.map(file => fs.readFile(file, 'utf-8'))
        );

        const successes = [];
        const failures = [];

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            successes.push(result.value.trim());
          } else {
            failures.push(files[index]);
          }
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          successes,
          failures,
          total: files.length
        }));

      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unexpected error' }));
      }
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});