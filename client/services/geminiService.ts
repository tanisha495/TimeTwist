// Uses built-in evaluation logic and pattern matching

export interface AIFeedback {
  score: number; // 0-10
  title: string;
  strengths: string;
  improvements: string[];
}

export interface MagicAnalysisReport {
  title: string;
  patterns: string[];
  recommendations: string[];
}

// Built-in evaluation logic
class LocalAIEvaluator {
  private static readonly POSITIVE_KEYWORDS = [
    'correct', 'accurate', 'precise', 'logical', 'clear', 'complete',
    'detailed', 'step-by-step', 'systematic', 'thorough'
  ];

  private static readonly NEGATIVE_KEYWORDS = [
    'wrong', 'incorrect', 'missing', 'incomplete', 'unclear', 'vague',
    'confused', 'error', 'mistake', 'gap'
  ];

  private static readonly MATH_KEYWORDS = [
    'equation', 'formula', 'calculate', 'solve', 'derivative', 'integral',
    'algebra', 'geometry', 'trigonometry', 'statistics'
  ];

  private static readonly LOGIC_KEYWORDS = [
    'because', 'therefore', 'thus', 'since', 'given', 'proves', 'implies',
    'follows', 'concludes', 'demonstrates'
  ];

  private static analyzeExplanationQuality(explanation: string): {
    score: number;
    strengths: string[];
    weaknesses: string[];
  } {
    const words = explanation.toLowerCase().split(/\s+/);
    const sentences = explanation.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let score = 5; // Base score
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    // Length analysis
    if (explanation.length < 50) {
      score -= 2;
      weaknesses.push('explanation too brief');
    } else if (explanation.length > 200) {
      score += 1;
      strengths.push('detailed explanation');
    }

    // Logical structure analysis
    const logicalWords = words.filter(word => 
      this.LOGIC_KEYWORDS.some(keyword => word.includes(keyword))
    ).length;
    
    if (logicalWords >= 2) {
      score += 1;
      strengths.push('good logical flow');
    } else if (logicalWords === 0) {
      score -= 1;
      weaknesses.push('lacks logical connections');
    }

    // Math/technical content
    const mathWords = words.filter(word => 
      this.MATH_KEYWORDS.some(keyword => word.includes(keyword))
    ).length;
    
    if (mathWords > 0) {
      score += 1;
      strengths.push('uses appropriate terminology');
    }

    // Step-by-step structure
    const hasSteps = /step|first|second|third|next|then|finally/i.test(explanation);
    if (hasSteps) {
      score += 1;
      strengths.push('clear step-by-step approach');
    }

    // Question marks (showing uncertainty)
    const questionMarks = (explanation.match(/\?/g) || []).length;
    if (questionMarks > 2) {
      score -= 1;
      weaknesses.push('shows uncertainty');
    }

    // Ensure score is within bounds
    score = Math.max(0, Math.min(10, score));

    return { score, strengths, weaknesses };
  }

  private static generateTitle(score: number): string {
    const titles = {
      high: [
        "Magically Brilliant!",
        "A Masterful Explanation!",
        "Wizard-Level Logic!",
        "Spellbinding Reasoning!",
        "Arcane Mastery!"
      ],
      medium: [
        "Good Magical Progress!",
        "Solid Wizardry!",
        "On the Right Path!",
        "Promising Spellwork!",
        "Developing Wisdom!"
      ],
      low: [
        "A Learning Opportunity!",
        "Room for Growth!",
        "Practice Makes Perfect!",
        "The Journey Continues!",
        "Building Foundations!"
      ]
    };

    let category: keyof typeof titles;
    if (score >= 8) category = 'high';
    else if (score >= 5) category = 'medium';
    else category = 'low';

    const categoryTitles = titles[category];
    return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
  }

  private static generateImprovements(weaknesses: string[], score: number): string[] {
    const improvements: string[] = [];
    
    if (weaknesses.includes('explanation too brief')) {
      improvements.push('Expand your explanation with more detailed reasoning and examples');
    }
    
    if (weaknesses.includes('lacks logical connections')) {
      improvements.push('Use connecting words like "because", "therefore", and "since" to show your reasoning');
    }
    
    if (weaknesses.includes('shows uncertainty')) {
      improvements.push('Be more confident in your explanations - state your reasoning clearly');
    }
    
    if (score < 5) {
      improvements.push('Break down your solution into clear, sequential steps');
      improvements.push('Double-check your logic and ensure each step follows from the previous one');
    }
    
    if (improvements.length === 0) {
      improvements.push('Consider adding more examples to illustrate your points');
      improvements.push('Try to anticipate and address potential counterarguments');
    }
    
    return improvements.slice(0, 3); // Limit to 3 improvements
  }
}

