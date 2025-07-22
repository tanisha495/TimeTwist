import React from 'react';

const DnaIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.01c2.61 2.1 5.79.68 7.38-1.74.83-1.25 1.16-2.83.9-4.56-1.55-.42-3.32.19-4.52 1.4-1.57 1.57-2.03 3.94-1.75 5.9"/>
        <path d="M20 9.99c-2.61-2.1-5.79-.68-7.38 1.74-.83 1.25-1.16 2.83-.9 4.56 1.55.42 3.32-.19 4.52-1.4 1.57-1.57 2.03-3.94 1.75-5.9"/>
        <path d="M6.34 19.66c-2.94-2.94-2.94-7.7 0-10.64"/>
        <path d="M17.66 4.34c2.94 2.94 2.94 7.7 0 10.64"/>
    </svg>
);
export default DnaIcon;