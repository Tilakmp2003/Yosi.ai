#!/usr/bin/env node

const { program } = require('commander');
const { generateCode, getAvailableModels } = require('./src/ai-handler');
const { generateAdvancedCode } = require('./src/advanced-ai-handler');
const { saveToFile, displayCode } = require('./src/output-handler');
const { scaffoldProject } = require('./src/scaffold');
const { refactorCode, analyzeCode, convertCode } = require('./src/refactor');
const { generateTests, generateTestSuite } = require('./src/test-generator');
const { version } = require('./package.json');

// Get available models
const MODELS = getAvailableModels();
const MODEL_CHOICES = Object.keys(MODELS);

// Main command for basic code generation
program
  .version(version)
  .description('yosi.js - AI-powered code generation tool')
  .option('-l, --language <language>', 'Programming language for the generated code', 'javascript')
  .option('-m, --model <model>', `AI model to use (${MODEL_CHOICES.join(', ')})`, 'gemini-2.5-flash-preview-04-17')
  .option('-o, --output <file>', 'Save the generated code to a file')
  .option('-v, --verbose', 'Show detailed output')
  .argument('<command>', 'Natural language command to generate code')
  .action(async (command, options) => {
    try {
      if (options.verbose) {
        console.log('Generating code for:', command);
        console.log('Language:', options.language);
        console.log('Model:', options.model);
        if (options.output) console.log('Output file:', options.output);
      }

      const generatedCode = await generateCode(command, options.language, options.model);

      if (options.output) {
        const message = saveToFile(generatedCode, options.output);
        console.log(message);
      } else {
        displayCode(generatedCode, options.language);
      }
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Advanced command for more complex code generation
program
  .command('advanced')
  .description('Generate code with advanced options')
  .option('-l, --language <language>', 'Programming language for the generated code', 'javascript')
  .option('-f, --framework <framework>', 'Framework to use (e.g., react, express)')
  .option('-e, --existing <file>', 'File with existing code to extend or modify')
  .option('-c, --comments', 'Include comments in the generated code')
  .option('-m, --model <model>', `AI model to use (${MODEL_CHOICES.join(', ')})`, 'gemini-2.5-flash-preview-04-17')
  .option('-o, --output <file>', 'Save the generated code to a file') // Add this line
  .option('-v, --verbose', 'Show detailed output')
  .argument('<command>', 'Natural language command to generate code')
  .action(async (command, options) => {
    try {
      let existingCode = '';
      if (options.existing) {
        try {
          const fs = require('fs');
          existingCode = fs.readFileSync(options.existing, 'utf8');
        } catch (err) {
          console.error(`Error reading existing code file: ${err.message}`);
          process.exit(1);
        }
      }

      // Manually parse for the output file flag as a workaround
      let outputFile = options.output; // Start with Commander's parsed value (likely undefined)
      const outputIndex = process.argv.indexOf('-o');
      const outputLongIndex = process.argv.indexOf('--output');

      if (outputIndex > -1 && outputIndex + 1 < process.argv.length) {
        outputFile = process.argv[outputIndex + 1];
      } else if (outputLongIndex > -1 && outputLongIndex + 1 < process.argv.length) {
        outputFile = process.argv[outputLongIndex + 1];
      }


      if (options.verbose) {
        console.log('Generating advanced code for:', command);
        console.log('Language:', options.language);
        console.log('Model:', options.model);
        if (options.framework) console.log('Framework:', options.framework);
        if (options.existing) console.log('Extending existing code from:', options.existing);
        if (options.comments) console.log('Including comments in the generated code');
        if (outputFile) console.log('Output file:', outputFile); // Use outputFile here
      }

      const generatedCode = await generateAdvancedCode({
        command,
        language: options.language,
        framework: options.framework,
        existingCode,
        includeComments: options.comments,
        model: options.model
      });

      // Always display the code first
      displayCode(generatedCode, options.language);

      // Use the manually determined outputFile for saving
      if (outputFile) {
        console.log('\nAttempting to save code to:', outputFile); // Use outputFile here
        try {
          // Log the first 100 characters of the code for debugging
          console.log('Code preview (first 100 chars):', generatedCode.substring(0, 100));

          // Check if code contains markdown formatting
          if (generatedCode.includes('```')) {
            console.log('Warning: Code contains markdown formatting, attempting to clean...');
          }

          // Force synchronous execution and error handling
          try {
            const message = saveToFile(generatedCode, outputFile); // Use outputFile here
            console.log(message);

            // Verify the file was created
            const fs = require('fs');
            if (fs.existsSync(outputFile)) { // Use outputFile here
              console.log('File verified to exist at:', outputFile); // Use outputFile here
              console.log('File content length:', fs.readFileSync(outputFile, 'utf8').length); // Use outputFile here
            } else {
              console.error('ERROR: File was not created despite no errors!');
            }
          } catch (innerError) {
            console.error('Inner error in file saving:', innerError);
            console.error('Stack trace:', innerError.stack);
          }
        } catch (saveError) {
          console.error('Error saving file:', saveError.message);
          console.error('Error details:', saveError.stack);
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Scaffold command for project scaffolding
program
  .command('scaffold')
  .description('Scaffold a new project')
  .option('-n, --name <name>', 'Project name')
  .option('-t, --type <type>', 'Project type (react, express, fullstack)', 'react')
  .option('-d, --description <description>', 'Project description', 'A new project')
  .option('-o, --output <directory>', 'Output directory')
  .action(async (options) => {
    try {
      const projectDir = await scaffoldProject({
        projectName: options.name,
        projectType: options.type,
        description: options.description,
        outputDir: options.output
      });

      console.log(`Project scaffolded successfully at ${projectDir}`);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Refactor command for code refactoring
program
  .command('refactor')
  .description('Refactor existing code')
  .option('-f, --file <file>', 'File to refactor')
  .option('-o, --output <file>', 'Output file (defaults to overwriting the input file)')
  .option('-t, --target <section>', 'Target specific section/function/class to refactor')
  .option('-p, --preserve-structure', 'Preserve the overall code structure', true)
  .option('-v, --verbose', 'Show detailed output')
  .argument('<command>', 'Refactoring command (e.g., "optimize", "add comments", "convert to ES6")')
  .action(async (command, options) => {
    try {
      if (!options.file) {
        console.error('Error: File path is required');
        process.exit(1);
      }

      if (options.verbose) {
        console.log('Refactoring code in:', options.file);
        console.log('Refactoring command:', command);
        if (options.target) console.log('Target section:', options.target);
        console.log('Preserving structure:', options.preserveStructure ? 'Yes' : 'No');
        if (options.output) console.log('Output file:', options.output);
      }

      // Make sure output path is correctly passed
      const outputPath = options.output || options.file;

      if (options.verbose) {
        console.log('Output will be saved to:', outputPath);
        console.log('options.output:', options.output);
      }

      const refactoredCode = await refactorCode({
        filePath: options.file,
        command,
        outputPath,
        targetSection: options.target,
        preserveStructure: options.preserveStructure
      });

      console.log(`Code refactored successfully${options.output ? ` and saved to ${options.output}` : ''}`);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Analyze command for code analysis
program
  .command('analyze')
  .description('Analyze code and provide suggestions')
  .argument('<file>', 'File to analyze')
  .action(async (file) => {
    try {
      const analysis = await analyzeCode(file);

      console.log('\nCode Analysis:\n');
      console.log(analysis);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Convert command for code conversion
program
  .command('convert')
  .description('Convert code from one language to another')
  .option('-f, --file <file>', 'File to convert')
  .option('-t, --to <language>', 'Target language')
  .option('-o, --output <file>', 'Output file')
  .action(async (options) => {
    try {
      if (!options.file) {
        console.error('Error: File path is required');
        process.exit(1);
      }

      if (!options.to) {
        console.error('Error: Target language is required');
        process.exit(1);
      }

      if (!options.output) {
        console.error('Error: Output file is required');
        process.exit(1);
      }

      const convertedCode = await convertCode({
        filePath: options.file,
        targetLanguage: options.to,
        outputPath: options.output
      });

      console.log(`Code converted successfully and saved to ${options.output}`);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Test command for generating tests
program
  .command('test')
  .description('Generate tests for a file or directory')
  .option('-f, --file <file>', 'File to generate tests for')
  .option('-d, --directory <directory>', 'Directory to generate tests for')
  .option('-t, --framework <framework>', 'Test framework to use', 'jest')
  .option('-o, --output <output>', 'Output file or directory')
  .action(async (options) => {
    try {
      if (options.file) {
        // Generate tests for a single file
        await generateTests({
          filePath: options.file,
          testFramework: options.framework,
          outputPath: options.output
        });

        console.log(`Tests generated successfully${options.output ? ` and saved to ${options.output}` : ''}`);
      } else if (options.directory) {
        // Generate tests for a directory
        const testFiles = await generateTestSuite({
          directory: options.directory,
          testFramework: options.framework,
          outputDirectory: options.output,
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        });

        console.log(`Tests generated successfully for ${testFiles.length} files`);
      } else {
        console.error('Error: Either file or directory is required');
        process.exit(1);
      }
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
