// Example of using yosi.js with advanced options

const { generateAdvancedCode } = require('../src/advanced-ai-handler');
const { saveToFile, displayCode } = require('../src/output-handler');

async function advancedExample() {
  try {
    // Example 1: Generate a React component with existing code
    const existingCode = `
import React from 'react';

// This is the start of our component
function UserProfile() {
  // TODO: Implement user profile component
}
`;

    console.log('Example 1: Extending existing React component');
    
    const reactCode = await generateAdvancedCode({
      command: "complete this UserProfile component to display user's name, email, and avatar",
      language: "jsx",
      framework: "react",
      existingCode: existingCode,
      includeComments: true
    });
    
    displayCode(reactCode, "jsx");
    saveToFile(reactCode, 'UserProfile.jsx');
    console.log('React component saved to UserProfile.jsx\n');

    // Example 2: Generate an Express.js API endpoint
    console.log('Example 2: Generating Express.js API endpoint');
    
    const expressCode = await generateAdvancedCode({
      command: "create an API endpoint for user authentication with login and signup",
      language: "javascript",
      framework: "express",
      includeComments: true
    });
    
    displayCode(expressCode, "javascript");
    saveToFile(expressCode, 'auth-routes.js');
    console.log('Express.js code saved to auth-routes.js');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

advancedExample();
