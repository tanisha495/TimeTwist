

import React, { useState, useEffect, useCallback } from 'react';
import { DuelArenaModeProps, View, User, Challenge, AIFeedback } from '../../types';
import { challengesBySubject, SUBJECTS_BY_STREAM } from '../../data/challenges';
import { evaluateExplanation } from '../../../services/geminiService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ScaleIcon from '../icons/ScaleIcon';

const DUEL_TIME_LIMIT = 180; // 3 minutes

type DuelState = 'idle' | 'searching' | 'active' | 'evaluating' | 'results';

const DuelArenaMode: React.FC<DuelArenaModeProps> = ({ user, allUsers, onNavigate, onDuelWon }) => {
    const [duelState, setDuelState] = useState<DuelState>('idle');
    const [opponent, setOpponent] = useState<User | null>(null);
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [timeLeft, setTimeLeft] = useState(DUEL_TIME_LIMIT);
    const [myExplanation, setMyExplanation] = useState('');
    const [opponentExplanation, setOpponentExplanation] = useState(''); // Simulated
    const [myFeedback, setMyFeedback] = useState<AIFeedback | null>(null);
    const [opponentFeedback, setOpponentFeedback] = useState<AIFeedback | null>(null);
    const [iHaveSubmitted, setIHaveSubmitted] = useState(false);
    const [opponentHasSubmitted, setOpponentHasSubmitted] = useState(false);

    // Timer logic
    useEffect(() => {
        if (duelState === 'active' && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            return () => clearTimeout(timer);
        }
        if (timeLeft === 0 && duelState === 'active') {
            handleSubmit();
        }
    }, [duelState, timeLeft]);

    // Opponent simulation
    useEffect(() => {
        if (duelState === 'active' && opponent) {
            // Simulate opponent typing
            const typingTimer = setTimeout(() => {
                setOpponentExplanation("The opponent is weaving a complex explanation, drawing upon ancient formulae and logical principles to deconstruct the paradox...")
            }, 5000 + Math.random() * 5000);
            
            // Simulate opponent submitting
            const submitTimer = setTimeout(() => {
                setOpponentHasSubmitted(true);
            }, 20000 + Math.random() * 100000); // submits between 20s and 2min

            return () => {
                clearTimeout(typingTimer);
                clearTimeout(submitTimer);
            }
        }
    }, [duelState, opponent])

    // Evaluation logic
    useEffect(() => {
        if (iHaveSubmitted && opponentHasSubmitted && duelState === 'active') {
            setDuelState('evaluating');
            
            const evaluate = async () => {
                if (!challenge) return;
                // For simulation, opponent's explanation is a simple pre-canned one
                const opponentFinalExplanation = `Based on the principles of ${challenge.id.split('-')[0]}, this answer can be reached by... (simulated explanation)`;
                
                const [myResult, opponentResult] = await Promise.all([
                    evaluateExplanation(challenge.answer, myExplanation),
                    evaluateExplanation(challenge.answer, opponentFinalExplanation)
                ]);

                setMyFeedback(myResult);
                setOpponentFeedback(opponentResult);
                
                // Determine winner and award points
                if (myResult.score > opponentResult.score) {
                    onDuelWon(150); // Win bonus
                } else if (myResult.score < opponentResult.score) {
                    onDuelWon(25); // Consolation prize
                } else {
                    onDuelWon(75); // Draw prize
                }

                setDuelState('results');
            };
            evaluate();
        }
    }, [iHaveSubmitted, opponentHasSubmitted, duelState, challenge, myExplanation, onDuelWon]);

    const findDuel = () => {
        setDuelState('searching');
        setTimeout(() => {
            const potentialOpponents = allUsers.filter(u => u.id !== user.id);
            const foundOpponent = potentialOpponents[Math.floor(Math.random() * potentialOpponents.length)];
            
            const availableSubjects = user.stream ? SUBJECTS_BY_STREAM[user.stream] : [];
            const streamChallenges = availableSubjects.flatMap(subject => challengesBySubject[subject] || []);
            const challengePool = streamChallenges.length > 0 ? streamChallenges : Object.values(challengesBySubject).flat();
            const randomChallenge = challengePool[Math.floor(Math.random() * challengePool.length)];
            
            setOpponent(foundOpponent);
            setChallenge(randomChallenge);
            setDuelState('active');
        }, 3000); // Simulate search time
    };

    const handleSubmit = () => {
        if(iHaveSubmitted) return;
        setIHaveSubmitted(true);
        if (timeLeft === 0) { // Time ran out, opponent also "submits"
            setOpponentHasSubmitted(true);
        }
    };
    
    const resetDuel = () => {
        setDuelState('idle');
        setOpponent(null);
        setChallenge(null);
        setTimeLeft(DUEL_TIME_LIMIT);
        setMyExplanation('');
        setOpponentExplanation('');
        setMyFeedback(null);
        setOpponentFeedback(null);
        setIHaveSubmitted(false);
        setOpponentHasSubmitted(false);
    };

    const renderContent = () => {
        switch (duelState) {
            case 'idle':
                return (
                    <Card style={{padding: '2rem', textAlign: 'center'}}>
                        <ScaleIcon style={{width: '6rem', height: '6rem', margin: '0 auto 1.5rem', color: 'var(--rune-gold)'}}/>
                        <h2 style={{fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem'}}>Welcome to the Duel of Wits</h2>
                        <p style={{color: 'rgba(229, 222, 247, 0.9)', marginBottom: '1.5rem', maxWidth: '42rem', margin: '0 auto 1.5rem'}}>
                            Challenge a fellow wizard to a real-time battle of logic. The first to provide a superior explanation to the Oracle wins glory and Wizard Points.
                        </p>
                        <Button onClick={findDuel} variant="primary">Find a Worthy Opponent</Button>
                    </Card>
                );
            case 'searching':
                return (
                    <Card style={{padding: '2rem', textAlign: 'center'}}>
                        <h2 className="animate-pulse" style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--spell-blue)'}}>Searching the realms for an opponent...</h2>
                        <p style={{marginTop: '1rem', color: 'rgba(229, 222, 247, 0.8)'}}>A challenger will appear shortly.</p>
                    </Card>
                );
            case 'active':
                if (!challenge || !opponent) return null;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                const timerColor = timeLeft < 30 ? 'var(--glow-pink)' : 'var(--rune-gold)';
                return (
                    <div>
                        <Card className="challenge-card" style={{boxShadow: 'var(--glow-pink-shadow)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div><img src={user.avatar} style={{width: '4rem', height: '4rem', borderRadius: '50%', border: '2px solid var(--spell-blue)'}} alt="You"/></div>
                            <div className="font-pixel" style={{fontSize: '3rem', color: timerColor, transition: 'color 0.5s'}}>{minutes}:{seconds.toString().padStart(2, '0')}</div>
                             <div><img src={opponent.avatar} style={{width: '4rem', height: '4rem', borderRadius: '50%', border: '2px solid var(--glow-pink)'}} alt={opponent.username}/></div>
                        </Card>
                        <Card className="challenge-card" style={{marginTop: '1.5rem'}}>
                            <h1 className="answer font-pixel">{challenge.answer}</h1>
                            <p className="description">{challenge.description}</p>
                        </Card>
                        <Card className="explanation-card" style={{marginTop: '1.5rem'}}>
                            <h2>{iHaveSubmitted ? "Your spell has been cast. Awaiting your opponent..." : "Weave Your Explanation"}</h2>
                            <textarea
                                value={myExplanation}
                                onChange={(e) => setMyExplanation(e.target.value)}
                                placeholder="The duel is on! Explain your logic quickly and clearly..."
                                className="explanation-textarea font-sans"
                                disabled={iHaveSubmitted}
                            />
                            <div className="actions" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <p style={{color: opponentHasSubmitted ? 'var(--mana-green)' : 'rgba(216, 180, 254, 0.7)'}}>
                                    {opponentHasSubmitted ? `${opponent.username} has submitted!` : `${opponent.username} is weaving their spell...`}
                                </p>
                                <Button onClick={handleSubmit} disabled={iHaveSubmitted || !myExplanation.trim()}>
                                    {iHaveSubmitted ? 'Submitted!' : 'Cast Spell (Submit)'}
                                </Button>
                            </div>
                        </Card>
                    </div>
                );
            case 'evaluating':
                return (
                    <Card style={{padding: '2rem', textAlign: 'center'}}>
                        <h2 className="animate-pulse" style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--spell-blue)'}}>The Oracle deliberates...</h2>
                        <p style={{marginTop: '1rem', color: 'rgba(229, 222, 247, 0.8)'}}>Both spells have been cast. The final judgment is imminent.</p>
                    </Card>
                );
            case 'results':
                if (!myFeedback || !opponentFeedback || !opponent) return null;
                const myScore = myFeedback.score;
                const opponentScore = opponentFeedback.score;
                const resultText = myScore > opponentScore ? "Victory is Yours!" : myScore < opponentScore ? "A Valiant Effort" : "A Fateful Draw";
                const resultColor = myScore > opponentScore ? 'var(--mana-green)' : myScore < opponentScore ? 'var(--glow-pink)' : 'var(--rune-gold)';
                return (
                    <Card style={{padding: '2rem', textAlign: 'center'}}>
                        <h2 className="font-pixel" style={{fontSize: '2.5rem', color: resultColor, marginBottom: '2rem'}}>{resultText}</h2>
                        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '2rem'}}>
                            {/* Your Result */}
                            <div style={{textAlign: 'center', borderRight: '1px solid rgba(192, 132, 252, 0.3)', paddingRight: '2rem'}}>
                                <img src={user.avatar} alt="You" style={{width: '5rem', height: '5rem', borderRadius: '50%', margin: '0 auto .5rem', border: '3px solid var(--spell-blue)'}} />
                                <h3 style={{fontSize: '1.25rem'}}>{user.username}</h3>
                                <p className="font-pixel" style={{fontSize: '3rem', color: 'var(--spell-blue)'}}>{myScore} <span style={{fontSize: '1.5rem'}}>/10</span></p>
                            </div>
                            {/* Opponent's Result */}
                            <div style={{textAlign: 'center', paddingLeft: '2rem'}}>
                                <img src={opponent.avatar} alt={opponent.username} style={{width: '5rem', height: '5rem', borderRadius: '50%', margin: '0 auto .5rem', border: '3px solid var(--glow-pink)'}} />
                                <h3 style={{fontSize: '1.25rem'}}>{opponent.username}</h3>
                                <p className="font-pixel" style={{fontSize: '3rem', color: 'var(--glow-pink)'}}>{opponentScore} <span style={{fontSize: '1.5rem'}}>/10</span></p>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem'}}>
                            <Button onClick={resetDuel} variant="secondary">New Duel</Button>
                            <Button onClick={() => onNavigate(View.DASHBOARD)} variant="primary">Return to Dashboard</Button>
                        </div>
                    </Card>
                );
        }
    };

    return (
        <div>
            <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8" disabled={duelState === 'active'}>
                &larr; Back to Dashboard
            </Button>
            <div className="text-center mb-10">
                 <h1 className="font-pixel" style={{fontSize: '3rem', color: 'var(--rune-gold)'}}>Duel of Wits</h1>
            </div>
            {renderContent()}
        </div>
    );
};

export default DuelArenaMode;