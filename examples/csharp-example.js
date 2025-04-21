// Example of using yosi.js to generate C# code

const { generateCode } = require('../src/ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateCSharpExample() {
  try {
    // Generate a C# class
    const command = "create a C# class named Product with id, name, price, and description properties, constructors, and a ToString method";
    const language = "csharp";
    
    console.log(`Generating C# code for: "${command}"`);
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'Product.cs');
    console.log('C# code saved to Product.cs');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateCSharpExample();
