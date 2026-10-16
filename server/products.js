const { runQuery } = require('./neo4j');

async function listProducts() {
    const rows = await runQuery(`
        MATCH (p:Product)
        RETURN p.id AS id,
               p.name AS name,
               p.description AS description,
               p.brand AS brand,
               coalesce(p.photos, []) AS photos
        ORDER BY coalesce(p.sortOrder, 999), p.name
    `);

    return rows;
}

// Shared by the Netlify Function and the local dev server.
async function handleProductsRequest() {
    try {
        const products = await listProducts();
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=60',
            },
            body: JSON.stringify({ products }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Unable to load products right now.' }),
        };
    }
}

module.exports = { listProducts, handleProductsRequest };
