import React from 'react';
import TLink from '../components/TLink';
import { Scramble } from '../motion/text';

function NotFound() {
    return (
        <div className="page page-404">
            <Scramble as="p" className="mono" text="[ Error 404 — Off the drawing ]" />
            <h1 className="page-title">
                <Scramble text="Not built yet." />
            </h1>
            <TLink to="/" label="Home" className="pill pill-solid">
                Back to home
            </TLink>
        </div>
    );
}

export default NotFound;
