// Example of using yosi.js with different AI models

const { generateCode, getAvailableModels } = require('../src/ai-handler');
const { generateAdvancedCode } = require('../src/advanced-ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');
const path = require('path');
const fs = require('fs');

// Create output directory
const outputDir = path.join(__dirname, 'model-output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function modelSelectionExample() {
  try {
    // Get available models
    const models = getAvailableModels();
    console.log('Available models:');
    
    // Display model information
    Object.entries(models).forEach(([modelId, modelInfo]) => {
      console.log(`- ${modelId}: ${modelInfo.name} (${modelInfo.description})`);
    });
    
    // Generate code with different models
    console.log('\nGenerating code with different models...\n');
    
    // Simple command to test with
    const command = 'create a function that calculates the factorial of a number';
    const language = 'javascript';
    
    // Generate code with each model
    for (const modelId of Object.keys(models)) {
      console.log(`\nUsing model: ${modelId}`);
      
      try {
        // Basic code generation
        console.log(`Generating basic code with ${modelId}...`);
        const basicCode = await generateCode(command, language, modelId);
        displayCode(basicCode, language);
        saveToFile(basicCode, path.join(outputDir, `factorial-${modelId}.js`));
        
        // Advanced code generation
        console.log(`\nGenerating advanced code with ${modelId}...`);
        const advancedCode = await generateAdvancedCode({
          command: 'create a function that calculates the fibonacci sequence',
          language,
          includeComments: true,
          model: modelId
        });
        displayCode(advancedCode, language);
        saveToFile(advancedCode, path.join(outputDir, `fibonacci-${modelId}.js`));
      } catch (modelError) {
        console.error(`Error with model ${modelId}:`, modelError.message);
      }
    }
    
    console.log('\nAll code samples have been generated and saved to:', outputDir);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

modelSelectionExample();
