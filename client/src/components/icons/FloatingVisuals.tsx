import React from 'react';
import CrystalBallIcon from '../icons/CrystalBallIcon';

const VISUAL_COUNT = 6;

const FloatingVisuals: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {Array.from({ length: VISUAL_COUNT }).map((_, i) => {
                const size = 3 + Math.random() * 5; // size in rem
                const style = {
                    left: `${5 + Math.random() * 90}%`,
                    top: `${5 + Math.random() * 90}%`,
                    width: `${size}rem`,
                    height: `${size}rem`,
                    animation: `float ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite alternate`,
                    opacity: 0.1 + Math.random() * 0.2
                };
                return (
                    <div key={i} className="absolute" style={style}>
                       <CrystalBallIcon className="w-full h-full text-spell-blue" />
                    </div>
                );
            })}
        </div>
    );
};

export default FloatingVisuals;