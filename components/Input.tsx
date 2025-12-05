import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, id, className, icon, ...props }) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-2">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    className={`w-full py-3 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors duration-200 ${icon ? 'pl-10 pr-4' : 'px-4'} ${className}`}
                    {...props}
                />
            </div>
        </div>
    );
};

export default Input;