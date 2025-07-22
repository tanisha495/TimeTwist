
import React from 'react';

const HourglassIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 22h14"/>
        <path d="M5 2h14"/>
        <path d="M17 2v5l-4 4 4 4v5"/>
        <path d="M7 2v5l4 4-4 4v5"/>
    </svg>
);
export default HourglassIcon;