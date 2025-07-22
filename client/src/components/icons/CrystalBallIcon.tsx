
import React from 'react';

const CrystalBallIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 12a5 5 0 0 0-5 5" />
        <path d="M12 12a5 5 0 0 1 5 5" />
        <path d="M12 12a5 5 0 0 0 0-10" />
    </svg>
);
export default CrystalBallIcon;
