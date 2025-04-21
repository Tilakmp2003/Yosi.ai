// Example of using yosi.js API to modify existing code

const { refactorCode } = require('../src/refactor');
const fs = require('fs');
const path = require('path');

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

async function modifyExistingFile() {
  try {
    // Path to the file you want to modify
    const filePath = path.join(__dirname, '../test/sample.js');
    
    // Path where you want to save the modified file
    const outputPath = path.join(__dirname, '../test/sample.modified.js');
    
    console.log('Original file content:');
    console.log(fs.readFileSync(filePath, 'utf8'));
    console.log('\n-----------------------------------\n');
    
    // Modify the existing file using the refactorCode function
    const modifiedCode = await refactorCode({
      filePath: filePath,
      command: 'add error handling',
      outputPath: outputPath,
      targetSection: 'calculateTotal', // Optional: target a specific function/section
      preserveStructure: true          // Optional: preserve the overall code structure
    });
    
    console.log('Modified file content:');
    console.log(fs.readFileSync(outputPath, 'utf8'));
    
    console.log('\nFile successfully modified and saved to:', outputPath);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the example
modifyExistingFile();
