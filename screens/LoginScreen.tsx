import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { ICONS } from '../constants';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // The onAuthStateChanged listener in App.tsx will handle navigation.
        } catch (error: any) {
            setError("Failed to log in. Please check your email and password.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full justify-center items-center p-6 bg-rose-50">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back!</h1>
                    <p className="text-slate-500">Log in to continue your journey.</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-5">
                    <Input id="email" label="Email" type="email" placeholder="you@example.com" required icon={<ICONS.Mail className="w-5 h-5 text-slate-400" />} value={email} onChange={e => setEmail(e.target.value)} />
                    <Input id="password" label="Password" type="password" required icon={<ICONS.Lock className="w-5 h-5 text-slate-400" />} value={password} onChange={e => setPassword(e.target.value)} />
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="text-right">
                        <button onClick={() => context?.setScreen('ForgotPassword')} type="button" className="text-sm font-semibold text-rose-500 hover:underline">
                            Forgot Password?
                        </button>
                    </div>
                    
                    <div className="pt-6">
                        <Button type="submit" disabled={loading}>{loading ? 'Logging In...' : 'Log In'}</Button>
                    </div>
                </form>

                <p className="text-center text-sm text-slate-500 mt-8">
                    Your information is safe with us 💗
                </p>

                <p className="text-center text-sm text-slate-600 mt-8">
                    Don't have an account?{' '}
                    <button onClick={() => context?.setScreen('SignUp')} className="font-semibold text-rose-500 hover:underline">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
