// Minimal client for the Neo4j Query API (HTTP). Credentials come from the
// environment so they never reach the browser bundle.

function getConfig() {
    const { NEO4J_QUERY_URL, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

    if (!NEO4J_QUERY_URL || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
        throw new Error('Neo4j is not configured. Set NEO4J_QUERY_URL, NEO4J_USERNAME and NEO4J_PASSWORD.');
    }

    return { url: NEO4J_QUERY_URL, username: NEO4J_USERNAME, password: NEO4J_PASSWORD };
}

async function runQuery(statement, parameters = {}) {
    const { url, username, password } = getConfig();
    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({ statement, parameters }),
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok || (body.errors && body.errors.length)) {
        const message = body.errors?.[0]?.message || `HTTP ${response.status}`;
        throw new Error(`Neo4j query failed: ${message}`);
    }

    // Query API returns { data: { fields: [...], values: [[...], ...] } }.
    const { fields = [], values = [] } = body.data || {};
    return values.map((row) => Object.fromEntries(fields.map((field, index) => [field, row[index]])));
}

module.exports = { runQuery };
