import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Brochure.css';

const company = {
    name: 'ASHV Ventures',
    disciplines: ['Architecture', 'Construction', 'Material Supply'],
    tagline: 'Design, construction, and material supply in one delivery flow.',
    email: 'contact@ashvventures.com',
    phone: '+91 8700832180',
    whatsapp: 'wa.me/918700832180',
    website: 'www.ashvventures.com',
    address: 'H. No. 178-B, Ground Floor, Basant Nagar, New Delhi - 110057, India',
    hours: 'Monday to Saturday, 9:00 AM - 6:00 PM',
};

const services = [
    {
        title: 'Design Strategy',
        copy: 'Concepts shaped around space, materials, and execution from the beginning, so design decisions hold up on site.',
        image: '/images/slides/ashv-hero.png',
    },
    {
        title: 'Construction Delivery',
        copy: 'Execution that stays disciplined from planning through on-site delivery, with clear sequencing and quality checkpoints.',
        image: '/images/slides/ashv-construction.png',
    },
    {
        title: 'Material Coordination',
        copy: 'Finishes and materials curated to protect the design intent and the budget, sourced as part of one project system.',
        image: '/images/slides/ashv-materials.png',
    },
];

const values = ['Clarity in communication', 'Respect for timelines', 'Detail-led quality', 'Long-term accountability'];

const PRODUCTS_PER_OVERVIEW = 6;

// Pixel motifs drawn on a square grid, echoing the reference template.
const GLYPHS = {
    cross: ['X.X', '.X.', 'X.X'],
    chevron: ['XX.XX', '.XXX.'],
    arrow: ['.X.', '.X.', 'XXX', '.X.'],
    plus: ['.X.', 'XXX', '.X.'],
};
const GLYPH_ORDER = ['plus', 'cross', 'arrow', 'chevron'];

const pad = (value) => String(value).padStart(2, '0');

function splitTitle(text) {
    const [first, ...rest] = text.split(' ');
    return rest.length ? [first, rest.join(' ')] : [text, ''];
}

function chunk(items, size) {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
    return chunks;
}

function TwoToneTitle({ accent, text, as: Tag = 'h2', className = '' }) {
    return (
        <Tag className={`bro-title ${className}`}>
            <span className="bro-title-accent">{accent}</span>
            {text && <span className="bro-title-rest">{text}</span>}
        </Tag>
    );
}

function CellTitle({ text }) {
    const [first, rest] = splitTitle(text);
    return (
        <h3 className="bro-cell-title">
            {first}
            {rest && <br />}
            {rest}
        </h3>
    );
}

function Glyph({ shape = 'cross', className = '' }) {
    const rows = GLYPHS[shape];
    return (
        <svg className={`bro-glyph ${className}`} viewBox={`0 0 ${rows[0].length} ${rows.length}`} aria-hidden="true">
            {rows.flatMap((row, y) =>
                [...row].map((cell, x) =>
                    cell === 'X' ? (
                        <rect key={`${x}-${y}`} x={x + 0.03} y={y + 0.03} width="0.94" height="0.94" rx="0.16" />
                    ) : null
                )
            )}
        </svg>
    );
}

// The cut-outs live in /public, so the mask URL is set inline: CSS url()s
// would be resolved by the bundler instead.
const LOGO_SRC = {
    mark: '/images/logo/logo-mark.png',
    full: '/images/logo/logo-full.png',
};

function LogoMark({ variant = 'mark', className = '' }) {
    const mask = `url(${LOGO_SRC[variant]})`;

    return (
        <span
            className={`bro-logo bro-logo-${variant} ${className}`}
            style={{ WebkitMaskImage: mask, maskImage: mask }}
            role="img"
            aria-label="Ashv Ventures logo"
        />
    );
}

function Photo({ src, alt, className = '' }) {
    const [failed, setFailed] = useState(!src);

    return (
        <figure className={`bro-photo ${className} ${failed ? 'bro-photo-missing' : ''}`}>
            {!failed && <img src={src} alt={alt} onError={() => setFailed(true)} />}
        </figure>
    );
}

