# Advanced Features of yosi.js

This guide covers the advanced features of yosi.js, including project scaffolding, code refactoring, and test generation.

## Table of Contents

- [Project Scaffolding](#project-scaffolding)
- [Code Refactoring](#code-refactoring)
- [Code Analysis](#code-analysis)
- [Code Conversion](#code-conversion)
- [Test Generation](#test-generation)

## Project Scaffolding

yosi.js can scaffold entire projects with a single command:

```bash
yosi scaffold --name my-project --type react --description "My awesome project" --output ./projects
```

### Supported Project Types

- `react`: Scaffolds a React project with components, pages, and configuration
- `express`: Scaffolds an Express.js API with routes, controllers, and middleware
- `fullstack`: Scaffolds a full-stack application with React frontend and Express backend

### Example

```bash
# Scaffold a React project
yosi scaffold --name my-react-app --type react

# Scaffold an Express.js API
yosi scaffold --name my-api --type express

# Scaffold a full-stack application
yosi scaffold --name my-fullstack-app --type fullstack
```

### Programmatic Usage

```javascript
const { scaffoldProject } = require('yosi');

async function createProject() {
  const projectDir = await scaffoldProject({
    projectName: 'my-project',
    projectType: 'react',
    description: 'A sample React application',
    outputDir: './projects'
  });
  
  console.log(`Project created at: ${projectDir}`);
}
```

## Code Refactoring

yosi.js can refactor existing code to improve it or change its style:

```bash
yosi refactor --file path/to/file.js "convert to ES6" --output path/to/output.js
```

### Common Refactoring Commands

- `"optimize"`: Optimize code for performance and readability
- `"add comments"`: Add comprehensive comments to the code
- `"convert to ES6"`: Convert JavaScript code to ES6 syntax
- `"add error handling"`: Add error handling to the code
- `"improve naming"`: Improve variable and function names

### Example

```bash
# Refactor a file to ES6 syntax
yosi refactor --file src/utils.js "convert to ES6" --output src/utils.es6.js

# Optimize a file (overwrites the original)
yosi refactor --file src/app.js "optimize"

# Add comments to a file
yosi refactor --file src/components/Button.jsx "add comments" --output src/components/Button.commented.jsx
```

### Programmatic Usage

```javascript
const { refactorCode } = require('yosi');

async function refactorMyCode() {
  const refactoredCode = await refactorCode({
    filePath: 'src/utils.js',
    command: 'convert to ES6',
    outputPath: 'src/utils.es6.js'
  });
}
```

## Code Analysis

yosi.js can analyze code and provide suggestions for improvement:

```bash
yosi analyze path/to/file.js
```

### Example

```bash
# Analyze a JavaScript file
yosi analyze src/utils.js

# Analyze a React component
yosi analyze src/components/Button.jsx
```

### Programmatic Usage

```javascript
const { analyzeCode } = require('yosi');

async function analyzeMyCode() {
  const analysis = await analyzeCode('src/utils.js');
  console.log(analysis);
}
```

## Code Conversion

yosi.js can convert code from one language to another:

```bash
yosi convert --file path/to/file.js --to python --output path/to/output.py
```

### Supported Languages

- JavaScript/TypeScript
- Python
- Java
- C#
- Ruby
- PHP
- Go
- And more...

### Example

```bash
# Convert JavaScript to Python
yosi convert --file src/utils.js --to python --output src/utils.py

# Convert JavaScript to TypeScript
yosi convert --file src/app.js --to typescript --output src/app.ts
```

### Programmatic Usage

```javascript
const { convertCode } = require('yosi');

async function convertMyCode() {
  const convertedCode = await convertCode({
    filePath: 'src/utils.js',
    targetLanguage: 'python',
    outputPath: 'src/utils.py'
  });
}
```

## Test Generation

yosi.js can generate tests for your code:

```bash
yosi test --file path/to/file.js --framework jest --output path/to/test.js
```

### Supported Test Frameworks

- `jest`: Generate Jest tests (default)
- `mocha`: Generate Mocha tests
- `pytest`: Generate pytest tests for Python code

### Example

```bash
# Generate Jest tests for a file
yosi test --file src/utils.js --output src/utils.test.js

# Generate Mocha tests for a file
yosi test --file src/utils.js --framework mocha --output src/utils.spec.js

# Generate tests for all files in a directory
yosi test --directory src/components --output tests/components
```

### Programmatic Usage

```javascript
const { generateTests, generateTestSuite } = require('yosi');

async function generateMyTests() {
  // Generate tests for a single file
  await generateTests({
    filePath: 'src/utils.js',
    testFramework: 'jest',
    outputPath: 'src/utils.test.js'
  });
  
  // Generate tests for a directory
  const testFiles = await generateTestSuite({
    directory: 'src/components',
    testFramework: 'jest',
    outputDirectory: 'tests/components',
    extensions: ['.js', '.jsx']
  });
}
```
