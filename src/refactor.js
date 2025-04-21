const fs = require('fs');
const path = require('path');
const { generateAdvancedCode } = require('./advanced-ai-handler');

/**
 * Refactors code based on a refactoring command
 * @param {Object} options - Options for code refactoring
 * @param {string} options.filePath - The path to the file to refactor
 * @param {string} options.command - The refactoring command (e.g., 'optimize', 'add comments', 'convert to ES6')
 * @param {string} options.outputPath - The path to save the refactored code (optional, defaults to overwriting the original file)
 * @returns {Promise<string>} - The refactored code
 */
async function refactorCode(options) {
  const { filePath, command, outputPath } = options;
  
  // Read the file
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileExtension = path.extname(filePath).slice(1);
  const language = mapExtensionToLanguage(fileExtension);
  
  // Generate refactored code
  const refactoredCode = await generateAdvancedCode({
    command: `Refactor this code to ${command}:\n`,
    language,
    existingCode: fileContent,
    includeComments: true
  });
  
  // Save the refactored code
  const outputFilePath = outputPath || filePath;
  fs.writeFileSync(outputFilePath, refactoredCode);
  
  return refactoredCode;
}

/**
 * Maps file extensions to programming languages
 * @param {string} extension - The file extension
 * @returns {string} - The programming language
 */
function mapExtensionToLanguage(extension) {
  const extensionMap = {
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'py': 'python',
    'java': 'java',
    'rb': 'ruby',
    'php': 'php',
    'go': 'go',
    'cs': 'csharp',
    'c': 'c',
    'cpp': 'cpp',
    'swift': 'swift',
    'kt': 'kotlin',
    'rs': 'rust',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'json': 'json',
    'md': 'markdown',
    'vue': 'vue'
  };
  
  return extensionMap[extension.toLowerCase()] || 'text';
}

/**
 * Analyzes code and provides suggestions for improvement
 * @param {string} filePath - The path to the file to analyze
 * @returns {Promise<string>} - Analysis results and suggestions
 */
async function analyzeCode(filePath) {
  // Read the file
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileExtension = path.extname(filePath).slice(1);
  const language = mapExtensionToLanguage(fileExtension);
  
  // Generate analysis
  const analysis = await generateAdvancedCode({
    command: `Analyze this code and provide suggestions for improvement, potential bugs, and best practices:\n`,
    language,
    existingCode: fileContent,
    includeComments: true
  });
  
  return analysis;
}

/**
 * Converts code from one language to another
 * @param {Object} options - Options for code conversion
 * @param {string} options.filePath - The path to the file to convert
 * @param {string} options.targetLanguage - The target programming language
 * @param {string} options.outputPath - The path to save the converted code
 * @returns {Promise<string>} - The converted code
 */
async function convertCode(options) {
  const { filePath, targetLanguage, outputPath } = options;
  
  // Read the file
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileExtension = path.extname(filePath).slice(1);
  const sourceLanguage = mapExtensionToLanguage(fileExtension);
  
  // Generate converted code
  const convertedCode = await generateAdvancedCode({
    command: `Convert this ${sourceLanguage} code to ${targetLanguage}:\n`,
    language: targetLanguage,
    existingCode: fileContent,
    includeComments: true
  });
  
  // Save the converted code
  if (outputPath) {
    fs.writeFileSync(outputPath, convertedCode);
  }
  
  return convertedCode;
}

module.exports = {
  refactorCode,
  analyzeCode,
  convertCode
};
