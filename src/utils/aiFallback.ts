import { GoogleGenAI } from '@google/genai';

const FALLBACK_MODELS = [
  'gemini-3-flash-preview',
  'gemini-3.1-pro-preview',
  'gemini-2.5-flash',
  'gemini-flash-latest'
];

export async function generateContentWithFallback(ai: GoogleGenAI, params: any) {
  let lastError;
  const maxRetriesPerModel = 2;
  
  // Remove the models/ prefix if it exists
  let requestedModel = params.model;
  if (requestedModel && requestedModel.startsWith('models/')) {
    requestedModel = requestedModel.replace('models/', '');
  }
  
  // If a specific model is requested, try it first, then fallback
  const modelsToTry = requestedModel ? [requestedModel, ...FALLBACK_MODELS.filter(m => m !== requestedModel)] : FALLBACK_MODELS;

  for (const model of modelsToTry) {
    let retryCount = 0;
    while (retryCount <= maxRetriesPerModel) {
      try {
        console.log(`Attempting AI generation with model: ${model} (attempt ${retryCount + 1})`);
        const response = await ai.models.generateContent({
          ...params,
          model: model
        });
        return response;
      } catch (error: any) {
        lastError = error;
        const errorMessage = error.message || "";
        
        // If it's a 429 (Resource Exhausted), retry with backoff if we haven't reached max retries
        if (errorMessage.includes('429') && retryCount < maxRetriesPerModel) {
          retryCount++;
          console.warn(`Model ${model} rate limited (429). Retrying in ${retryCount}s...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          continue;
        }
        
        console.warn(`Model ${model} failed:`, errorMessage);
        // Move to next model if it's not a retryable error or we exhausted retries
        break;
      }
    }
  }
  
  console.error('All models and fallbacks failed.');
  throw lastError;
}
