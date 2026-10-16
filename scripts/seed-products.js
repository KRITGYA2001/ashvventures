// Seeds sample Product nodes. Safe to re-run: products are matched by id.
// Usage: npm run seed
const { runQuery } = require('../server/neo4j');

const products = [
    {
        id: 'carrara-white-marble',
        name: 'Carrara White Marble',
        brand: 'R K Marble',
        description:
            'Italian white marble with soft grey veining, supplied as slabs and cut-to-size tiles for flooring, wall cladding, and countertops. Book-matching is available for feature walls and lobbies.',
        photos: [
            'https://upload.wikimedia.org/wikipedia/commons/0/00/Marble_Texture.png',
            'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvaXMxODQyNS1pbWFnZS1rd3lzOW93di5qcGc.jpg',
        ],
    },
    {
        id: 'structural-glazing-glass',
        name: 'Structural Glazing Façade Glass',
        brand: 'Saint-Gobain',
        description:
            'Toughened, laminated, and double-glazed units for curtain walls and structural glazing. Solar-control coatings help balance daylight, heat gain, and a clean exterior reflection.',
        photos: [
            'https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3Vwd2s2MjEzMzk3My13aWtpbWVkaWEtaW1hZ2Uta293bm5uZnouanBn.jpg',
            'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdXB3azYyMzc3MzMwLXdpa2ltZWRpYS1pbWFnZS1rb3dodm9vcC5qcGc.jpg',
            'https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3Vwd2s2MjIwODY0OC13aWtpbWVkaWEtaW1hZ2Uta293bjVlOHguanBn.jpg',
        ],
    },
    {
        id: 'single-lever-basin-mixer',
        name: 'Single-Lever Basin Mixer',
        brand: 'Jaquar',
        description:
            'Chrome-finish basin mixer with ceramic cartridge and aerated flow, specified for residential bathrooms and hospitality washrooms. Matching wall and deck-mounted fittings complete the set.',
        photos: ['https://live.staticflickr.com/705/22376444929_67ec1190d2_b.jpg'],
    },
    {
        id: 'solid-wood-plank-flooring',
        name: 'Solid Wood Plank Flooring',
        brand: 'Mikasa Floors',
        description:
            'Wide-plank hardwood flooring with a natural oiled finish that brings warmth to living spaces, studios, and boutique interiors. Supplied with underlay, skirting, and installation support.',
        photos: ['https://live.staticflickr.com/5498/18852210562_d00df2707f_b.jpg'],
    },
    {
        id: 'interlocking-concrete-pavers',
        name: 'Interlocking Concrete Pavers',
        brand: 'Unistone',
        description:
            'High-density concrete pavers for driveways, courtyards, and landscaped walkways. The interlocking profile spreads load evenly and allows individual blocks to be lifted and relaid.',
        photos: ['https://live.staticflickr.com/65535/50028701176_613c427b2d_b.jpg'],
    },
];

async function seed() {
    await runQuery('CREATE CONSTRAINT product_id IF NOT EXISTS FOR (p:Product) REQUIRE p.id IS UNIQUE');

    const rows = await runQuery(
        `
        UNWIND $products AS product
        MERGE (p:Product { id: product.id })
        SET p.name = product.name,
            p.brand = product.brand,
            p.description = product.description,
            p.photos = product.photos,
            p.sortOrder = product.sortOrder,
            p.updatedAt = datetime()
        RETURN count(p) AS seeded
        `,
        { products: products.map((product, index) => ({ ...product, sortOrder: index + 1 })) }
    );

    console.log(`Seeded ${rows[0].seeded} products.`);
}

seed().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
