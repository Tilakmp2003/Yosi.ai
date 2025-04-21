// Example of using yosi.js to generate a React component

const { generateCode } = require('../src/ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateReactComponent() {
  try {
    // Generate a React component
    const command = "create a React component named Button with primary and secondary variants";
    const language = "jsx";
    
    console.log(`Generating React component for: "${command}"`);
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'Button.jsx');
    console.log('React component saved to Button.jsx');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateReactComponent();
