// Example of using yosi.js to generate Swift code

const { generateCode } = require('../src/ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateSwiftExample() {
  try {
    // Generate a Swift struct
    const command = "create a Swift struct named Movie with title, director, releaseYear, and rating properties, and a method to check if it's a classic movie (older than 25 years)";
    const language = "swift";
    
    console.log(`Generating Swift code for: "${command}"`);
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'Movie.swift');
    console.log('Swift code saved to Movie.swift');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateSwiftExample();
