// Example of using yosi.js to generate Go code

const { generateCode } = require('../src/ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateGoExample() {
  try {
    // Generate a Go struct and methods
    const command = "create a Go struct named User with name, email, and age fields, and methods to validate email and check if user is adult";
    const language = "go";
    
    console.log(`Generating Go code for: "${command}"`);
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'user.go');
    console.log('Go code saved to user.go');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateGoExample();
