// Example of using yosi.js programmatically

const { generateCode } = require('../src/ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function example() {
  try {
    // Generate a simple function
    const command = "create a function named design that logs 'Hello, World!'";
    const language = "javascript";
    
    console.log(`Generating code for: "${command}" in ${language}`);
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'design.js');
    console.log('Code saved to design.js');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

example();