function Page({ number, label, tone = 'dark', className = '', children }) {
    return (
        <article className={`bro-page bro-${tone} ${className}`}>
            <div className="bro-page-inner">
                <header className="bro-meta">
                    <span>{company.name}</span>
                    <span>{label}</span>
                    <span>{number ? `${pad(number)}.` : new Date().getFullYear()}</span>
                </header>
                {children}
            </div>
        </article>
    );
}

function CoverPage({ year }) {
    return (
        <Page label="Company Profile" className="bro-cover">
            <div className="bro-band bro-cover-head">
                <TwoToneTitle as="h1" accent="Architecture" text="Brochure" />
                <div className="bro-cover-intro">
                    <Glyph shape="cross" />
                    <p>{company.tagline}</p>
                </div>
            </div>
            <div className="bro-band bro-flush bro-grow bro-gutter-grid">
                <div className="bro-gutter">
                    <span className="bro-vertical">{company.disciplines.join('  /  ')}</span>
                </div>
                <div className="bro-visual">
                    <Photo src="/images/slides/ashv-hero.png" alt="Ashv Ventures residential project" className="bro-mono" />
                    <span className="bro-badge bro-cover-badge">
                        Product
                        <br />
                        Catalogue
                        <br />
                        {year}
                    </span>
                </div>
            </div>
            <div className="bro-band bro-flush bro-cells bro-cover-foot">
                <div className="bro-cell bro-cell-center">
                    <LogoMark />
                </div>
                <div className="bro-cell">
                    <dl className="bro-facts">
                        <dt>Prepared by</dt>
                        <dd>{company.name}, New Delhi</dd>
                        <dt>Edition</dt>
                        <dd>{year} Product Catalogue</dd>
                    </dl>
                </div>
                <div className="bro-cell">
                    <dl className="bro-facts">
                        <dt>Disciplines</dt>
                        <dd>{company.disciplines.join(', ')}</dd>
                        <dt>Website</dt>
                        <dd>{company.website}</dd>
                    </dl>
                </div>
            </div>
        </Page>
    );
}

