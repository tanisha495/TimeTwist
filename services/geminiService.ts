import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@^0.15.0";

// Exporting AIFeedback to be used in types.ts and other components
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

// Type-safe API key retrieval
interface ViteImportMeta {
  env: Record<string, string | undefined>;
}

interface WindowWithEnv extends Window {
  GEMINI_API_KEY?: string;
  API_KEY?: string;
  env?: Record<string, string>;
}

const getApiKey = (): string => {
  // For Vite users: create .env file with VITE_GEMINI_API_KEY=your_key_here
  try {
    // Check for Vite environment variables
    const importMeta = (globalThis as any).import as { meta?: ViteImportMeta };
    if (importMeta?.meta?.env) {
      const viteKey = importMeta.meta.env.VITE_GEMINI_API_KEY || importMeta.meta.env.VITE_API_KEY;
      if (viteKey) return viteKey;
    }
  } catch (e) {
    // import.meta not available
  }
  
  // For window injection: window.GEMINI_API_KEY = 'your_key_here'
  if (typeof window !== 'undefined') {
    const win = window as WindowWithEnv;
    const windowKey = win.GEMINI_API_KEY || 
                     win.API_KEY ||
                     win.env?.API_KEY ||
                     win.env?.GEMINI_API_KEY;
    if (windowKey) return windowKey;
  }
  
  // For Node.js environment
  if (typeof process !== 'undefined' && process?.env) {
    return process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  }
  
  console.warn("API_KEY not found. Set VITE_GEMINI_API_KEY in .env file or window.GEMINI_API_KEY");
  return '';
};

const apiKey = getApiKey();
if (!apiKey) {
  console.warn("API_KEY not set. Gemini API calls will fail.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const feedbackResponseSchema = {
    type: "object",
    properties: {
        score: { 
            type: "number",
            description: "A score from 0 to 10 evaluating the explanation."
        },
        title: {
            type: "string",
            description: "A short, catchy title for the feedback, like 'Logically Sound!' or 'A Creative Leap!'."
        },
        strengths: {
            type: "string",
            description: "A summary of what the student did well in their explanation."
        },
        improvements: {
            type: "array",
            items: { 
                type: "string" 
            },
            description: "A list of 2-3 specific, actionable points for improvement."
        }
    },
    required: ["score", "title", "strengths", "improvements"]
};

export const evaluateExplanation = async (answer: string, explanation: string, context: string): Promise<AIFeedback> => {
    const prompt = `You are an AI-Powered Reverse Evaluator for the TimeTwist platform, a magical world of wizardry and learning. Your role is to assess a student wizard's explanation. You will be given the original problem's context, the final answer, and the student's explanation of how to derive the answer from the problem.

    Evaluate the student's explanation based on:
    1.  **Logical Soundness:** Is the reasoning coherent and does it logically lead from the problem to the final answer?
    2.  **Accuracy:** Are the principles, formulas, or concepts mentioned correct and correctly applied?
    3.  **Completeness:** Are there any missing steps or gaps in the explanation?
    4.  **Clarity:** Is the explanation easy to understand?

    Provide your feedback in the required JSON format. The feedback should be encouraging but precise, in the tone of a wise old wizard guiding an apprentice. Do not just repeat the steps; critique the explanation of the steps.
    
    ---

    **Original Problem Context:**
    ${context}

    **Final Answer:**
    ${answer}

    ---

    **Student Wizard's Explanation:**
    ${explanation}
    
    Please respond with valid JSON matching this schema:
    ${JSON.stringify(feedbackResponseSchema, null, 2)}
    `;

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
                responseMimeType: "application/json"
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonText = response.text().trim();
        const parsedFeedback = JSON.parse(jsonText) as AIFeedback;
        return parsedFeedback;

    } catch (error) {
        console.error("Error evaluating explanation with Gemini API:", error);
        return {
            score: 0,
            title: "A Disturbance in the Aether",
            strengths: "The connection to the arcane arts was disrupted.",
            improvements: ["Please check your connection or ensure your API key is valid.", "The ancient runes of the error message may hold a clue."]
        };
    }
};

const analysisResponseSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            description: "A creative, insightful title for the analysis, like 'The Signature of Your Magic' or 'A Pattern in the Weave'."
        },
        patterns: {
            type: "array",
            items: { type: "string" },
            description: "A list of 2-3 recurring patterns or themes identified in the user's mistakes or areas for improvement."
        },
        recommendations: {
            type: "array",
            items: { type: "string" },
            description: "A list of 2-3 high-level, actionable pieces of advice for the student to focus on in their future practice."
        }
    },
    required: ["title", "patterns", "recommendations"]
};

export const analyzeMistakes = async (feedbackHistory: AIFeedback[]): Promise<MagicAnalysisReport> => {
    const formattedHistory = feedbackHistory.map((fb, i) => 
        `--- Feedback Entry ${i + 1} ---
        Score: ${fb.score}/10
        Title: ${fb.title}
        Strengths: ${fb.strengths}
        Improvements:
        ${fb.improvements.map(item => `- ${item}`).join('\n')}
        `
    ).join('\n');

    const prompt = `You are a wise Archmage Mentor in the magical world of TimeTwist. A student wizard has come to you for deeper insight into their practice. You will be given a history of feedback they've received on various challenges. Your task is to analyze this feedback to find underlying patterns and provide high-level, encouraging guidance.

    Do not just repeat the feedback. Synthesize it. Look for the root of the issue.
    - Do they consistently struggle with a certain type of logic (e.g., calculus, recursion)?
    - Do they often make logical leaps without showing their work?
    - Is their foundational knowledge in a specific area weak?

    Your analysis should be formatted as the required JSON. The tone should be that of a wise, caring, and powerful mentor guiding a promising apprentice.
    
    ---

    **Student Wizard's Feedback History:**
    ${formattedHistory}

    ---

    Please provide your analysis based on this history.
    
    Please respond with valid JSON matching this schema:
    ${JSON.stringify(analysisResponseSchema, null, 2)}
    `;

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.8,
                responseMimeType: "application/json"
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonText = response.text().trim();
        return JSON.parse(jsonText) as MagicAnalysisReport;
    } catch (error) {
        console.error("Error analyzing mistakes with Gemini API:", error);
        return {
            title: "The Oracle is Silent",
            patterns: ["A mysterious force is obscuring our connection."],
            recommendations: ["Ensure your connection to the arcane network (Gemini API) is stable.", "Perhaps attempt another challenge to leave a clearer magical trace for the Oracle to read."]
        };
    }
};