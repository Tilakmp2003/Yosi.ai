// Example of using yosi.js to generate Python code

const { generateCode } = require('../src/ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generatePythonExample() {
  try {
    // Generate a Python class
    const command = "create a Python class named DataProcessor that can load, process, and save CSV data";
    const language = "python";
    
    console.log(`Generating Python code for: "${command}"`);
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'data_processor.py');
    console.log('Python code saved to data_processor.py');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generatePythonExample();
