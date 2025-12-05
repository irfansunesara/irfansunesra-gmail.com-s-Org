import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
    const baseClasses = 'w-full text-center py-3 px-4 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 active:scale-[0.98]';
    
    const variantClasses = {
        primary: 'bg-rose-500 text-white hover:bg-rose-600 shadow-md hover:shadow-lg',
        secondary: 'bg-rose-100 text-rose-600 hover:bg-rose-200',
        ghost: 'bg-transparent text-rose-500 hover:bg-rose-100'
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;