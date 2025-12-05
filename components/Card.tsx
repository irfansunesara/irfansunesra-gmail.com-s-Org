import React from 'react';

// FIX: Added 'style' prop to allow for inline styling like animation delays.
interface CardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className, style }) => {
    return (
        <div 
            className={`rounded-2xl shadow-sm p-6 transition-colors duration-500 ${className}`} 
            style={{ backgroundColor: 'var(--card-bg)', ...style }}
        >
            {children}
        </div>
    );
};

export default Card;