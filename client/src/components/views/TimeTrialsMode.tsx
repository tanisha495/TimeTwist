
import React, { useState, useEffect, useCallback } from 'react';
import { View, User, Challenge, Subject } from '../../types';
import { challengesBySubject, SUBJECTS_BY_STREAM } from '../../data/challenges';
import Button from '../ui/Button';
import Card from '../ui/Card';
import SpellBookIcon from '../icons/SpellBookIcon';

interface TimeTrialsModeProps {
    user: User;
    onNavigate: (view: View) => void;
}

const TIME_LIMIT = 120; // 2 minutes

const TimeTrialsMode: React.FC<TimeTrialsModeProps> = ({ user, onNavigate }) => {
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [isActive, setIsActive] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    const availableSubjects = user.stream ? SUBJECTS_BY_STREAM[user.stream] : [];

    useEffect(() => {
        let interval: ReturnType<typeof setTimeout> | null = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(t => t - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            setIsTimeUp(true);
            handleSubmit(true); // Auto-submit when time is up
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft]);
    
    const handleStart = useCallback((subject: Subject) => {
        const subjectChallenges = challengesBySubject[subject];
        if (!subjectChallenges || subjectChallenges.length === 0) {
            console.error(`No challenges found for subject: ${subject}`);
            // Optionally, show an error to the user
            return;
        }
        const randomChallenge = subjectChallenges[Math.floor(Math.random() * subjectChallenges.length)];
        
        setCurrentChallenge(randomChallenge);
        setSelectedSubject(subject);
        setTimeLeft(TIME_LIMIT);
        setExplanation('');
        setIsTimeUp(false);
        setScore(null);
        setIsActive(true);
    }, []);

    const handleSubmit = (autoSubmitted = false) => {
        setIsActive(false);
        const timeBonus = autoSubmitted ? 0 : timeLeft * 10;
        const lengthBonus = explanation.length * 2;
        setScore(timeBonus + lengthBonus);
    };

    const resetTrial = () => {
        setIsActive(false);
        setScore(null);
        setSelectedSubject(null);
        setCurrentChallenge(null);
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerColor = timeLeft < 30 ? 'var(--glow-pink)' : 'var(--rune-gold)';

    // Subject Selection View
    if (!selectedSubject) {
        return (
            <div>
                <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8">
                    &larr; Back to Dashboard
                </Button>
                <div className="text-center mb-10">
                    <h1 className="font-pixel" style={{fontSize: '2.25rem', color: 'var(--rune-gold)'}}>Select a Trial</h1>
                    <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem'}}>Choose a subject from your stream to test your speed and wit.</p>
                </div>
                <div className="selection-grid">
                    {availableSubjects.map((subject: Subject) => (
                         <Card key={subject} className="card-clickable" style={{padding: '2rem', textAlign: 'center'}} onClick={() => handleStart(subject)}>
                            <SpellBookIcon style={{width: '4rem', height: '4rem', margin: '0 auto 1rem', color: 'var(--spell-blue)'}}/>
                            <h3 className="font-pixel" style={{fontSize: '1.5rem', color: 'var(--rune-gold)', marginBottom: '0.5rem'}}>{subject} Trial</h3>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    // Trial Finished View
    if (isTimeUp || score !== null) {
        return (
            <div>
                 <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8">
                    &larr; Back to Dashboard
                </Button>
                <Card style={{padding: '2rem', textAlign: 'center', boxShadow: 'var(--glow-gold-shadow)'}}>
                     <h2 style={{fontSize: '1.875rem', fontWeight: 700, color: 'var(--rune-gold)', marginBottom: '1rem'}}>{isTimeUp ? "Time's Up!" : "Trial Complete!"}</h2>
                     <p style={{fontSize: '1.25rem', color: 'white', marginBottom: '0.5rem'}}>You scored:</p>
                     <p className="font-pixel" style={{fontSize: '3.75rem', color: 'var(--spell-blue)'}}>{score ?? 0}</p>
                     <p style={{color: 'white', marginTop: '1rem'}}>Well done, apprentice. Quick thinking is a sign of a true master.</p>
                     <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem'}}>
                        <Button onClick={() => handleStart(selectedSubject)} variant="primary">Try Again</Button>
                        <Button onClick={resetTrial} variant="secondary">Change Subject</Button>
                     </div>
                </Card>
            </div>
        )
    }

    // Active Trial View
    return (
        <div>
            <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8">
                &larr; Back to Dashboard
            </Button>
            
            {isActive && currentChallenge && (
                <div>
                    <Card className="challenge-card" style={{boxShadow: 'var(--glow-pink-shadow)'}}>
                        <p className="font-pixel" style={{fontSize: '3.75rem', color: timerColor, transition: 'color 0.5s'}}>
                            {minutes}:{seconds.toString().padStart(2, '0')}
                        </p>
                        <p style={{fontSize: '1.125rem', color: 'var(--spell-blue)', marginTop: '1rem'}}>Paradox: <span style={{fontWeight: '700', color: 'white'}}>{currentChallenge.answer}</span></p>
                    </Card>

                    <Card className="explanation-card">
                        <h2>Quickly, Weave Your Logic!</h2>
                        <textarea
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                            placeholder="The clock is ticking..."
                            className="explanation-textarea font-sans"
                            style={{height: '12rem'}}
                        />
                        <div className="actions">
                            <Button onClick={() => handleSubmit(false)} disabled={!explanation.trim()}>
                                Submit Before Time Runs Out
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default TimeTrialsMode;