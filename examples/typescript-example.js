// Example of using yosi.js to generate TypeScript code

const { generateCode } = require('../src/ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateTypeScriptExample() {
  try {
    // Generate a TypeScript interface and class
    const command = "create a TypeScript interface and class for a User with name, email, and role properties";
    const language = "typescript";
    
    console.log(`Generating TypeScript code for: "${command}"`);
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'User.ts');
    console.log('TypeScript code saved to User.ts');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateTypeScriptExample();
