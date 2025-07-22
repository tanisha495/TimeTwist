import React from 'react';

const SPARKLE_COUNT = 50;

const SparkleBackground: React.FC = () => {
    const sparkles = Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
        const style = {
            position: 'absolute' as 'absolute',
            width: '2px',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `sparkle-background ${2 + Math.random() * 8}s linear ${Math.random() * 5}s infinite`,
        };
        return (
            <div
                key={i}
                style={style}
            ></div>
        );
    });

    const containerStyle: React.CSSProperties = {
        position: 'fixed',
        inset: '0px',
        zIndex: -10
    };

    return <div style={containerStyle}>{sparkles}</div>;
};

export default SparkleBackground;