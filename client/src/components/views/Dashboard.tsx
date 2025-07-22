import React from 'react';
import { DashboardProps, View } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import SpellBookIcon from '../icons/SpellBookIcon';
import HourglassIcon from '../icons/HourglassIcon';
import UsersIcon from '../ui/UsersIcon';
import EditIcon from '../icons/EditIcon';
import CrystalBallIcon from '../icons/CrystalBallIcon';
import CommunityIcon from '../icons/CommunityIcon';
import LibraryIcon from '../icons/LibraryIcon';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import ScaleIcon from '../icons/ScaleIcon';

const Dashboard: React.FC<DashboardProps> = ({ user, allUsers, onNavigate, onLogout, hasFeedbackHistory, theme, onToggleTheme }) => {
    const wizardLevelProgress = (user.wizardPoints % 1000) / 10;
    const topWizards = allUsers.slice(0, 3);

    return (
        <div>
            <header className="dashboard-header">
                <div className="dashboard-user-info">
                    <img src={user.avatar} alt="User Avatar" />
                    <div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <h1>{user.username}</h1>
                            <button onClick={() => onNavigate(View.PROFILE)} className="edit-btn">
                                <EditIcon />
                            </button>
                        </div>
                        <p className="level-text">Level {user.level} Sorcerer</p>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <Button 
                        onClick={onToggleTheme} 
                        variant="secondary" 
                        className="btn-icon"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <SunIcon style={{width: '1.5rem', height: '1.5rem'}} /> : <MoonIcon style={{width: '1.5rem', height: '1.5rem'}} />}
                    </Button>
                    <Button onClick={onLogout} variant="secondary">Logout</Button>
                </div>
            </header>

            <div className="dashboard-grid">
                <Card className="dashboard-stats-card">
                    <h2 className="text-xl font-bold text-rune-gold mb-4" style={{color: 'var(--rune-gold)', marginBottom:'1rem'}}>Wizarding Stats</h2>
                    <div className="space-y-4">
                        <div className="stat-item">
                            <p>Wizard Points (WP): <span>{user.wizardPoints}</span></p>
                        </div>
                        <div className="stat-item">
                            <p>Progress to Level {user.level + 1}</p>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${wizardLevelProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </Card>
                
                <Card className="dashboard-leaderboard-card">
                     <h2 className="text-xl font-bold text-rune-gold mb-4" style={{color: 'var(--rune-gold)', marginBottom:'1rem'}}>Hall of Fame</h2>
                     <div>
                        {topWizards.map((wizard, index) => (
                             <div key={wizard.id} className="leaderboard-item">
                                 <div className="user-details">
                                     <span className="rank">{index + 1}.</span>
                                     <img src={wizard.avatar} alt={wizard.username}/>
                                     <span className="username">{wizard.username}</span>
                                 </div>
                                 <div className="user-stats">
                                     <p className="points">{wizard.wizardPoints} WP</p>
                                     <p className="level">Level {wizard.level}</p>
                                 </div>
                             </div>
                        ))}
                     </div>
                     <div style={{textAlign: 'center', marginTop: '1rem'}}>
                        <Button onClick={() => onNavigate(View.LEADERBOARD)} variant="secondary">View Full Leaderboard</Button>
                     </div>
                </Card>
            </div>


            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold font-pixel" style={{color: 'var(--rune-gold)'}}>Choose Your Path</h2>
                <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem'}}>The threads of fate await your command.</p>
            </div>
            
            <div className="dashboard-modes-grid">
                <ModeCard
                    icon={<SpellBookIcon className="icon" style={{color: 'var(--spell-blue)'}}/>}
                    title="Time Warp Mode"
                    description="Unravel the past. Explain how the conclusion came to be."
                    onClick={() => onNavigate(View.TIME_WARP)}
                />
                 <ModeCard
                    icon={<ScaleIcon className="icon" style={{color: 'var(--rune-gold)'}}/>}
                    title="Duel of Wits"
                    description="Challenge a fellow wizard to a real-time battle of logic."
                    onClick={() => onNavigate(View.DUEL_ARENA)}
                />
                <ModeCard
                    icon={<UsersIcon className="icon" style={{color: 'var(--glow-pink)'}}/>}
                    title="Peer-Review Arena"
                    description="Study the logic of fellow wizards and rate their solutions."
                    onClick={() => onNavigate(View.PEER_REVIEW)}
                />
                <ModeCard
                    icon={<HourglassIcon className="icon" style={{color: 'var(--rune-gold)'}}/>}
                    title="Time Trials"
                    description="Race against the clock to forge your explanation under pressure."
                    onClick={() => onNavigate(View.TIME_TRIALS)}
                />
                <ModeCard
                    icon={<CrystalBallIcon className="icon" style={{color: 'var(--mana-green)'}}/>}
                    title="Magic Analysis"
                    description="Let the Oracle analyze your magic and reveal your patterns."
                    onClick={() => onNavigate(View.MAGIC_ANALYSIS)}
                    disabled={!hasFeedbackHistory}
                />
                <ModeCard
                    icon={<CommunityIcon className="icon" style={{color: 'rgb(216 180 254)'}}/>}
                    title="Community Hall"
                    description="Consult with peers, discuss paradoxes, and form study groups."
                    onClick={() => onNavigate(View.COMMUNITY)}
                />
                <ModeCard
                    icon={<LibraryIcon className="icon" style={{color: 'rgb(252 211 77)'}}/>}
                    title="Wizard's Library"
                    description="Consult ancient texts, formulas, and guides for your studies."
                    onClick={() => onNavigate(View.RESOURCES)}
                />
            </div>
        </div>
    );
};

interface ModeCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    disabled?: boolean;
}

const ModeCard: React.FC<ModeCardProps> = ({ icon, title, description, onClick, disabled = false }) => (
    <Card 
        className={`mode-card ${disabled ? 'disabled' : 'card-hover-glow-purple'}`}
        onClick={!disabled ? onClick : undefined}
    >
        {icon}
        <h3 className="font-pixel">{title}</h3>
        <p>{description}</p>
        {disabled && <p className="unlock-text">(Complete Time Warp challenges to unlock)</p>}
    </Card>
);

export default Dashboard