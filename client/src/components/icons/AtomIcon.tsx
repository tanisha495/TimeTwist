import React from 'react';

const AtomIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" />
        <path d="M20.2 20.2c2.04-2.03.02-5.91-2.4-8.35s-6.32-4.44-8.35-2.4c-2.04 2.03-.02 5.91 2.4 8.35s6.32 4.44 8.35 2.4z" />
        <path d="M3.8 3.8c-2.04 2.03-.02 5.91 2.4 8.35s6.32 4.44 8.35 2.4c2.04-2.03.02-5.91-2.4-8.35s-6.32-4.44-8.35-2.4z" />
    </svg>
);
export default AtomIcon;