// Example of using yosi.js to generate Ruby code

const { generateCode } = require('../src/ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateRubyExample() {
  try {
    // Generate a Ruby class
    const command = "create a Ruby class named BlogPost with title, content, author, and published_at attributes, and methods to publish and unpublish";
    const language = "ruby";
    
    console.log(`Generating Ruby code for: "${command}"`);
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'blog_post.rb');
    console.log('Ruby code saved to blog_post.rb');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateRubyExample();
