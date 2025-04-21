// Example of using yosi.js to generate tests

const { generateTests, generateTestSuite } = require('../src/test-generator');
const fs = require('fs');
const path = require('path');

// Create a sample file to generate tests for
const sampleCode = `
/**
 * A simple calculator class
 */
class Calculator {
  /**
   * Add two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum of a and b
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Subtract b from a
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Difference of a and b
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * Multiply two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Product of a and b
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * Divide a by b
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Quotient of a and b
   * @throws {Error} If b is zero
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}

module.exports = Calculator;
`;

async function testGenerationExample() {
  try {
    // Create a directory for the example
    const exampleDir = path.join(__dirname, 'output');
    if (!fs.existsSync(exampleDir)) {
      fs.mkdirSync(exampleDir, { recursive: true });
    }
    
    // Create a sample file
    const sampleFilePath = path.join(exampleDir, 'Calculator.js');
    fs.writeFileSync(sampleFilePath, sampleCode);
    
    console.log('Sample file created at:', sampleFilePath);
    
    // Generate tests for the file
    console.log('\nGenerating tests with Jest...');
    const jestTestPath = path.join(exampleDir, 'Calculator.test.js');
    await generateTests({
      filePath: sampleFilePath,
      testFramework: 'jest',
      outputPath: jestTestPath
    });
    
    const jestTests = fs.readFileSync(jestTestPath, 'utf8');
    console.log('Generated Jest tests:');
    console.log(jestTests);
    
    // Generate tests with Mocha
    console.log('\nGenerating tests with Mocha...');
    const mochaTestPath = path.join(exampleDir, 'Calculator.mocha.js');
    await generateTests({
      filePath: sampleFilePath,
      testFramework: 'mocha',
      outputPath: mochaTestPath
    });
    
    const mochaTests = fs.readFileSync(mochaTestPath, 'utf8');
    console.log('Generated Mocha tests:');
    console.log(mochaTests);
    
    // Create a directory with multiple files for test suite generation
    const multipleFilesDir = path.join(exampleDir, 'multiple-files');
    if (!fs.existsSync(multipleFilesDir)) {
      fs.mkdirSync(multipleFilesDir, { recursive: true });
    }
    
    // Create a few sample files
    fs.writeFileSync(path.join(multipleFilesDir, 'Calculator.js'), sampleCode);
    fs.writeFileSync(path.join(multipleFilesDir, 'StringUtils.js'), `
/**
 * String utility functions
 */
class StringUtils {
  /**
   * Reverses a string
   * @param {string} str - The string to reverse
   * @returns {string} The reversed string
   */
  static reverse(str) {
    return str.split('').reverse().join('');
  }

  /**
   * Checks if a string is a palindrome
   * @param {string} str - The string to check
   * @returns {boolean} True if the string is a palindrome, false otherwise
   */
  static isPalindrome(str) {
    const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normalized === this.reverse(normalized);
  }
}

module.exports = StringUtils;
`);
    
    // Generate a test suite
    console.log('\nGenerating a test suite for multiple files...');
    const testSuiteDir = path.join(exampleDir, 'tests');
    if (!fs.existsSync(testSuiteDir)) {
      fs.mkdirSync(testSuiteDir, { recursive: true });
    }
    
    const testFiles = await generateTestSuite({
      directory: multipleFilesDir,
      testFramework: 'jest',
      outputDirectory: testSuiteDir,
      extensions: ['.js']
    });
    
    console.log(`Generated ${testFiles.length} test files in ${testSuiteDir}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

testGenerationExample();
