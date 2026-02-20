
import { GoogleGenAI, Type } from "@google/genai";
import { FormDefinition } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateFormFromPrompt = async (prompt: string): Promise<FormDefinition> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Act as a medical terminology expert. Create an LForms-compatible form definition for: ${prompt}. 
               STRUCTURE RULES:
               - Use hierarchical nesting: SECTION (Top level), GROUP (Middle level), and standard fields (TEXT, NUMBER, SELECT, RADIO).
               - Add indices like "I.", "1.", "a." for each question.
               - Include LOINC codes for clinical observations.
               - Group related fields together.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          version: { type: Type.STRING },
          publisher: { type: Type.STRING },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                label: { type: Type.STRING },
                type: { type: Type.STRING, description: 'One of SECTION, GROUP, TEXT, NUMBER, DATE, CHECKBOX, SELECT, RADIO' },
                index: { type: Type.STRING },
                required: { type: Type.BOOLEAN },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                loincCode: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING } } } } // Recursive structure
              },
              required: ['id', 'label', 'type']
            }
          }
        },
        required: ['title', 'version', 'publisher', 'items']
      }
    }
  });

  try {
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as FormDefinition;
  } catch (error) {
    console.error("Failed to parse AI response", error);
    throw new Error("Failed to generate valid form structure");
  }
};
