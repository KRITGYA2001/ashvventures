const { handleProductsRequest } = require('../../server/products');

exports.handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, headers: { Allow: 'GET' }, body: 'Method Not Allowed' };
    }

    return handleProductsRequest();
};
