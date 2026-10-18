import React, { useState } from 'react';
import { pad } from '../content';

function ProductCard({ product, index }) {
    const [failed, setFailed] = useState(false);
    const photo = product.photos?.[0];

    return (
        <article className="product-card">
            <figure className={`product-media ${failed || !photo ? 'is-missing' : ''}`}>
                {photo && !failed && (
                    <img src={photo} alt={product.name} draggable="false" loading="lazy" onError={() => setFailed(true)} />
                )}
                <span className="product-index mono">{pad(index + 1)}</span>
            </figure>
            <div className="product-meta">
                <h3>{product.name}</h3>
                {product.brand && <span className="mono">by {product.brand}</span>}
            </div>
        </article>
    );
}

export default ProductCard;
