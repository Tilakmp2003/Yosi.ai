# API Usage Guide for yosi.js

This guide explains how to use yosi.js programmatically in your Node.js applications.

## Table of Contents

- [Installation](#installation)
- [Basic Code Generation](#basic-code-generation)
- [Advanced Code Generation](#advanced-code-generation)
- [Modifying Existing Code](#modifying-existing-code)
- [Code Analysis](#code-analysis)
- [Project Scaffolding](#project-scaffolding)
- [Test Generation](#test-generation)

## Installation

```bash
npm install yosi
```

## Basic Code Generation

```javascript
const { generateCode } = require('yosi');
const { saveToFile, displayCode } = require('yosi/src/output-handler');

async function generateSimpleCode() {
  try {
    // Generate a simple function
    const command = "create a function that calculates the factorial of a number";
    const language = "javascript";
    
    const generatedCode = await generateCode(command, language);
    
    // Display the generated code
    displayCode(generatedCode, language);
    
    // Save the generated code to a file
    saveToFile(generatedCode, 'factorial.js');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable
generateSimpleCode();
```

## Advanced Code Generation

```javascript
const { generateAdvancedCode } = require('yosi/src/advanced-ai-handler');
const { saveToFile } = require('yosi/src/output-handler');

async function generateAdvancedExample() {
  try {
    // Generate a React component
    const reactCode = await generateAdvancedCode({
      command: "create a Button component with primary and secondary variants",
      language: "jsx",
      framework: "react",
      includeComments: true,
      model: "gemini-2.5-flash-preview-04-17" // Optional: specify the model
    });
    
    saveToFile(reactCode, 'Button.jsx');
    
    // Generate code with existing code as a base
    const existingCode = `
function UserProfile() {
  // TODO: Implement user profile
}
`;
    
    const extendedCode = await generateAdvancedCode({
      command: "complete this UserProfile component to display user's name, email, and avatar",
      language: "jsx",
      framework: "react",
      existingCode: existingCode,
      includeComments: true
    });
    
    saveToFile(extendedCode, 'UserProfile.jsx');
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Modifying Existing Code

yosi.js provides powerful capabilities for modifying existing code through its refactoring API.

### Basic Code Modification

```javascript
const { refactorCode } = require('yosi/src/refactor');

async function modifyExistingCode() {
  try {
    // Refactor a file to ES6 syntax
    const refactoredCode = await refactorCode({
      filePath: 'src/utils.js',
      command: 'convert to ES6',
      outputPath: 'src/utils.es6.js'
    });
    
    console.log('Code refactored successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### Targeted Code Modification

You can target specific sections of code for modification:

```javascript
const { refactorCode } = require('yosi/src/refactor');

async function targetedCodeModification() {
  try {
    // Add error handling to a specific function
    await refactorCode({
      filePath: 'src/auth.js',
      command: 'add error handling',
      outputPath: 'src/auth.improved.js',
      targetSection: 'authenticateUser',  // Target a specific function
      preserveStructure: true             // Preserve the overall code structure
    });
    
    console.log('Function updated with error handling!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### Complete Code Rewrite

For more extensive changes, you can disable structure preservation:

```javascript
const { refactorCode } = require('yosi/src/refactor');

async function completeCodeRewrite() {
  try {
    // Completely modernize a legacy file
    await refactorCode({
      filePath: 'src/legacy.js',
      command: 'modernize with ES6+ features, promises, and async/await',
      outputPath: 'src/modern.js',
      preserveStructure: false  // Allow complete rewrite
    });
    
    console.log('Code completely modernized!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Code Analysis

```javascript
const { analyzeCode } = require('yosi/src/refactor');

async function analyzeMyCode() {
  try {
    // Analyze a file for potential improvements
    const analysis = await analyzeCode('src/utils.js');
    
    console.log('Code Analysis:');
    console.log(analysis);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Project Scaffolding

```javascript
const { scaffoldProject } = require('yosi/src/scaffold');

async function createProject() {
  try {
    // Scaffold a React project
    const projectDir = await scaffoldProject({
      projectName: 'my-app',
      projectType: 'react',
      description: 'A sample React application',
      outputDir: './projects'
    });
    
    console.log(`Project created at: ${projectDir}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Test Generation

```javascript
const { generateTests, generateTestSuite } = require('yosi/src/test-generator');

async function generateMyTests() {
  try {
    // Generate tests for a single file
    await generateTests({
      filePath: 'src/utils.js',
      testFramework: 'jest',
      outputPath: 'tests/utils.test.js'
    });
    
    // Generate tests for a directory
    const testFiles = await generateTestSuite({
      directory: 'src/components',
      testFramework: 'jest',
      outputDirectory: 'tests/components',
      extensions: ['.js', '.jsx']
    });
    
    console.log(`Generated ${testFiles.length} test files`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Error Handling

Always wrap your API calls in try-catch blocks to handle potential errors:

```javascript
try {
  const result = await refactorCode({
    filePath: 'src/utils.js',
    command: 'optimize',
    outputPath: 'src/utils.optimized.js'
  });
  
  console.log('Success!');
} catch (error) {
  console.error('Error:', error.message);
  
  // Check for specific error types
  if (error.message.includes('API key')) {
    console.error('Please check your Gemini API key');
  } else if (error.message.includes('File not found')) {
    console.error('The specified file does not exist');
  }
}
```
