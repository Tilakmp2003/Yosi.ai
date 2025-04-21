// Example of using yosi.js to generate Vue.js code

const { generateAdvancedCode } = require('../src/advanced-ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function generateVueExample() {
  try {
    // Generate a Vue.js component
    const command = "create a Vue.js component for a product card that displays an image, title, price, and has an 'Add to Cart' button";
    
    console.log(`Generating Vue.js code for: "${command}"`);
    
    const generatedCode = await generateAdvancedCode({
      command,
      language: "vue",
      framework: "vue",
      includeComments: true
    });
    
    // Display the generated code
    displayCode(generatedCode, "vue");
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'ProductCard.vue');
    console.log('Vue.js code saved to ProductCard.vue');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateVueExample();
