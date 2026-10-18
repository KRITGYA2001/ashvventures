import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteMotion } from '../motion/SiteMotion';

// A router link that plays the page wipe before navigating.
function TLink({ to, label, onClick, children, ...rest }) {
    const { go } = useSiteMotion();

    const handleClick = (event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        event.preventDefault();
        go(to, label || (typeof children === 'string' ? children : ''));
    };

    return (
        <Link to={to} onClick={handleClick} {...rest}>
            {children}
        </Link>
    );
}

export default TLink;
