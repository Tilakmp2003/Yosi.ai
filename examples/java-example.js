// Example of using yosi.js to generate Java code

const { generateCode } = require('../src/ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateJavaExample() {
  try {
    // Generate a Java class
    const command = "create a Java class named Person with name, age, and email properties, getters, setters, and a toString method";
    const language = "java";
    
    console.log(`Generating Java code for: "${command}"`);
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'Person.java');
    console.log('Java code saved to Person.java');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateJavaExample();
