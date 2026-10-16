// Local stand-in for the Netlify Function. `npm start` proxies /api/* here.
const http = require('http');
const { handleProductsRequest } = require('./products');

const PORT = process.env.API_PORT || 4000;

const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET' && pathname === '/api/products') {
        const { statusCode, headers, body } = await handleProductsRequest();
        res.writeHead(statusCode, headers);
        res.end(body);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
    console.log(`Products API listening on http://localhost:${PORT}/api/products`);
});
