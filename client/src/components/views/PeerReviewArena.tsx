

import React from 'react';
import { PeerReviewArenaProps, View } from '../../types';
import { SUBJECTS_BY_STREAM, subjectByChallengeId } from '../../data/challenges';
import Button from '../ui/Button';
import Card from '../ui/Card';

const PeerReviewArena: React.FC<PeerReviewArenaProps> = ({ user, onNavigate, solutions }) => {
    
    const availableSubjects = user.stream ? SUBJECTS_BY_STREAM[user.stream] : [];
    const filteredSolutions = solutions.filter(solution => {
        const subject = subjectByChallengeId[solution.challengeId];
        return subject && availableSubjects.includes(subject);
    });

    return (
        <div>
            <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8">
                &larr; Back to Dashboard
            </Button>

            <div className="text-center mb-10">
                <h1 className="font-pixel" style={{fontSize: '3rem', color: 'var(--rune-gold)'}}>Peer-Review Arena</h1>
                <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem'}}>Study the grimoires of other powerful wizards within your stream.</p>
            </div>

            <div className="solution-list">
                {filteredSolutions.length > 0 ? (
                    filteredSolutions.map(solution => (
                        <Card key={solution.id} className="solution-card animate-fade-in">
                            <div className="solution-card-header">
                                <div className="solution-author">
                                    <p className="from-text">From the grimoire of:</p>
                                    <div className="author-info">
                                        <img src={solution.authorAvatar} alt={solution.author} />
                                        <span className="author-name">{solution.author}</span>
                                    </div>
                                </div>
                                <div className="solution-rating">
                                    <div className="rating-value">{solution.rating.toFixed(1)} ★</div>
                                    <div className="comments-count">{solution.comments} Comments</div>
                                </div>
                            </div>

                            <hr className="solution-divider" />

                            <div className="solution-content">
                                <p className="label">Paradox Solved:</p>
                                <p className="answer">"{solution.challengeAnswer}"</p>
                                
                                <p className="label" style={{marginTop: '1rem'}}>Explanation Weaved:</p>
                                <p className="explanation font-sans">{solution.explanation}</p>
                            </div>
                            
                            <div className="solution-actions">
                                <Button onClick={() => alert('Rating functionality coming soon!')} variant="secondary">Rate This Logic</Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card style={{padding: '2rem', textAlign: 'center'}}>
                        <h2 style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--rune-gold)'}}>The Arena is Silent</h2>
                        <p style={{marginTop: '1rem', color: 'rgba(229, 222, 247, 0.9)', lineHeight: 1.75}}>
                            No solutions for your stream have been submitted for review yet. <br/>
                            Complete a challenge in Time Warp Mode and share your logic to be judged by your peers!
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default PeerReviewArena;