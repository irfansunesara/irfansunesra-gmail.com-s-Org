import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { ICONS } from '../constants';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('If an account with this email exists, a reset link has been sent.');
        } catch (error) {
             setMessage('Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full justify-center items-center p-6 bg-rose-50">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Reset Password</h1>
                    <p className="text-slate-500">We'll email you a link to reset your password.</p>
                </div>
                
                <form onSubmit={handleReset} className="space-y-5">
                    <Input 
                        id="email" 
                        label="Email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        icon={<ICONS.Mail className="w-5 h-5 text-slate-400" />} 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    
                    {message && <p className="text-green-600 text-sm text-center">{message}</p>}

                    <div className="pt-6">
                        <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</Button>
                    </div>
                </form>

                <p className="text-center text-sm text-slate-600 mt-8">
                    Remembered your password?{' '}
                    <button onClick={() => context?.setScreen('Login')} className="font-semibold text-rose-500 hover:underline">
                        Back to Log In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
