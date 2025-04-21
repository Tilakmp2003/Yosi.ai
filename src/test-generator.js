const fs = require('fs');
const path = require('path');
const { generateAdvancedCode } = require('./advanced-ai-handler');

/**
 * Generates tests for a given file
 * @param {Object} options - Options for test generation
 * @param {string} options.filePath - The path to the file to generate tests for
 * @param {string} options.testFramework - The test framework to use (e.g., 'jest', 'mocha', 'pytest')
 * @param {string} options.outputPath - The path to save the generated tests
 * @returns {Promise<string>} - The generated test code
 */
async function generateTests(options) {
  const { filePath, testFramework = 'jest', outputPath } = options;
  
  // Read the file
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileExtension = path.extname(filePath).slice(1);
  const language = mapExtensionToLanguage(fileExtension);
  const fileName = path.basename(filePath, path.extname(filePath));
  
  // Determine the test file extension
  const testFileExtension = getTestFileExtension(language, testFramework);
  
  // Generate test code
  const testCode = await generateAdvancedCode({
    command: `Generate comprehensive ${testFramework} tests for this ${language} code:\n`,
    language: language,
    framework: testFramework,
    existingCode: fileContent,
    includeComments: true
  });
  
  // Save the test code
  let testFilePath;
  if (outputPath) {
    testFilePath = outputPath;
  } else {
    const dir = path.dirname(filePath);
    testFilePath = path.join(dir, `${fileName}.test${testFileExtension}`);
  }
  
  fs.writeFileSync(testFilePath, testCode);
  
  return testCode;
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
    'rs': 'rust'
  };
  
  return extensionMap[extension.toLowerCase()] || 'text';
}

/**
 * Gets the appropriate file extension for test files based on language and framework
 * @param {string} language - The programming language
 * @param {string} framework - The test framework
 * @returns {string} - The file extension for test files
 */
function getTestFileExtension(language, framework) {
  if (language === 'python') {
    return '.py';
  }
  
  if (language === 'typescript' || language === 'tsx') {
    return '.ts';
  }
  
  return '.js';
}

/**
 * Generates a test suite for a directory of files
 * @param {Object} options - Options for test suite generation
 * @param {string} options.directory - The directory containing files to generate tests for
 * @param {string} options.testFramework - The test framework to use
 * @param {string} options.outputDirectory - The directory to save the generated tests
 * @param {string[]} options.extensions - File extensions to include (e.g., ['.js', '.jsx'])
 * @returns {Promise<string[]>} - Paths to the generated test files
 */
async function generateTestSuite(options) {
  const { directory, testFramework = 'jest', outputDirectory, extensions = ['.js', '.jsx'] } = options;
  
  // Check if directory exists
  if (!fs.existsSync(directory)) {
    throw new Error(`Directory not found: ${directory}`);
  }
  
  // Create output directory if it doesn't exist
  if (outputDirectory && !fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }
  
  // Get all files in the directory
  const files = fs.readdirSync(directory);
  const testFiles = [];
  
  // Generate tests for each file with matching extension
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && extensions.includes(path.extname(file))) {
      let outputPath;
      if (outputDirectory) {
        const fileName = path.basename(file, path.extname(file));
        const testFileExtension = getTestFileExtension(mapExtensionToLanguage(path.extname(file).slice(1)), testFramework);
        outputPath = path.join(outputDirectory, `${fileName}.test${testFileExtension}`);
      }
      
      await generateTests({
        filePath,
        testFramework,
        outputPath
      });
      
      testFiles.push(outputPath || filePath);
    }
  }
  
  return testFiles;
}

module.exports = {
  generateTests,
  generateTestSuite
};
