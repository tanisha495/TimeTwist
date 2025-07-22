
import React, { useState, useCallback } from 'react';
import { Challenge, Subject, TimeWarpModeProps, View, Topic } from '../../types';
import { AIFeedback, evaluateExplanation } from '../../../services/geminiService';
import { SUBJECT_TOPICS, SUBJECTS_BY_STREAM } from '../../data/challenges';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import SpellBookIcon from '../icons/SpellBookIcon';

const TimeWarpMode: React.FC<TimeWarpModeProps> = ({ user, onNavigate, onFeedbackReceived, onSolutionSubmit }) => {
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<AIFeedback | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Get subjects based on the user's stream
    const availableSubjects = user.stream ? SUBJECTS_BY_STREAM[user.stream] : [];

    const handleSelectSubject = (subject: Subject) => {
        setSelectedSubject(subject);
        setSelectedTopic(null);
        setCurrentChallenge(null);
    };

    const handleSelectTopic = (topic: Topic) => {
        const nextChallenge = topic.challenges.find(c => !user.completedChallengeIds.includes(c.id));
        if (nextChallenge) {
            setSelectedTopic(topic);
            setCurrentChallenge(nextChallenge);
            setExplanation('');
            setFeedback(null);
        } else {
            console.log("Topic mastered! No new challenges to select.");
        }
    };

    const resetToSubjectSelection = () => {
        setSelectedSubject(null);
        setSelectedTopic(null);
        setCurrentChallenge(null);
    };

    const resetToTopicSelection = () => {
        setSelectedTopic(null);
        setCurrentChallenge(null);
    };


    const handleSubmit = async () => {
        if (!currentChallenge || !explanation.trim()) return;
        setIsLoading(true);
        const result = await evaluateExplanation(currentChallenge.answer, explanation);
        setFeedback(result);
        setIsLoading(false);
        setIsModalOpen(true);
    };
    
    const handleContinue = useCallback(() => {
        if (feedback && currentChallenge) {
            onFeedbackReceived(feedback.score * 10, feedback, currentChallenge.id);
        }
        setIsModalOpen(false);
        resetToTopicSelection();
    }, [feedback, onFeedbackReceived, currentChallenge]);

    const handleSubmitToArena = useCallback(() => {
        if (!currentChallenge || !user || !explanation) return;
        onSolutionSubmit({
            author: user.username,
            authorAvatar: user.avatar,
            challengeId: currentChallenge.id,
            challengeAnswer: currentChallenge.answer,
            explanation: explanation,
        });
        handleContinue();
    }, [currentChallenge, user, explanation, onSolutionSubmit, handleContinue]);

    if (!selectedSubject) {
        return (
            <div>
                 <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8">
                    &larr; Back to Dashboard
                </Button>
                <div className="text-center mb-10">
                    <h1 className="font-pixel" style={{fontSize: '2.25rem', color: 'var(--rune-gold)'}}>Select a Grimoire</h1>
                    <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem'}}>Choose a subject from your stream to test your arcane knowledge.</p>
                </div>
                <div className="selection-grid">
                    {availableSubjects.map((subject: Subject) => (
                         <Card key={subject} className="card-clickable" style={{padding: '2rem', textAlign: 'center'}} onClick={() => handleSelectSubject(subject)}>
                            <SpellBookIcon style={{width: '4rem', height: '4rem', margin: '0 auto 1rem', color: 'var(--spell-blue)'}}/>
                            <h3 className="font-pixel" style={{fontSize: '1.5rem', color: 'var(--rune-gold)', marginBottom: '0.5rem'}}>{subject}</h3>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (!selectedTopic) {
        const topics = SUBJECT_TOPICS[selectedSubject];
        return (
            <div>
                 <Button onClick={resetToSubjectSelection} className="mb-8">
                    &larr; Back to Subject Selection
                </Button>
                <div className="text-center mb-10">
                    <h1 className="font-pixel" style={{fontSize: '2.25rem', color: 'var(--rune-gold)'}}>Select a Chapter</h1>
                    <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem'}}>Choose a topic from the {selectedSubject} grimoire.</p>
                </div>
                <div className="topic-list">
                    {topics.map((topic: Topic) => {
                        const completedCount = topic.challenges.filter(c => user.completedChallengeIds.includes(c.id)).length;
                        const totalCount = topic.challenges.length;
                        const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
                        const isMastered = completedCount === totalCount;
                        return (
                            <Card 
                                key={topic.id} 
                                className={`topic-card ${isMastered ? 'mastered' : 'card-clickable card-hover-glow-purple'}`} 
                                onClick={!isMastered ? () => handleSelectTopic(topic) : undefined}
                            >
                                <div className="topic-header">
                                    <div>
                                        <h3 className={`topic-title ${isMastered ? 'mastered' : ''}`}>{topic.name} {isMastered && '★'}</h3>
                                        <p className="topic-description">{topic.description}</p>
                                    </div>
                                    <div className="topic-progress-text">
                                        <p className="counts">{completedCount} / {totalCount}</p>
                                        <p className="label">Completed</p>
                                    </div>
                                </div>
                                <div className="topic-progress-bar">
                                    <div
                                        className={`topic-progress-fill ${isMastered ? 'mastered' : ''}`}
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }

    if(currentChallenge) {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'}}>
                    <Button onClick={resetToTopicSelection}>&larr; Back to Topics</Button>
                </div>
                
                <Card className="challenge-card">
                    <p className="topic-name">A Paradox in {selectedTopic.name}</p>
                    <h1 className="answer font-pixel">{currentChallenge.answer}</h1>
                    <p className="description">{currentChallenge.description}</p>
                </Card>

                <Card className="explanation-card">
                    <h2>Weave Your Explanation</h2>
                    <textarea
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        placeholder="Begin your reverse chronological narrative here..."
                        className="explanation-textarea font-sans"
                        disabled={isLoading}
                    />
                    <div className="actions">
                        <Button onClick={handleSubmit} disabled={isLoading || !explanation.trim()}>
                            {isLoading ? 'The Oracle is thinking...' : 'Submit to the Oracle'}
                        </Button>
                    </div>
                </Card>

                <Modal isOpen={isModalOpen} onClose={handleContinue} title="The Oracle's Verdict">
                    {feedback && (
                        <div className="feedback-modal-content">
                            <div style={{textAlign: 'center'}}>
                                <p className="verdict-title">{feedback.title}</p>
                                <div className="score">{feedback.score}<span>/10</span></div>
                            </div>
                            <div className="strengths">
                                <h3>Strengths of Your Spell</h3>
                                <p>{feedback.strengths}</p>
                            </div>
                            <div className="improvements" style={{marginTop: '1.5rem'}}>
                                <h3>Areas to Refine Your Magic</h3>
                                <ul>
                                    {feedback.improvements.map((item: string, index: number) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            <div className="feedback-modal-actions">
                                <Button onClick={handleContinue} variant="secondary">Back to Topics</Button>
                                {feedback.score > 6 && (
                                    <Button onClick={handleSubmitToArena}>Share with Peers</Button>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        );
    }

    return (
        <div>
            <Button onClick={resetToTopicSelection} className="mb-8">
                &larr; Back to Topics
            </Button>
            <Card style={{padding: '2rem', textAlign: 'center'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--rune-gold)'}}>Chapter Mastered! ★</h2>
                <p style={{marginTop: '1rem', color: 'rgba(229, 222, 247, 0.9)', lineHeight: 1.75}}>
                    You have unraveled every paradox in this chapter. Your wisdom grows.
                    <br/>
                    Select another chapter to continue your journey.
                </p>
            </Card>
        </div>
    );
};

export default TimeWarpMode;