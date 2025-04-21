const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Available AI models
 * @type {Object}
 */
const MODELS = {
  // Standard Gemini models
  'gemini-1.5-pro': {
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    description: 'Google\'s Gemini 1.5 Pro model - balanced performance and quality'
  },
  'gemini-1.5-flash': {
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    description: 'Google\'s Gemini 1.5 Flash model - faster responses'
  },
  'gemini-1.0-pro': {
    name: 'Gemini 1.0 Pro',
    provider: 'google',
    description: 'Google\'s Gemini 1.0 Pro model - previous generation'
  },
  'gemini-1.0-pro-vision': {
    name: 'Gemini 1.0 Pro Vision',
    provider: 'google',
    description: 'Google\'s Gemini 1.0 Pro Vision model - includes vision capabilities'
  },

  // Preview/Experimental models
  'gemini-2.5-flash-preview-04-17': {
    name: 'Gemini 2.5 Flash (Preview)',
    provider: 'google',
    description: 'Google\'s Gemini 2.5 Flash preview model - faster responses'
  },
  'gemini-2.5-flash-preview-04-17:thinking': {
    name: 'Gemini 2.5 Flash Thinking (Preview)',
    provider: 'google',
    description: 'Google\'s Gemini 2.5 Flash preview model with thinking mode enabled'
  },
  'gemini-2.5-pro-exp-03-25': {
    name: 'Gemini 2.5 Pro (Experimental)',
    provider: 'google',
    description: 'Google\'s experimental Gemini 2.5 Pro model - enhanced capabilities'
  }
};

/**
 * Get available models
 * @returns {Object} - Available models
 */
function getAvailableModels() {
  return MODELS;
}

/**
 * Generates code using Google's Gemini API based on a natural language command
 * @param {string} command - The natural language command to generate code
 * @param {string} language - The programming language to generate code in
 * @param {string} modelName - The model to use (default: 'gemini-2.5-flash-preview-04-17')
 * @returns {Promise<string>} - The generated code
 */
async function generateCode(command, language = 'javascript', modelName = 'gemini-2.5-flash-preview-04-17') {
  try {
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set. Please set it to your Gemini API key.');
    }

    // Validate model name
    if (!MODELS[modelName]) {
      throw new Error(`Invalid model name: ${modelName}. Available models: ${Object.keys(MODELS).join(', ')}`);
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    // Construct a prompt that will generate clean, usable code
    const prompt = `
Generate ${language} code for the following request: "${command}"

Please provide ONLY the code without any explanations, comments, or markdown formatting.
The code should be production-ready, following best practices for ${language}.
`;

    // Generate content
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return text.trim();
  } catch (error) {
    if (error.message.includes('API key')) {
      throw error;
    } else {
      throw new Error(`Failed to generate code: ${error.message}`);
    }
  }
}

module.exports = {
  generateCode,
  getAvailableModels
};
