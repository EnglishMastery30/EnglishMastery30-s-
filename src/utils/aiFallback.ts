import { GoogleGenAI } from '@google/genai';

const FALLBACK_MODELS = [
  'gemini-3-flash-preview',
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash-lite'
];

export async function generateContentWithFallback(ai: GoogleGenAI, params: any) {
  let lastError;
  
  // If a specific model is requested, try it first, then fallback
  const modelsToTry = params.model ? [params.model, ...FALLBACK_MODELS.filter(m => m !== params.model)] : FALLBACK_MODELS;

  for (const model of modelsToTry) {
    try {
      console.log(`Attempting AI generation with model: ${model}`);
      const response = await ai.models.generateContent({
        ...params,
        model: model
      });
      return response;
    } catch (error: any) {
      console.warn(`Model ${model} failed:`, error.message || error);
      lastError = error;
      // Continue to the next model in the fallback list
    }
  }
  
  console.error('All fallback models failed.');
  throw lastError;
}
