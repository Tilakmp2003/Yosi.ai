// Advanced example of using yosi.js API to modify existing code

const { refactorCode, analyzeCode } = require('../src/refactor');
const { generateAdvancedCode } = require('../src/advanced-ai-handler');
const fs = require('fs');
const path = require('path');

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

async function advancedCodeModification() {
  try {
    // Create a sample file to work with
    const sampleCode = `
// User authentication function
function authenticateUser(username, password) {
  // Check if username and password are provided
  if (username && password) {
    // In a real app, this would check against a database
    if (username === 'admin' && password === 'password123') {
      return { success: true, user: { username, role: 'admin' } };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  } else {
    return { success: false, message: 'Username and password are required' };
  }
}

// User registration function
function registerUser(username, password, email) {
  // In a real app, this would save to a database
  return { success: true, message: 'User registered successfully' };
}

module.exports = {
  authenticateUser,
  registerUser
};`;

    const sampleFilePath = path.join(__dirname, '../test/auth.js');
    fs.writeFileSync(sampleFilePath, sampleCode);
    
    console.log('Created sample file with authentication code.');
    
    // Example 1: Analyze the code first
    console.log('\n--- Example 1: Analyzing the code ---');
    const analysis = await analyzeCode(sampleFilePath);
    console.log('Code Analysis:');
    console.log(analysis);
    
    // Example 2: Add input validation to a specific function
    console.log('\n--- Example 2: Adding input validation to a specific function ---');
    const validatedCodePath = path.join(__dirname, '../test/auth.validated.js');
    
    await refactorCode({
      filePath: sampleFilePath,
      command: 'add input validation',
      outputPath: validatedCodePath,
      targetSection: 'registerUser',
      preserveStructure: true
    });
    
    console.log('Code with added input validation:');
    console.log(fs.readFileSync(validatedCodePath, 'utf8'));
    
    // Example 3: Add error handling to the entire file
    console.log('\n--- Example 3: Adding error handling to the entire file ---');
    const errorHandledCodePath = path.join(__dirname, '../test/auth.error-handled.js');
    
    await refactorCode({
      filePath: sampleFilePath,
      command: 'add try-catch error handling',
      outputPath: errorHandledCodePath,
      preserveStructure: true
    });
    
    console.log('Code with added error handling:');
    console.log(fs.readFileSync(errorHandledCodePath, 'utf8'));
    
    // Example 4: Convert to ES6 syntax without preserving structure (complete rewrite)
    console.log('\n--- Example 4: Converting to ES6 without preserving structure ---');
    const es6CodePath = path.join(__dirname, '../test/auth.es6.js');
    
    await refactorCode({
      filePath: sampleFilePath,
      command: 'convert to modern ES6 with arrow functions and promises',
      outputPath: es6CodePath,
      preserveStructure: false
    });
    
    console.log('Code converted to ES6 (complete rewrite):');
    console.log(fs.readFileSync(es6CodePath, 'utf8'));
    
    // Example 5: Using the advanced-ai-handler directly for more control
    console.log('\n--- Example 5: Using advanced-ai-handler directly ---');
    const customCodePath = path.join(__dirname, '../test/auth.custom.js');
    
    const existingCode = fs.readFileSync(sampleFilePath, 'utf8');
    const customModifiedCode = await generateAdvancedCode({
      command: "Add JWT token generation to the authenticateUser function and return the token in the success response",
      language: "javascript",
      existingCode: existingCode,
      includeComments: true
    });
    
    // Clean up the code (remove markdown formatting if present)
    let cleanedCode = customModifiedCode;
    cleanedCode = cleanedCode.replace(/^```[a-z]*\n/g, '');
    cleanedCode = cleanedCode.replace(/\n```$/g, '');
    cleanedCode = cleanedCode.replace(/```[a-z]*\n([\s\S]*?)\n```/g, '$1');
    
    fs.writeFileSync(customCodePath, cleanedCode);
    
    console.log('Custom modified code with JWT token generation:');
    console.log(fs.readFileSync(customCodePath, 'utf8'));
    
    console.log('\nAll examples completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the examples
advancedCodeModification();
