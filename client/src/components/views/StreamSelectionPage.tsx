import React from 'react';
import { Stream, StreamSelectionPageProps } from '../../types';
import Card from '../ui/Card';
import AtomIcon from '../icons/AtomIcon';
import DnaIcon from '../icons/DnaIcon';
import BriefcaseIcon from '../icons/BriefcaseIcon';
import LandmarkIcon from '../icons/LandmarkIcon';

const streamOptions: { stream: Stream; title: string; description: string; icon: React.ReactNode }[] = [
    {
        stream: 'Non-Medical',
        title: 'School of Engineering & Physical Sciences',
        description: 'Master the arcane arts of Physics, Chemistry, Mathematics, and Computer Science.',
        icon: <AtomIcon className="icon" style={{color: 'var(--spell-blue)'}}/>
    },
    {
        stream: 'Medical',
        title: 'College of Life & Chemical Sciences',
        description: 'Delve into the secrets of Biology, Chemistry, and the laws of Physics.',
        icon: <DnaIcon className="icon" style={{color: 'var(--mana-green)'}}/>
    },
    {
        stream: 'Commerce',
        title: 'Guild of Merchants & Mathematicians',
        description: 'Study the flow of wealth with Accountancy, Economics, and Business.',
        icon: <BriefcaseIcon className="icon" style={{color: 'var(--rune-gold)'}}/>
    },
    {
        stream: 'Arts',
        title: 'Academy of Histories & Humanities',
        description: 'Explore the chronicles of time with History, Geography, and Political Science.',
        icon: <LandmarkIcon className="icon" style={{color: 'var(--glow-pink)'}}/>
    }
];

const StreamSelectionPage: React.FC<StreamSelectionPageProps> = ({ onSelectStream }) => {
    return (
        <div style={{minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div className="text-center mb-10">
                <h1 className="font-pixel" style={{fontSize: '3rem', color: 'var(--rune-gold)'}}>Choose Your Path</h1>
                <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem', maxWidth: '40rem'}}>
                    Every wizard's journey is unique. Select the stream of knowledge you wish to pursue to tailor your trials and challenges.
                </p>
            </div>
            <div className="stream-selection-grid">
                {streamOptions.map(option => (
                    <Card 
                        key={option.stream}
                        className="mode-card card-hover-glow-purple"
                        onClick={() => onSelectStream(option.stream)}
                    >
                        {option.icon}
                        <h3 className="font-pixel">{option.title}</h3>
                        <p>{option.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default StreamSelectionPage;