function ContentsPage({ entries }) {
    return (
        <Page number={1} label="Contents" tone="light">
            <div className="bro-band bro-split">
                <TwoToneTitle accent="Table of" text="Contents" />
                <div className="bro-split-aside">
                    <Glyph shape="arrow" />
                    <p className="bro-lead">
                        How Ashv Ventures works, and the materials we supply, compiled from our live product catalogue.
                    </p>
                </div>
            </div>
            <ol className="bro-band bro-flush bro-grow bro-toc">
                {entries.map((entry) => (
                    <li key={entry.title}>
                        <span className="bro-toc-range">{entry.range}</span>
                        <div>
                            <strong>{entry.title}</strong>
                            <p>{entry.copy}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </Page>
    );
}

function OverviewPage({ number }) {
    return (
        <Page number={number} label="Company Overview">
            <div className="bro-band bro-split">
                <TwoToneTitle accent="Our Company" text="Overview" />
                <p className="bro-lead bro-split-aside">
                    One quality standard across design, build, and supply, delivered from New Delhi.
                </p>
            </div>
            <div className="bro-band bro-flush bro-grow bro-gutter-grid">
                <div className="bro-gutter" />
                <div className="bro-visual">
                    <Photo src="/images/slides/ashv-construction.png" alt="Ashv Ventures construction site" className="bro-mono" />
                    <Glyph shape="cross" className="bro-glyph-float bro-overview-glyph" />
                </div>
            </div>
            <div className="bro-band bro-flush bro-cells bro-cells-gutter">
                <div className="bro-cell" />
                <div className="bro-cell">
                    <CellTitle text="What we Do" />
                    <p>
                        Ashv Ventures combines design, construction, and material supply so clients do not need to
                        manage fragmented partners across the same project.
                    </p>
                </div>
                <div className="bro-cell">
                    <CellTitle text="Our Values" />
                    <ul className="bro-list">
                        {values.map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Page>
    );
}

function VisionPage({ number }) {
    return (
        <Page number={number} label="Vision & Mission" tone="light">
            <div className="bro-band bro-flush bro-cells bro-cells-2">
                <div className="bro-cell bro-vision-intro">
                    <Glyph shape="chevron" />
                    <p>
                        We set out to make project delivery feel more coherent, more disciplined, and more premium from
                        the first discussion to the final handover.
                    </p>
                </div>
                <div className="bro-cell bro-cell-end">
                    <TwoToneTitle accent="Vision &" text="Mission" />
                </div>
            </div>
            <div className="bro-band bro-flush bro-grow bro-cells bro-cells-2">
                <div className="bro-cell">
                    <CellTitle text="Vision" />
                    <p>
                        A single standard of quality across design, build, and supply, so every project feels resolved
                        rather than assembled in parts.
                    </p>
                </div>
                <Photo src="/images/slides/ashv-interior.png" alt="Ashv Ventures interior" className="bro-mono" />
            </div>
            <div className="bro-band bro-flush bro-grow bro-cells bro-cells-2">
                <Photo src="/images/slides/ashv-materials.png" alt="Material samples" className="bro-mono" />
                <div className="bro-cell">
                    <CellTitle text="Mission" />
                    <p>
                        Connect decisions across design, construction, and materials. Keep updates and next steps
                        visible, respect timelines, and protect execution quality through finishes and practical
                        oversight at every stage.
                    </p>
                </div>
            </div>
        </Page>
    );
}

function ExpertisePage({ number }) {
    return (
        <Page number={number} label="Our Expertise">
            <div className="bro-band bro-flush bro-cells bro-expertise-head">
                <div className="bro-cell">
                    <div className="bro-glyph-pair">
                        <Glyph shape="chevron" className="bro-glyph-soft" />
                        <Glyph shape="chevron" />
                    </div>
                    <p>Three disciplines, managed as one project system instead of disconnected vendors.</p>
                </div>
                <div className="bro-cell">
                    <TwoToneTitle accent="Our" text="Expertise" />
                </div>
            </div>
            <div className="bro-band bro-flush bro-grow bro-cells bro-cells-3">
                {services.map((service, index) => (
                    <div className="bro-cell bro-service" key={service.title}>
                        <span className="bro-service-number">{pad(index + 1)}.</span>
                        <CellTitle text={service.title} />
                        <p>{service.copy}</p>
                        <Photo src={service.image} alt={service.title} className="bro-mono" />
                    </div>
                ))}
            </div>
        </Page>
    );
}

function ProductTile({ product, index }) {
    return (
        <div className="bro-tile">
            <div className="bro-frame">
                <Photo src={product.photos?.[0]} alt={product.name} />
                <span className="bro-tag">{pad(index + 1)}.</span>
                <Glyph shape={GLYPH_ORDER[index % GLYPH_ORDER.length]} className="bro-tile-glyph" />
            </div>
            <strong>{product.name}</strong>
            {product.brand && <span>by {product.brand}</span>}
        </div>
    );
}

function CollectionPage({ number, products, offset }) {
    return (
        <Page number={number} label="Product Collection" tone="light">
            <div className="bro-band bro-flush bro-cells bro-cells-2">
                <div className="bro-cell">
                    <TwoToneTitle accent="Product" text="Collection" />
                </div>
                <div className="bro-cell bro-collection-quote">
                    <Glyph shape="cross" />
                    <div>
                        <span>{company.name}</span>
                        <p>&ldquo;Specified, Sourced, and Supplied in One Flow&rdquo;</p>
                    </div>
                </div>
            </div>
            <div className="bro-band bro-grow bro-tiles">
                {products.map((product, index) => (
                    <ProductTile product={product} index={offset + index} key={product.id || product.name} />
                ))}
            </div>
            <div className="bro-band bro-flush bro-cells bro-cells-2">
                <div className="bro-cell">
                    <h3 className="bro-label">Curated Supply</h3>
                    <p>Every product is selected to protect the design intent and the budget, then sourced as part of the same project system.</p>
                </div>
                <div className="bro-cell">
                    <h3 className="bro-label">Specification Support</h3>
                    <p>Share drawings or material references and we will help you choose finishes, quantities, and delivery timelines.</p>
                </div>
            </div>
        </Page>
    );
}

function ProductPage({ product, index, total, number, tone }) {
    const [accent, rest] = splitTitle(product.name);
    const [mainPhoto, ...extraPhotos] = product.photos || [];
    const thumbs = extraPhotos.slice(0, 2);

    return (
        <Page number={number} label="Product Collection" tone={tone} className="bro-product">
            <div className="bro-band bro-product-head">
                <div>
                    <p className="bro-label">
                        Product {pad(index + 1)} / {pad(total)}
                    </p>
                    <TwoToneTitle accent={accent} text={rest} />
                </div>
                {product.brand && <span className="bro-badge bro-badge-brand">{product.brand}</span>}
            </div>
            <div className={`bro-band bro-flush bro-grow bro-gallery ${thumbs.length ? 'has-thumbs' : ''}`}>
                <div className="bro-gutter" />
                <div className="bro-visual">
                    <Photo src={mainPhoto} alt={product.name} />
                    <span className="bro-tag">{pad(index + 1)}.</span>
                </div>
                {thumbs.length > 0 && (
                    <div className="bro-gallery-side">
                        {thumbs.map((photo, photoIndex) => (
                            <div className="bro-frame" key={photo}>
                                <Photo src={photo} alt={`${product.name} detail ${photoIndex + 1}`} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bro-band bro-flush bro-cells bro-product-details">
                <div className="bro-cell">
                    <h3 className="bro-label">Description</h3>
                    <p>{product.description}</p>
                </div>
                <div className="bro-cell">
                    <dl className="bro-facts">
                        <dt>Brand</dt>
                        <dd>{product.brand || '—'}</dd>
                        <dt>Supplied by</dt>
                        <dd>{company.name}</dd>
                        <dt>Enquiries</dt>
                        <dd>{company.email}</dd>
                    </dl>
                </div>
            </div>
        </Page>
    );
}

function ContactPage({ number }) {
    const details = [
        { label: 'Mail Address', value: company.email },
        { label: 'Business Number', value: company.phone },
        { label: 'WhatsApp', value: company.whatsapp },
        { label: 'Company Website', value: company.website },
        { label: 'Company Address', value: company.address },
        { label: 'Office Hours', value: company.hours },
    ];

    return (
        <Page number={number} label="Contact Information" tone="light">
            <div className="bro-band bro-flush bro-cells bro-cells-2">
                <div className="bro-cell">
                    <TwoToneTitle accent="Contact" text="Information" />
                </div>
                <div className="bro-cell bro-cell-end">
                    <p className="bro-callout">Feel Free to Contact Us at Anytime</p>
                </div>
            </div>
            <div className="bro-band bro-flush bro-grow bro-contact-visual">
                <div className="bro-gutter" />
                <Photo src="/images/slides/ashv-hero.png" alt="Ashv Ventures project" className="bro-mono bro-contact-photo" />
                <div className="bro-cell bro-cell-center">
                    <Glyph shape="arrow" />
                </div>
            </div>
            <dl className="bro-band bro-contact-grid">
                {details.map((detail) => (
                    <div key={detail.label}>
                        <dt>{detail.label}</dt>
                        <dd>{detail.value}</dd>
                    </div>
                ))}
            </dl>
        </Page>
    );
}

function BackCover({ number }) {
    return (
        <Page number={number} label="Thank You" className="bro-back">
            <div className="bro-band bro-grow bro-back-body">
                <LogoMark variant="full" />
                <p>{company.tagline}</p>
                <div className="bro-glyph-pair">
                    <Glyph shape="cross" />
                    <Glyph shape="cross" className="bro-glyph-soft" />
                    <Glyph shape="cross" />
                </div>
            </div>
            <div className="bro-band bro-flush bro-cells bro-cells-3">
                <div className="bro-cell">
                    <h3 className="bro-label">Website</h3>
                    <p>{company.website}</p>
                </div>
                <div className="bro-cell">
                    <h3 className="bro-label">Mail Address</h3>
                    <p>{company.email}</p>
                </div>
                <div className="bro-cell">
                    <h3 className="bro-label">Business Number</h3>
                    <p>{company.phone}</p>
                </div>
            </div>
        </Page>
    );
}

function waitForImages() {
    const pending = Array.from(document.querySelectorAll('.bro-page img')).filter((img) => !img.complete);
    return Promise.all(
        pending.map(
            (img) =>
                new Promise((resolve) => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                })
        )
    );
}

function Brochure() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('loading');
    const year = new Date().getFullYear();

    const loadProducts = useCallback(async () => {
        setStatus('loading');
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            setProducts(data.products || []);
            setStatus('ready');
        } catch (error) {
            console.error('Failed to load products', error);
            setStatus('error');
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = `Ashv Ventures - Architecture Brochure ${year}`;
        document.body.classList.add('is-brochure');

        return () => {
            document.title = previousTitle;
            document.body.classList.remove('is-brochure');
        };
    }, [year]);

    const handleDownload = async () => {
        await waitForImages();
        window.print();
    };

    // Page numbers follow the live product count.
    const overviewChunks = chunk(products, PRODUCTS_PER_OVERVIEW);
    const collectionStart = 5;
    const firstProductPage = collectionStart + overviewChunks.length;
    const contactPage = firstProductPage + products.length;
    const range = (from, to) => (from === to ? pad(from) : `${pad(from)} - ${pad(to)}`);

    const contents = [
        { range: '02', title: 'Company Overview', copy: 'Who we are and how we connect design, build, and supply.' },
        { range: '03', title: 'Vision & Mission', copy: 'The standard we hold every project to, from brief to handover.' },
        { range: '04', title: 'Our Expertise', copy: 'Design strategy, construction delivery, and material coordination.' },
        products.length > 0 && {
            range: range(collectionStart, contactPage - 1),
            title: 'Product Collection',
            copy: `${products.length} curated ${products.length === 1 ? 'product' : 'products'} from our live catalogue.`,
        },
        { range: pad(contactPage), title: 'Contact Information', copy: 'Reach the team by email, phone, or WhatsApp.' },
    ].filter(Boolean);

    return (
        <div className="bro-root">
            <div className="bro-toolbar">
                <Link to="/" className="bro-toolbar-back">&larr; Back to site</Link>
                <span className="bro-toolbar-title">Architecture Brochure {year}</span>
                <button type="button" className="bro-toolbar-btn" onClick={handleDownload} disabled={status !== 'ready'}>
                    Download PDF
                </button>
            </div>

            {status === 'loading' && <p className="bro-status">Preparing your brochure&hellip;</p>}

            {status === 'error' && (
                <div className="bro-status">
                    <p>We couldn&apos;t load the product catalogue right now.</p>
                    <button type="button" className="bro-toolbar-btn" onClick={loadProducts}>Try again</button>
                </div>
            )}

            {status === 'ready' && (
                <div className="bro-stage">
                    <CoverPage year={year} />
                    <ContentsPage entries={contents} />
                    <OverviewPage number={2} />
                    <VisionPage number={3} />
                    <ExpertisePage number={4} />
                    {overviewChunks.map((group, groupIndex) => (
                        <CollectionPage
                            key={`collection-${groupIndex}`}
                            number={collectionStart + groupIndex}
                            products={group}
                            offset={groupIndex * PRODUCTS_PER_OVERVIEW}
                        />
                    ))}
                    {products.map((product, index) => (
                        <ProductPage
                            key={product.id || product.name}
                            product={product}
                            index={index}
                            total={products.length}
                            number={firstProductPage + index}
                            tone={index % 2 === 0 ? 'dark' : 'light'}
                        />
                    ))}
                    <ContactPage number={contactPage} />
                    <BackCover number={contactPage + 1} />
                </div>
            )}
        </div>
    );
}

export default Brochure;
