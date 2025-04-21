const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getAvailableModels } = require('./ai-handler');

/**
 * Generates code using Google's Gemini API with more context and options
 * @param {Object} options - Options for code generation
 * @param {string} options.command - The natural language command to generate code
 * @param {string} options.language - The programming language to generate code in
 * @param {string} options.framework - Optional framework context (e.g., 'react', 'express')
 * @param {string} options.existingCode - Optional existing code to extend or modify
 * @param {boolean} options.includeComments - Whether to include comments in the generated code
 * @param {string} options.model - The model to use (default: 'gemini-pro')
 * @returns {Promise<string>} - The generated code
 */
async function generateAdvancedCode(options) {
  const {
    command,
    language = 'javascript',
    framework = '',
    existingCode = '',
    includeComments = false,
    model = 'gemini-2.5-flash-preview-04-17'
  } = options;

  try {
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set. Please set it to your Gemini API key.');
    }

    // Validate model name
    const MODELS = getAvailableModels();
    if (!MODELS[model]) {
      throw new Error(`Invalid model name: ${model}. Available models: ${Object.keys(MODELS).join(', ')}`);
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);
    const aiModel = genAI.getGenerativeModel({ model });

    // Build framework context
    let frameworkContext = '';
    if (framework) {
      frameworkContext = `The code should use the ${framework} framework.`;
    }

    // Build existing code context with improved instructions for editing
    let codeContext = '';
    if (existingCode) {
      codeContext = `
Here is the existing code that should be extended or modified:

\`\`\`${language}
${existingCode}
\`\`\`

When modifying existing code:
1. Preserve the overall structure and organization of the code
2. Maintain function signatures, class definitions, and variable names unless explicitly asked to change them
3. Make targeted changes rather than rewriting everything
4. Return the complete code with your modifications, not just the changed parts
`;
    }

    // Build comment instruction
    const commentInstruction = includeComments
      ? 'Include helpful comments to explain the code.'
      : 'Minimize comments in the code.';

    // Construct a prompt that will generate clean, usable code
    const prompt = `
Generate ${language} code for the following request: "${command}"

${frameworkContext}
${codeContext}
${commentInstruction}

The code should be production-ready, following best practices for ${language}.
If you are modifying existing code, focus on making precise, targeted changes while preserving the overall structure.
Please provide ONLY the complete code without any explanations or markdown formatting.
`;

    // Generate content
    console.log('Sending prompt to Gemini API...');
    try {
      const result = await aiModel.generateContent(prompt);
      const text = result.response.text();
      console.log('Received response from Gemini API, length:', text.length);
      return text.trim();
    } catch (apiError) {
      console.error('Gemini API error:', apiError.message);
      throw apiError;
    }
  } catch (error) {
    if (error.message.includes('API key')) {
      throw error;
    } else {
      throw new Error(`Failed to generate code: ${error.message}`);
    }
  }
}

module.exports = {
  generateAdvancedCode
};