export const evaluateExplanation = async (answer: string, explanation: string): Promise<AIFeedback> => {
  try {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const analysis = LocalAIEvaluator['analyzeExplanationQuality'](explanation);
    const title = LocalAIEvaluator['generateTitle'](analysis.score);
    const improvements = LocalAIEvaluator['generateImprovements'](analysis.weaknesses, analysis.score);
    
    let strengths = "Your explanation shows understanding of the problem";
    if (analysis.strengths.length > 0) {
      strengths = `Great work on: ${analysis.strengths.join(', ')}. ${strengths}`;
    }
    
    return {
      score: analysis.score,
      title,
      strengths,
      improvements
    };
  } catch (error) {
    console.error("Error in local evaluation:", error);
    return {
      score: 0,
      title: "A Disturbance in the Aether",
      strengths: "The connection to the arcane arts was disrupted.",
      improvements: [
        "Please try again - the magical evaluation process encountered an error",
        "Ensure your explanation is properly formatted"
      ]
    };
  }
};

export const analyzeMistakes = async (feedbackHistory: AIFeedback[]): Promise<MagicAnalysisReport> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (feedbackHistory.length === 0) {
      return {
        title: "The Beginning of Your Journey",
        patterns: ["No patterns yet - you're just getting started!"],
        recommendations: [
          "Complete more challenges to unlock deeper insights",
          "Focus on providing detailed, step-by-step explanations"
        ]
      };
    }
    
    const averageScore = feedbackHistory.reduce((sum, fb) => sum + fb.score, 0) / feedbackHistory.length;
    const commonImprovements: { [key: string]: number } = {};
    
    // Analyze common improvement themes
    feedbackHistory.forEach(fb => {
      fb.improvements.forEach(improvement => {
        const key = improvement.toLowerCase();
        if (key.includes('detailed') || key.includes('expand')) {
          commonImprovements['detail'] = (commonImprovements['detail'] || 0) + 1;
        } else if (key.includes('logical') || key.includes('reasoning')) {
          commonImprovements['logic'] = (commonImprovements['logic'] || 0) + 1;
        } else if (key.includes('step') || key.includes('sequential')) {
          commonImprovements['structure'] = (commonImprovements['structure'] || 0) + 1;
        } else if (key.includes('confident') || key.includes('certain')) {
          commonImprovements['confidence'] = (commonImprovements['confidence'] || 0) + 1;
        }
      });
    });
    
    const patterns: string[] = [];
    const recommendations: string[] = [];
    
    // Generate insights based on patterns
    if (averageScore < 5) {
      patterns.push("Your magical foundations are still developing - focus on the basics");
      recommendations.push("Practice breaking down complex problems into smaller, manageable steps");
    } else if (averageScore < 7) {
      patterns.push("You show good understanding but could benefit from more detailed explanations");
      recommendations.push("Try to elaborate more on your reasoning process");
    } else {
      patterns.push("You demonstrate strong analytical thinking and clear communication");
      recommendations.push("Challenge yourself with more complex problems to advance your skills");
    }
    
    // Add specific pattern-based insights
    const maxImprovement = Object.keys(commonImprovements).reduce((a, b) => 
      commonImprovements[a] > commonImprovements[b] ? a : b, 
      Object.keys(commonImprovements)[0]
    );
    
    if (maxImprovement === 'detail') {
      patterns.push("You tend to provide concise but sometimes incomplete explanations");
      recommendations.push("Focus on expanding your answers with more comprehensive reasoning");
    } else if (maxImprovement === 'logic') {
      patterns.push("Your logical connections between steps could be stronger");
      recommendations.push("Practice using transitional phrases to show how each step follows from the previous");
    } else if (maxImprovement === 'structure') {
      patterns.push("Your explanations would benefit from better organization");
      recommendations.push("Try numbering your steps or using clear headings to structure your thoughts");
    }
    
    const titles = [
      "The Pattern in Your Magical Signature",
      "Reading the Runes of Your Progress",
      "The Shape of Your Growing Wisdom",
      "Deciphering Your Arcane Journey"
    ];
    
    return {
      title: titles[Math.floor(Math.random() * titles.length)],
      patterns: patterns.slice(0, 3),
      recommendations: recommendations.slice(0, 3)
    };
    
  } catch (error) {
    console.error("Error in local mistake analysis:", error);
    return {
      title: "The Oracle is Silent",
      patterns: ["A mysterious force is obscuring our connection."],
      recommendations: [
        "The analysis spirits are resting - try again later",
        "Complete more challenges to provide clearer patterns for analysis"
      ]
    };
  }
};