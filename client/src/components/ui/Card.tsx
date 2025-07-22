

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, style }) => {
    const baseClasses = "card";
    const clickableClass = onClick ? "card-clickable" : "";

    return (
        <div className={`${baseClasses} ${clickableClass} ${className}`} onClick={onClick} style={style}>
            {children}
        </div>
    );
};

export default Card;