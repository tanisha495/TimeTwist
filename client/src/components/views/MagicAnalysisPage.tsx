
import React, { useState } from 'react';
import { MagicAnalysisPageProps, View } from '../../types';
import { MagicAnalysisReport, analyzeMistakes } from '../../../services/geminiService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import CrystalBallIcon from '../icons/CrystalBallIcon';

const MagicAnalysisPage: React.FC<MagicAnalysisPageProps> = ({ onNavigate, feedbackHistory }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState<MagicAnalysisReport | null>(null);

    const handleAnalysis = async () => {
        setIsLoading(true);
        setReport(null);
        const result = await analyzeMistakes(feedbackHistory);
        setReport(result);
        setIsLoading(false);
    };

    return (
        <div>
            <Button onClick={() => onNavigate(View.DASHBOARD)} className="mb-8">
                &larr; Back to Dashboard
            </Button>
            <div className="text-center mb-10">
                <h1 className="font-pixel" style={{fontSize: '3rem', color: 'var(--rune-gold)'}}>Magic Analysis</h1>
                <p style={{color: 'rgba(216, 180, 254, 0.8)', marginTop: '0.5rem'}}>Gaze into the Oracle's crystal ball to see the patterns in your magic.</p>
            </div>

            <Card style={{padding: '2rem', textAlign: 'center'}}>
                {!report && !isLoading && (
                    <div style={{ maxWidth: '42rem', margin: '0 auto', textAlign: 'center' }}>
                      <div style={{ width: '6rem', height: '6rem', margin: '0 auto 1.5rem', color: 'var(--spell-blue)' }}>
                        <CrystalBallIcon />
                      </div>

                      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
                        The Oracle Awaits Your Query
                      </h2>

                      <p style={{ color: 'rgba(229, 222, 247, 0.9)', marginBottom: '1.5rem' }}>
                        The Oracle can analyze the magical traces you've left behind (your last {feedbackHistory.length} challenges
                        to reveal hidden truths about your methods. Are you ready to seek its wisdom?
                      </p>

                      <Button onClick={handleAnalysis} disabled={feedbackHistory.length === 0}>
                        {feedbackHistory.length > 0 ? "Consult the Oracle" : "No Traces Found"}
                      </Button>
                    </div>
                )}
                
                {isLoading && (
                     <div>
                        <h2 className="animate-pulse" style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--spell-blue)'}}>The Oracle is gazing into the threads of fate...</h2>
                        <p style={{marginTop: '1rem', color: 'rgba(229, 222, 247, 0.8)'}}>This may take a moment.</p>
                    </div>
                )}

                {report && (
                    <div className="animate-fade-in" style={{textAlign: 'left'}}>
                        <h2 style={{fontSize: '1.875rem', fontWeight: 700, color: 'var(--rune-gold)', textAlign: 'center', marginBottom: '2rem'}}>{report.title}</h2>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                            <div>
                                <h3 className="font-pixel" style={{fontSize: '1.25rem', fontWeight: 700, color: 'var(--glow-pink)', marginBottom: '0.75rem'}}>Patterns Revealed</h3>
                                <ul style={{listStylePosition: 'inside', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: 'rgba(26, 17, 47, 0.5)', padding: '1rem', borderRadius: '0.375rem', color: 'rgba(229, 222, 247, 0.9)'}}>
                                    {report.patterns.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-pixel" style={{fontSize: '1.25rem', fontWeight: 700, color: 'var(--mana-green)', marginBottom: '0.75rem'}}>Wisdom for Your Path</h3>
                                <ul style={{listStylePosition: 'inside', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: 'rgba(26, 17, 47, 0.5)', padding: '1rem', borderRadius: '0.375rem', color: 'rgba(229, 222, 247, 0.9)'}}>
                                    {report.recommendations.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                         <div style={{textAlign: 'center', marginTop: '2rem'}}>
                            <Button onClick={() => setReport(null)} variant="secondary">Consult Again</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default MagicAnalysisPage;