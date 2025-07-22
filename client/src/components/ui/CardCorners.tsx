import React from 'react';

const CornerSvg: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 3C30 1.34315 28.6569 0 27 0H0V3H27C28.6569 3 30 1.65685 30 0V3Z" fill="url(#paint0_linear_card_corner)" />
        <path d="M3 30C1.34315 30 0 28.6569 0 27V0H3V27C3 28.3431 1.65685 30 0 30H3Z" fill="url(#paint1_linear_card_corner)" />
        <defs>
            <linearGradient id="paint0_linear_card_corner" x1="0" y1="1.5" x2="30" y2="1.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffca3a" stopOpacity="0" />
                <stop offset="1" stopColor="#ffca3a" />
            </linearGradient>
            <linearGradient id="paint1_linear_card_corner" x1="1.5" y1="0" x2="1.5" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffca3a" stopOpacity="0" />
                <stop offset="1" stopColor="#ffca3a" />
            </linearGradient>
        </defs>
    </svg>
);


const CardCorners: React.FC<{ position?: 'all' | 'top' | 'bottom' }> = ({ position = 'all' }) => (
    <>
        {(position === 'all' || position === 'top') && (
            <>
                <div className="absolute top-1.5 left-1.5 pointer-events-none"><CornerSvg /></div>
                <div className="absolute top-1.5 right-1.5 pointer-events-none transform scale-x-[-1]"><CornerSvg /></div>
            </>
        )}
        {(position === 'all' || position === 'bottom') && (
            <>
                <div className="absolute bottom-1.5 left-1.5 pointer-events-none transform scale-y-[-1]"><CornerSvg /></div>
                <div className="absolute bottom-1.5 right-1.5 pointer-events-none transform scale-[-1]"><CornerSvg /></div>
            </>
        )}
    </>
);
export default CardCorners;