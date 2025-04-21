const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Displays the generated code in the console with syntax highlighting
 * @param {string} code - The generated code
 * @param {string} language - The programming language of the code
 */
function displayCode(code, language) {
  console.log('\n' + chalk.green('Generated Code:') + '\n');
  console.log(chalk.yellow('```' + language));
  console.log(code);
  console.log(chalk.yellow('```') + '\n');
}

/**
 * Saves the generated code to a file
 * @param {string} code - The generated code
 * @param {string} filePath - The path to save the file
 */
function saveToFile(code, filePath) {
  try {
    console.log('Saving code to file:', filePath);
    console.log('Code length:', code.length);

    // Create directory if it doesn't exist
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Clean up the code - remove markdown formatting if present
    let cleanedCode = code;
    console.log('Original code starts with:', code.substring(0, 30));

    // More aggressive cleaning of markdown formatting
    // First, try to extract code from markdown blocks
    if (code.includes('```')) {
      console.log('Markdown code blocks detected, cleaning up...');

      // Handle double-nested code blocks (```javascript\n```javascript)
      const doubleNestedPattern = /```[a-z]*\n```[a-z]*\n([\s\S]*?)\n```\n```/g;
      if (doubleNestedPattern.test(code)) {
        console.log('Detected double-nested code blocks');
        cleanedCode = code.replace(doubleNestedPattern, '$1');
      }
      // Handle standard code blocks
      else if (/```[a-z]*\n([\s\S]*?)\n```/g.test(code)) {
        console.log('Detected standard code blocks');
        // Extract content from the first code block
        const match = /```[a-z]*\n([\s\S]*?)\n```/g.exec(code);
        if (match && match[1]) {
          cleanedCode = match[1];
        } else {
          // Fallback: just strip all markdown markers
          cleanedCode = code.replace(/```[a-z]*/g, '').replace(/```/g, '');
        }
      }
    }

    // Final cleanup to ensure no markdown remains
    cleanedCode = cleanedCode.trim();

    console.log('Cleaned code starts with:', cleanedCode.substring(0, 30));
    console.log('Cleaned code length:', cleanedCode.length);

    // Write the cleaned code to the file
    fs.writeFileSync(filePath, cleanedCode);
    console.log('File written successfully');

    // Return success message
    return `Code saved to ${filePath}`;
  } catch (error) {
    console.error('Error in saveToFile:', error);
    throw new Error(`Failed to save file: ${error.message}`);
  }
}

module.exports = {
  displayCode,
  saveToFile
};
