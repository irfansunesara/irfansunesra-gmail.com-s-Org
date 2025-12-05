import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { auth, db } from '../../firebase';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

const DataControlScreen: React.FC = () => {
    const context = useContext(AppContext);
    
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            auth.signOut();
        }
    }
    
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account and all data? This action cannot be undone.')) {
            const user = auth.currentUser;
            if (user) {
                try {
                    // First, delete Firestore data
                    const userDocRef = doc(db, 'users', user.uid);
                    await deleteDoc(userDocRef);
                    
                    // Then, delete the user from Auth
                    await deleteUser(user);
                    
                    alert('Account deleted successfully.');
                    // App will redirect automatically via onAuthStateChanged
                } catch (error: any) {
                    console.error("Error deleting account:", error);
                    alert("Failed to delete account. Please log out and log back in to try again.");
                }
            }
        }
    }

    return (
        <div>
            <Header title="Data Control" backScreen="Profile" />
            <div className="p-4 space-y-4">
                <Card>
                    <button className="w-full text-left py-3 font-medium text-slate-700 hover:bg-rose-50 rounded-lg px-2">Export My Data</button>
                    <div className="border-t border-rose-100 my-1" />
                    <button onClick={handleLogout} className="w-full text-left py-3 font-medium text-slate-700 hover:bg-rose-50 rounded-lg px-2">Log Out</button>
                </Card>
                <Card>
                    <button onClick={handleDelete} className="w-full text-left py-3 font-medium text-red-600 hover:bg-red-50 rounded-lg px-2">Delete Account & All Data</button>
                </Card>
            </div>
        </div>
    );
};

export default DataControlScreen;
