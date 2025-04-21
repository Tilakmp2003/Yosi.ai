# yosi.js API Reference

This document provides detailed information about the yosi.js API for programmatic usage.

## Table of Contents

- [AI Handlers](#ai-handlers)
  - [generateCode](#generatecode)
  - [generateAdvancedCode](#generateadvancedcode)
- [Output Handlers](#output-handlers)
  - [displayCode](#displaycode)
  - [saveToFile](#savetofile)
- [Project Scaffolding](#project-scaffolding)
  - [scaffoldProject](#scaffoldproject)
- [Code Refactoring](#code-refactoring)
  - [refactorCode](#refactorcode)
  - [analyzeCode](#analyzecode)
  - [convertCode](#convertcode)
- [Test Generation](#test-generation)
  - [generateTests](#generatetests)
  - [generateTestSuite](#generatetestsuite)

## AI Handlers

### getAvailableModels

Returns the available AI models that can be used for code generation.

```javascript
const { getAvailableModels } = require('yosi');

function example() {
  const models = getAvailableModels();
  console.log(models);
}
```

**Returns:**
- Object: Available models with their details

**Example:**
```javascript
const models = getAvailableModels();
// Returns: { 'gemini-pro': { name: 'Gemini Pro', ... }, ... }
```

### generateCode

Generates code using Google's Gemini API based on a natural language command.

```javascript
const { generateCode } = require('yosi');

async function example() {
  const code = await generateCode(command, language, model);
  console.log(code);
}
```

**Parameters:**
- `command` (string): The natural language command to generate code
- `language` (string, optional): The programming language to generate code in (default: 'javascript')
- `model` (string, optional): The AI model to use (default: 'gemini-2.5-flash-preview-04-17')

**Returns:**
- Promise<string>: The generated code

**Example:**
```javascript
const code = await generateCode('create a function that calculates factorial', 'javascript'); // Uses default model: gemini-2.5-flash-preview-04-17
```

### generateAdvancedCode

Generates code with more context and options.

```javascript
const { generateAdvancedCode } = require('yosi');

async function example() {
  const code = await generateAdvancedCode(options);
  console.log(code);
}
```

**Parameters:**
- `options` (object): Options for code generation
  - `command` (string): The natural language command to generate code
  - `language` (string, optional): The programming language to generate code in (default: 'javascript')
  - `framework` (string, optional): Framework context (e.g., 'react', 'express')
  - `existingCode` (string, optional): Existing code to extend or modify
  - `includeComments` (boolean, optional): Whether to include comments in the generated code
  - `model` (string, optional): The AI model to use (default: 'gemini-2.5-flash-preview-04-17')

**Returns:**
- Promise<string>: The generated code

**Example:**
```javascript
const code = await generateAdvancedCode({
  command: 'create a Button component with primary and secondary variants',
  language: 'jsx',
  framework: 'react',
  includeComments: true,
  // model parameter is optional, defaults to 'gemini-2.5-flash-preview-04-17'
});
```

## Output Handlers

### displayCode

Displays the generated code in the console with syntax highlighting.

```javascript
const { displayCode } = require('yosi');

function example(code, language) {
  displayCode(code, language);
}
```

**Parameters:**
- `code` (string): The generated code
- `language` (string): The programming language of the code

**Example:**
```javascript
displayCode('function hello() { return "Hello"; }', 'javascript');
```

### saveToFile

Saves the generated code to a file.

```javascript
const { saveToFile } = require('yosi');

function example(code, filePath) {
  saveToFile(code, filePath);
}
```

**Parameters:**
- `code` (string): The generated code
- `filePath` (string): The path to save the file

**Example:**
```javascript
saveToFile('function hello() { return "Hello"; }', 'hello.js');
```

## Project Scaffolding

### scaffoldProject

Scaffolds a project based on a template and user input.

```javascript
const { scaffoldProject } = require('yosi');

async function example() {
  const projectDir = await scaffoldProject(options);
  console.log(`Project created at: ${projectDir}`);
}
```

**Parameters:**
- `options` (object): Options for project scaffolding
  - `projectName` (string): The name of the project
  - `projectType` (string): The type of project (e.g., 'react', 'express', 'fullstack')
  - `description` (string): A description of the project
  - `outputDir` (string, optional): The directory to output the project

**Returns:**
- Promise<string>: The path to the scaffolded project

**Example:**
```javascript
const projectDir = await scaffoldProject({
  projectName: 'my-app',
  projectType: 'react',
  description: 'A React application',
  outputDir: './projects'
});
```

## Code Refactoring

### refactorCode

Refactors code based on a refactoring command.

```javascript
const { refactorCode } = require('yosi');

async function example() {
  const refactoredCode = await refactorCode(options);
  console.log(refactoredCode);
}
```

**Parameters:**
- `options` (object): Options for code refactoring
  - `filePath` (string): The path to the file to refactor
  - `command` (string): The refactoring command (e.g., 'optimize', 'add comments', 'convert to ES6')
  - `outputPath` (string, optional): The path to save the refactored code

**Returns:**
- Promise<string>: The refactored code

**Example:**
```javascript
const refactoredCode = await refactorCode({
  filePath: 'src/utils.js',
  command: 'convert to ES6',
  outputPath: 'src/utils.es6.js'
});
```

### analyzeCode

Analyzes code and provides suggestions for improvement.

```javascript
const { analyzeCode } = require('yosi');

async function example() {
  const analysis = await analyzeCode(filePath);
  console.log(analysis);
}
```

**Parameters:**
- `filePath` (string): The path to the file to analyze

**Returns:**
- Promise<string>: Analysis results and suggestions

**Example:**
```javascript
const analysis = await analyzeCode('src/utils.js');
```

### convertCode

Converts code from one language to another.

```javascript
const { convertCode } = require('yosi');

async function example() {
  const convertedCode = await convertCode(options);
  console.log(convertedCode);
}
```

**Parameters:**
- `options` (object): Options for code conversion
  - `filePath` (string): The path to the file to convert
  - `targetLanguage` (string): The target programming language
  - `outputPath` (string): The path to save the converted code

**Returns:**
- Promise<string>: The converted code

**Example:**
```javascript
const convertedCode = await convertCode({
  filePath: 'src/utils.js',
  targetLanguage: 'python',
  outputPath: 'src/utils.py'
});
```

## Test Generation

### generateTests

Generates tests for a given file.

```javascript
const { generateTests } = require('yosi');

async function example() {
  const testCode = await generateTests(options);
  console.log(testCode);
}
```

**Parameters:**
- `options` (object): Options for test generation
  - `filePath` (string): The path to the file to generate tests for
  - `testFramework` (string, optional): The test framework to use (default: 'jest')
  - `outputPath` (string, optional): The path to save the generated tests

**Returns:**
- Promise<string>: The generated test code

**Example:**
```javascript
const testCode = await generateTests({
  filePath: 'src/utils.js',
  testFramework: 'jest',
  outputPath: 'src/utils.test.js'
});
```

### generateTestSuite

Generates a test suite for a directory of files.

```javascript
const { generateTestSuite } = require('yosi');

async function example() {
  const testFiles = await generateTestSuite(options);
  console.log(`Generated ${testFiles.length} test files`);
}
```

**Parameters:**
- `options` (object): Options for test suite generation
  - `directory` (string): The directory containing files to generate tests for
  - `testFramework` (string, optional): The test framework to use (default: 'jest')
  - `outputDirectory` (string, optional): The directory to save the generated tests
  - `extensions` (string[], optional): File extensions to include (default: ['.js', '.jsx'])

**Returns:**
- Promise<string[]>: Paths to the generated test files

**Example:**
```javascript
const testFiles = await generateTestSuite({
  directory: 'src/components',
  testFramework: 'jest',
  outputDirectory: 'tests/components',
  extensions: ['.js', '.jsx']
});
```
