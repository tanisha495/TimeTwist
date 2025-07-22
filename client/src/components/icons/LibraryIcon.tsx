import React from 'react';

const LibraryIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h14a2 2 0 0 0 2-2V7.5a2.5 2.5 0 0 0-2.5-2.5c-1.4 0-2.5 1.1-2.5 2.5V22" />
        <path d="M16 12H8" />
        <path d="M16 8H8" />
        <path d="M11 2v5" />
        <path d="M9 7.5a2.5 2.5 0 0 1-5 0V2" />
    </svg>
);

export default LibraryIcon;
