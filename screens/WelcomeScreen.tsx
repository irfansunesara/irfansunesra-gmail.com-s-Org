import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';

const WelcomeScreen: React.FC = () => {
    const context = useContext(AppContext);

    return (
        <div className="flex flex-col h-full justify-between items-center p-8 bg-gradient-to-b from-rose-100 to-fuchsia-100">
            <div />
            <div className="text-center flex-grow flex flex-col justify-center items-center -mt-16">
                 <div className="animate-fade-in-down">
                    <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center shadow-inner mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full shadow-lg" />
                    </div>
                 </div>
                <h1 className="text-5xl font-bold text-rose-500 mb-4 tracking-tight animate-fade-in-down" style={{animationDelay: '100ms'}}>Luna</h1>
                <p className="text-lg text-slate-600 max-w-xs animate-fade-in-down" style={{animationDelay: '200ms'}}>
                    Understand your cycle. Support your body.
                </p>
            </div>
            <div className="w-full max-w-sm">
                <div className="space-y-4 mb-8 animate-fade-in-down" style={{animationDelay: '300ms'}}>
                    <Button onClick={() => context?.setScreen('SignUp')}>Create Account</Button>
                    <Button variant="secondary" onClick={() => context?.setScreen('Login')}>Log In</Button>
                </div>
                <footer className="text-center">
                    <div className="text-xs text-slate-500 space-x-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <span>&bull;</span>
                        <a href="#" className="hover:underline">Terms of Use</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default WelcomeScreen;