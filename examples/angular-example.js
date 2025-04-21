// Example of using yosi.js to generate Angular code

const { generateAdvancedCode } = require('../src/advanced-ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateAngularExample() {
  try {
    // Generate an Angular component
    const command = "create an Angular component for a user profile that displays name, email, and avatar, with edit functionality";
    
    console.log(`Generating Angular code for: "${command}"`);
    
    const generatedCode = await generateAdvancedCode({
      command,
      language: "typescript",
      framework: "angular",
      includeComments: true
    });
    
    // Display the generated code
    displayCode(generatedCode, "typescript");
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'user-profile.component.ts');
    console.log('Angular component saved to user-profile.component.ts');
    
    // Generate the template
    const templateCommand = "create an Angular template for a user profile component with name, email, and avatar fields, and an edit button";
    
    console.log(`\nGenerating Angular template for: "${templateCommand}"`);
    
    const templateCode = await generateAdvancedCode({
      command: templateCommand,
      language: "html",
      framework: "angular",
      includeComments: true
    });
    
    // Display the generated template
    displayCode(templateCode, "html");
    
    // Save the generated template to a file
    saveToFile(templateCode, 'user-profile.component.html');
    console.log('Angular template saved to user-profile.component.html');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateAngularExample();
