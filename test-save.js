// Test script to debug file saving issues
const fs = require('fs');
const path = require('path');
const { saveToFile } = require('./src/output-handler');

// Test code with markdown formatting
const testCode = "```javascript\nfunction add(a, b) {\n  return a + b;\n}\n```";
const outputPath = path.join(__dirname, 'test-output.js');

console.log('Testing file saving with markdown-formatted code');
console.log('Test code:', testCode);
console.log('Output path:', outputPath);

try {
  const result = saveToFile(testCode, outputPath);
  console.log('Result:', result);
  
  // Verify the file was created
  if (fs.existsSync(outputPath)) {
    const content = fs.readFileSync(outputPath, 'utf8');
    console.log('File created successfully!');
    console.log('File content:', content);
    console.log('File content length:', content.length);
  } else {
    console.error('ERROR: File was not created!');
  }
} catch (error) {
  console.error('Error saving file:', error);
}
