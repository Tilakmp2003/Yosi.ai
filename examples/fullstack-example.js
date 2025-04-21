// Example of using yosi.js to generate a full-stack application

const { generateAdvancedCode } = require('../src/advanced-ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');
const fs = require('fs');
const path = require('path');

async function generateFullStackExample() {
  try {
    console.log('Generating a simple full-stack Todo application...');
    
    // Create output directory
    const outputDir = path.join(__dirname, 'todo-app');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
      fs.mkdirSync(path.join(outputDir, 'backend'));
      fs.mkdirSync(path.join(outputDir, 'frontend'));
    }
    
    // Generate backend code (Express.js)
    console.log('\nGenerating backend code...');
    const backendCode = await generateAdvancedCode({
      command: "create an Express.js API for a Todo application with routes for getting all todos, adding a new todo, updating a todo's status, and deleting a todo",
      language: "javascript",
      framework: "express",
      includeComments: true
    });
    
    // Save backend code
    const backendPath = path.join(outputDir, 'backend', 'server.js');
    saveToFile(backendCode, backendPath);
    console.log(`Backend code saved to ${backendPath}`);
    
    // Generate frontend code (React)
    console.log('\nGenerating frontend code...');
    const frontendCode = await generateAdvancedCode({
      command: "create a React Todo application with components for displaying the todo list, adding new todos, and toggling todo completion status",
      language: "jsx",
      framework: "react",
      includeComments: true
    });
    
    // Save frontend code
    const frontendPath = path.join(outputDir, 'frontend', 'App.jsx');
    saveToFile(frontendCode, frontendPath);
    console.log(`Frontend code saved to ${frontendPath}`);
    
    // Generate README
    console.log('\nGenerating README...');
    const readmeCode = await generateAdvancedCode({
      command: "create a README.md file for a full-stack Todo application with instructions on how to run the backend and frontend",
      language: "markdown",
      includeComments: false
    });
    
    // Save README
    const readmePath = path.join(outputDir, 'README.md');
    saveToFile(readmeCode, readmePath);
    console.log(`README saved to ${readmePath}`);
    
    console.log('\nFull-stack Todo application generated successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

generateFullStackExample();
