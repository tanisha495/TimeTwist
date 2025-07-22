

import React, { useState, useRef, useEffect } from 'react';
import { CommunityPageProps, View, Subject } from '../../types';
import { SUBJECTS_BY_STREAM } from '../../data/challenges';
import Button from '../ui/Button';
import Card from '../ui/Card';
import CrystalBallIcon from '../icons/CrystalBallIcon';

const CHANNEL_DETAILS: Record<string, { id: string, name: string }> = {
    'General': { id: '#general-discussion', name: 'General Discussion' },
    'Math': { id: '#math-wizards', name: 'Math Wizards' },
    'Physics': { id: '#physics-phalanx', name: 'Physics Phalanx' },
    'Chemistry': { id: '#chemistry-cauldron', name: 'Chemistry Cauldron' },
    'CS': { id: '#cs-coven', name: 'CS Coven' },
    'Biology': { id: '#biology-biolab', name: 'Biology Bio-Lab' },
    'Economics': { id: '#econ-exchange', name: 'Econ Exchange' },
    'Business Studies': { id: '#business-bureau', name: 'Business Bureau' },
    'Accountancy': { id: '#accounting-archive', name: 'Accounting Archive' },
    'History': { id: '#history-hall', name: 'History Hall' },
    'Geography': { id: '#geography-guild', name: 'Geography Guild' },
    'Political Science': { id: '#polisci-podium', name: 'PoliSci Podium' }
};


const CommunityPage: React.FC<CommunityPageProps> = ({ user, messages, onNavigate, onSendMessage }) => {
    const availableSubjects = user.stream ? SUBJECTS_BY_STREAM[user.stream] : [];
    const availableChannels = [
        CHANNEL_DETAILS['General'],
        ...availableSubjects.map(subject => CHANNEL_DETAILS[subject]).filter(Boolean)
    ];

    const [activeChannel, setActiveChannel] = useState(availableChannels[0].id);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const filteredMessages = messages.filter(m => m.channel === activeChannel);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [filteredMessages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(activeChannel, newMessage.trim());
            setNewMessage('');
        }
    };

    return (
        <div>
            <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8">
                &larr; Back to Dashboard
            </Button>
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold font-pixel" style={{color: 'var(--rune-gold)'}}>Wizards' Concord</h1>
                <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem'}}>Share wisdom and seek council with your peers.</p>
            </div>

            <div className="community-grid">
                <Card className="channels-panel">
                    <h2>Channels</h2>
                    <ul className="channels-list">
                        {availableChannels.map(channel => (
                            <li key={channel.id}>
                                <button
                                    onClick={() => setActiveChannel(channel.id)}
                                    className={`channel-btn ${activeChannel === channel.id ? 'active' : ''}`}
                                >
                                    <CrystalBallIcon style={{width: '1.25rem', height: '1.25rem', opacity: 0.7}}/>
                                    {channel.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card className="chat-panel">
                    <div className="message-list">
                        {filteredMessages.map(msg => (
                             <div key={msg.id} className={`message-item ${msg.authorId === user.id ? 'is-user' : ''}`}>
                                {msg.authorId !== user.id && (
                                     <img src={msg.authorAvatar} alt={msg.authorName} />
                                )}
                                <div className="message-bubble-container">
                                    <p className="message-author">{msg.authorName}</p>
                                    <div className="message-bubble">
                                        <p className="font-sans">{msg.text}</p>
                                    </div>
                                </div>
                                 {msg.authorId === user.id && (
                                     <img src={msg.authorAvatar} alt={msg.authorName} />
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="message-form-container">
                        <form onSubmit={handleSend} className="message-form">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={`Message in ${activeChannel}...`}
                                className="form-input message-input font-sans"
                            />
                            <Button type="submit" disabled={!newMessage.trim()}>Send</Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CommunityPage;