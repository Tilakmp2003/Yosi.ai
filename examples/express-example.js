// Example of using yosi.js to generate Express.js code

const { generateAdvancedCode } = require('../src/advanced-ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateExpressExample() {
  try {
    // Generate an Express.js API with routes
    const command = "create an Express.js API with routes for CRUD operations on a 'products' resource";
    
    console.log(`Generating Express.js code for: "${command}"`);
    
    const generatedCode = await generateAdvancedCode({
      command,
      language: "javascript",
      framework: "express",
      includeComments: true
    });
    
    // Display the generated code
    displayCode(generatedCode, "javascript");
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'products-api.js');
    console.log('Express.js code saved to products-api.js');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateExpressExample();
