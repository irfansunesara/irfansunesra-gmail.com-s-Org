import React, { useContext, useState } from 'react';
import { AppContext, defaultUserData } from '../context/AppContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { ICONS } from '../constants';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUpScreen: React.FC = () => {
    const context = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Update Firebase Auth profile
            await updateProfile(user, { displayName: name });
            
            // Create user document in Firestore
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, defaultUserData);

            // The onAuthStateChanged listener in App.tsx will handle the rest.
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full justify-center items-center p-6 bg-rose-50">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Create your account</h1>
                    <p className="text-slate-500">Let's get started on your wellness journey.</p>
                </div>
                
                <form onSubmit={handleSignUp} className="space-y-5">
                    <Input id="name" label="Name" type="text" placeholder="Jane Doe" required icon={<ICONS.Profile className="w-5 h-5 text-slate-400" />} value={name} onChange={e => setName(e.target.value)} />
                    <Input id="email" label="Email" type="email" placeholder="you@example.com" required icon={<ICONS.Mail className="w-5 h-5 text-slate-400" />} value={email} onChange={e => setEmail(e.target.value)} />
                    <Input id="password" label="Password" type="password" required icon={<ICONS.Lock className="w-5 h-5 text-slate-400" />} value={password} onChange={e => setPassword(e.target.value)} />
                    <Input id="confirm-password" label="Confirm Password" type="password" required icon={<ICONS.Lock className="w-5 h-5 text-slate-400" />} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="flex items-center space-x-3 pt-2">
                        <input type="checkbox" id="terms" required className="h-5 w-5 text-rose-500 border-rose-300 rounded focus:ring-rose-400" />
                        <label htmlFor="terms" className="text-sm text-slate-600">
                            I agree to the <a href="#" className="font-semibold text-rose-500">Terms & Privacy Policy</a>
                        </label>
                    </div>

                    <div className="pt-6">
                        <Button type="submit" disabled={loading}>{loading ? 'Creating Account...' : 'Create Account'}</Button>
                    </div>
                </form>

                <p className="text-center text-sm text-slate-600 mt-8">
                    Already have an account?{' '}
                    <button onClick={() => context?.setScreen('Login')} className="font-semibold text-rose-500 hover:underline">
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignUpScreen;
