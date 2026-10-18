import React, { useState } from 'react';
import TLink from '../components/TLink';
import DragSlider from '../components/DragSlider';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';
import { ClayCta } from './Home';
import { useSiteMotion } from '../motion/SiteMotion';
import { Reveal, Scramble, usePageMotion } from '../motion/text';
import { pad } from '../content';

function ProductRow({ product, index }) {
    const [photo, setPhoto] = useState(0);
    const photos = product.photos || [];

    return (
        <article className="mat-row" data-fade>
            <span className="mono mat-index">{pad(index + 1)}</span>
            <div className="mat-head">
                <h2>{product.name}</h2>
                {product.brand && <span className="mono">by {product.brand}</span>}
            </div>
            <p className="mat-desc">{product.description}</p>
            <div className="mat-media">
                {photos[photo] && <img src={photos[photo]} alt={product.name} loading="lazy" />}
                {photos.length > 1 && (
                    <div className="mat-dots">
                        {photos.map((src, i) => (
                            <button
                                type="button"
                                key={src}
                                className={i === photo ? 'is-on' : ''}
                                onClick={() => setPhoto(i)}
                                aria-label={`Show photo ${i + 1} of ${product.name}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}

function Materials() {
    const { loaded } = useSiteMotion();
    const { products, status, reload } = useProducts();
    usePageMotion([status]);

    return (
        <div className="page page-materials">
            <section className="page-hero page-hero-tight">
                <div className="page-hero-top mono">
                    <Scramble text="[ Material library ]" />
                    <span>
                        <span className="live-dot" /> {status === 'ready' ? `${pad(products.length)} items live` : 'Connecting…'}
                    </span>
                </div>
                {loaded && <Reveal as="h1" className="page-title" text={'Materials,\ncurated.'} immediate delay={0.1} />}
                <p className="body-l page-hero-lead">
                    Finishes and materials we source as part of one project system — chosen to protect the design intent and
                    the budget.
                </p>
            </section>

            {status === 'ready' && products.length > 0 && (
                <>
                    <section className="library library-flat" data-theme="dark">
                        <DragSlider
                            items={products}
                            getKey={(p) => p.id || p.name}
                            label="Materials"
                            renderItem={(product, i) => <ProductCard product={product} index={i} />}
                        />
                    </section>
                    <section className="mat-list">
                        {products.map((product, i) => (
                            <ProductRow product={product} index={i} key={product.id || product.name} />
                        ))}
                    </section>
                </>
            )}

            {status === 'loading' && <div className="mat-loading mono">Loading the catalogue…</div>}
            {(status === 'error' || (status === 'ready' && products.length === 0)) && (
                <div className="library-empty library-empty-light">
                    <p>The catalogue is offline right now.</p>
                    <button type="button" className="pill" onClick={reload}>
                        Try again
                    </button>
                </div>
            )}

            <section className="mat-brochure">
                <p className="mono">[ Print edition ]</p>
                <h2 className="h-l">Every material, laid out as an A4 brochure.</h2>
                <TLink to="/brochure" label="Brochure" className="pill pill-solid">
                    Open the brochure
                </TLink>
            </section>

            <ClayCta />
        </div>
    );
}

export default Materials;
