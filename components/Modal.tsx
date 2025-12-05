import React from 'react';
import Card from './Card';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
            style={{ animation: 'fade-in 0.3s ease-out' }}
            onClick={onClose}
        >
            <div 
                className="w-full max-w-md"
                style={{ animation: 'fade-in-up 0.4s ease-out' }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <Card className="relative">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-100 transition-colors">
                        <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <h2 className="text-2xl font-bold mb-4 pr-8">{title}</h2>
                    <div>{children}</div>
                </Card>
            </div>
        </div>
    );
};

// Keyframe animations are already present in index.html

export default Modal;
