import { useCallback, useEffect, useState } from 'react';

// Loads the live catalogue from the Neo4j-backed /api/products endpoint.
export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('loading');

    const load = useCallback(async () => {
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
        load();
    }, [load]);

    return { products, status, reload: load };
}
