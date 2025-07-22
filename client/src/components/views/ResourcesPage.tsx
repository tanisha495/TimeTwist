

import React, { useState } from 'react';
import { ResourcesPageProps, Subject, View, ResourceCategory, Resource } from '../../types';
import { SUBJECTS_BY_STREAM } from '../../data/challenges';
import { RESOURCES_DATA } from '../../data/resources';
import Button from '../ui/Button';
import Card from '../ui/Card';

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; }> = ({ title, children, isOpen, onClick }) => {
    return (
        <div style={{border: '1px solid rgba(192, 132, 252, 0.3)', borderRadius: '0.5rem', overflow: 'hidden'}}>
            <button
                onClick={onClick}
                style={{width: '100%', padding: '1rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(44, 31, 74, 0.3)', transition: 'background-color 0.2s', border: 'none', color: 'inherit', cursor: 'pointer'}}
            >
                <h3 style={{fontSize: '1.25rem', fontWeight: 700, color: 'var(--rune-gold)'}}>{title}</h3>
                <span style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: 'var(--rune-gold)', fontSize: '1.5rem'}}>
                    {isOpen ? '-' : '+'}
                </span>
            </button>
            <div style={{transition: 'max-height 0.5s ease-in-out', maxHeight: isOpen ? '1000px' : '0', overflow: 'hidden'}}>
                 <div style={{padding: '1rem', backgroundColor: 'rgba(26, 17, 47, 0.5)', borderTop: '1px solid rgba(192, 132, 252, 0.2)'}}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const ResourcesPage: React.FC<ResourcesPageProps> = ({ user, onNavigate }) => {
    const availableSubjects = user.stream ? SUBJECTS_BY_STREAM[user.stream] : [];
    const [selectedSubject, setSelectedSubject] = useState<Subject>(availableSubjects[0] || 'Math');
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    const toggleCategory = (categoryName: string) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName);
    };

    const resourcesForSubject = RESOURCES_DATA[selectedSubject] || [];

    return (
        <div>
            <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8">
                &larr; Back to Dashboard
            </Button>
            <div className="text-center mb-10">
                <h1 className="font-pixel" style={{fontSize: '3rem', color: 'var(--rune-gold)'}}>The Wizard's Library</h1>
                <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem'}}>Ancient knowledge and helpful guides await you.</p>
            </div>

            <Card style={{padding: '1rem'}}>
                <div style={{marginBottom: '1.5rem', borderBottom: '1px solid rgba(192, 132, 252, 0.3)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {availableSubjects.map((subject: Subject) => (
                        <button
                            key={subject}
                            onClick={() => {
                                setSelectedSubject(subject);
                                setOpenCategory(null);
                            }}
                            style={{padding: '0.75rem 1.5rem', fontSize: '1.125rem', fontWeight: 700, transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer', borderBottom: selectedSubject === subject ? '2px solid var(--rune-gold)' : '2px solid transparent', color: selectedSubject === subject ? 'var(--rune-gold)' : '#d1d5db'}}
                        >
                            {subject}
                        </button>
                    ))}
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {resourcesForSubject.map((category: ResourceCategory) => (
                        <AccordionItem
                            key={category.name}
                            title={category.name}
                            isOpen={openCategory === category.name}
                            onClick={() => toggleCategory(category.name)}
                        >
                            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                {category.resources.map((resource: Resource) => (
                                    <div key={resource.title} style={{padding: '1rem', backgroundColor: 'rgba(44, 31, 74, 0.4)', borderRadius: '0.5rem'}}>
                                        <h4 style={{fontSize: '1.125rem', fontWeight: 700, color: 'var(--spell-blue)'}}>{resource.title}</h4>
                                        <p style={{color: 'rgba(229, 222, 247, 0.9)', marginTop: '0.25rem', marginBottom: '0.75rem', fontSize: '0.875rem'}}>{resource.description}</p>
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                            style={{padding: '0.25rem 0.75rem', fontSize: '0.875rem'}}
                                        >
                                            View Resource
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </AccordionItem>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default ResourcesPage;