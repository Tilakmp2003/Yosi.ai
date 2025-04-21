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

    // Remove markdown code block markers if present
    cleanedCode = cleanedCode.replace(/^```[a-z]*\n/g, '');
    cleanedCode = cleanedCode.replace(/\n```$/g, '');

    // Remove any nested code blocks (sometimes the AI generates nested markdown)
    cleanedCode = cleanedCode.replace(/```[a-z]*\n([\s\S]*?)\n```/g, '$1');

    console.log('Cleaned code starts with:', cleanedCode.substring(0, 30));
    console.log('Cleaned code length:', cleanedCode.length);

    // Write the cleaned code to the file
    fs.writeFileSync(filePath, cleanedCode);
    console.log('File written successfully');

    // Return success message
    return `Code saved to ${filePath}`;
  } catch (error) {
    throw new Error(`Failed to save file: ${error.message}`);
  }
}

module.exports = {
  displayCode,
  saveToFile
};
