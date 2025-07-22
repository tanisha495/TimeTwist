
import React from 'react';
import Card from './Card';
import Button from './Button';

interface LevelUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    level: number;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ isOpen, onClose, level }) => {
    if (!isOpen) return null;

    return (
        <div className="levelup-modal-overlay">
            <Card className="levelup-card">
                <div className="sparkle-effect">
                    <h2 className="font-pixel">LEVEL UP!</h2>
                </div>

                <p className="ascended-text">
                    You have ascended to
                </p>

                <p className="level-display font-fantasy">
                    Level {level}
                </p>

                <p className="description">
                    Your mastery of the arcane arts grows stronger. New challenges await!
                </p>
                
                <Button onClick={onClose}>
                    Continue my Legend
                </Button>
            </Card>
        </div>
    );
};

export default LevelUpModal;