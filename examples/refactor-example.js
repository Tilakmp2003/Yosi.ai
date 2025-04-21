// Example of using yosi.js to refactor code

const { refactorCode, analyzeCode, convertCode } = require('../src/refactor');
const fs = require('fs');
const path = require('path');

// Create a sample file to refactor
const sampleCode = `
// This is a simple function
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}

// This is another function
function applyDiscount(total, discountPercent) {
  var discount = total * (discountPercent / 100);
  return total - discount;
}
`;

async function refactorExample() {
  try {
    // Create a directory for the example
    const exampleDir = path.join(__dirname, 'output');
    if (!fs.existsSync(exampleDir)) {
      fs.mkdirSync(exampleDir, { recursive: true });
    }
    
    // Create a sample file
    const sampleFilePath = path.join(exampleDir, 'sample.js');
    fs.writeFileSync(sampleFilePath, sampleCode);
    
    console.log('Sample file created at:', sampleFilePath);
    console.log('Original code:');
    console.log(sampleCode);
    
    // Analyze the code
    console.log('\nAnalyzing code...');
    const analysis = await analyzeCode(sampleFilePath);
    console.log('Analysis result:');
    console.log(analysis);
    
    // Refactor the code to ES6
    console.log('\nRefactoring code to ES6...');
    const refactoredFilePath = path.join(exampleDir, 'refactored.js');
    await refactorCode({
      filePath: sampleFilePath,
      command: 'convert to ES6 with arrow functions and const/let',
      outputPath: refactoredFilePath
    });
    
    const refactoredCode = fs.readFileSync(refactoredFilePath, 'utf8');
    console.log('Refactored code:');
    console.log(refactoredCode);
    
    // Convert the code to TypeScript
    console.log('\nConverting code to TypeScript...');
    const tsFilePath = path.join(exampleDir, 'converted.ts');
    await convertCode({
      filePath: sampleFilePath,
      targetLanguage: 'typescript',
      outputPath: tsFilePath
    });
    
    const tsCode = fs.readFileSync(tsFilePath, 'utf8');
    console.log('TypeScript code:');
    console.log(tsCode);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

refactorExample();
