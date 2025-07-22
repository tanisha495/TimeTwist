
import React, { useState } from 'react';
import { ProfilePageProps, View } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import RerollIcon from '../icons/RerollIcon';

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onNavigate, onUpdateUser }) => {
    const [newUsername, setNewUsername] = useState(user.username);
    const [avatarSeed, setAvatarSeed] = useState(user.avatar.split('seed=')[1] || user.username);
    
    const newAvatarUrl = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${avatarSeed}`;

    const handleRerollAvatar = () => {
        setAvatarSeed(Math.random().toString(36).substring(7));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalUsername = newUsername.trim();
        if (finalUsername) {
            onUpdateUser(finalUsername, newAvatarUrl);
        }
    };
    
    const hasChanges = newUsername.trim() !== user.username || newAvatarUrl !== user.avatar;

    return (
        <div>
            <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8">
                &larr; Back to Dashboard
            </Button>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="text-center mb-10">
                    <h1 className="font-pixel" style={{fontSize: '3rem', color: 'var(--rune-gold)'}}>Wizard's Sanctum</h1>
                    <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem'}}>Reforge your legend.</p>
                </div>

                <Card style={{width: '100%', maxWidth: '32rem', padding: '2rem'}}>
                    <form onSubmit={handleSubmit}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem'}}>
                            <img src={newAvatarUrl} alt="New Avatar Preview" style={{width: '8rem', height: '8rem', borderRadius: '9999px', border: '4px solid var(--rune-gold)', marginBottom: '1rem'}}/>
                            <Button type="button" onClick={handleRerollAvatar} variant="secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                               <div style={{ width: '1.25rem', height: '1.25rem' }}>
                                 <RerollIcon />
                               </div>
                               Reroll Avatar
                            </Button>

                        </div>

                        <div style={{marginBottom: '1.5rem'}}>
                            <label htmlFor="username" className="form-label" style={{fontSize: '1.125rem'}}>
                                Change your Wizard's Name
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="A name for the ages..."
                                className="form-input"
                                style={{fontSize: '1.125rem'}}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={!newUsername.trim() || !hasChanges}>
                            Save Changes
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};
export default ProfilePage;