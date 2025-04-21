# yosi.ai

An AI-powered code generation tool using Google's Gemini API.

## Features

### Code Generation
- Generate code from natural language commands
- Support for multiple programming languages
- Framework-specific code generation
- Extend or modify existing code
- Multiple AI model options (Gemini Pro, Gemini 2.5 Flash, Gemini 2.5 Pro, etc.)

### Advanced Features
- Project scaffolding (React, Express, full-stack)
- Code refactoring and optimization
- Code analysis and suggestions
- Language conversion
- Test generation

## Installation

### Easy Installation (Recommended)

Clone the repository and run the installer script:

```bash
git clone https://github.com/Tilakmp2003/Yosi.js.git
cd yosi.js
node install.js
```

The installer will:
1. Install yosi.ai globally
2. Help you set up your Gemini API key

### Manual Installation

#### Global Installation

```bash
npm install -g yosi.ai
```

#### Local Installation

```bash
npm install yosi.ai
```

## Setup

Before using yosi.ai, you need to set up your Gemini API key:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set the API key as an environment variable:

```bash
# For Linux/macOS
export GEMINI_API_KEY=your_api_key_here

# For Windows (Command Prompt)
set GEMINI_API_KEY=your_api_key_here

# For Windows (PowerShell)
$env:GEMINI_API_KEY="your_api_key_here"
```

## Usage

### Basic Usage

```bash
yosi "create a function named design that logs 'Hello, World!'"
```

### Basic vs. Advanced Usage

The main difference between the `yosi` command and the `yosi advanced` command lies in the options they provide and the level of detail they send to the AI model.

The basic `yosi` command is designed for straightforward code generation requests and supports fundamental options such as specifying the language, model, output file, and verbose output.

The `yosi advanced` command is intended for more complex code generation scenarios where you need to provide additional context to the AI. It includes all the options of the basic command plus advanced options for specifying a framework, providing existing code to extend or modify, and instructing the AI to include comments.

In essence, `yosi advanced` allows you to give the AI more specific instructions and context, leading to potentially more tailored and complex code outputs, especially when working with existing codebases or specific frameworks.

### Specify Programming Language

```bash
yosi --language python "create a function named design that prints 'Hello, World!'"
```

### Save Output to a File

```bash
yosi "create a function named design" --output design.js
```

### Show Verbose Output

```bash
yosi --verbose "create a function named design"
```

## Options

### Basic Command Options

- `-l, --language <language>`: Specify the programming language (default: javascript)
- `-m, --model <model>`: Specify the AI model to use (default: gemini-2.5-flash-preview-04-17)
- `-o, --output <file>`: Save the generated code to a file
- `-v, --verbose`: Show detailed output
- `--version`: Show version information
- `-h, --help`: Show help information

### Advanced Command Options

```bash
yosi advanced [options] "<command>"
```

- `-l, --language <language>`: Specify the programming language (default: javascript)
- `-f, --framework <framework>`: Specify the framework to use (e.g., react, express)
- `-e, --existing <file>`: Provide a file with existing code to extend or modify
- `-c, --comments`: Include comments in the generated code
- `-m, --model <model>`: Specify the AI model to use (default: gemini-2.5-flash-preview-04-17)
- `-o, --output <file>`: Save the generated code to a file
- `-v, --verbose`: Show detailed output

## Examples

### Generate a React Component

```bash
yosi "create a React component named Button with primary and secondary variants" --output Button.jsx
```

### Generate a Python Class

```bash
yosi --language python "create a class named Person with name and age properties" --output person.py
```

### Generate an API Endpoint

```bash
yosi "create an Express.js API endpoint for user authentication" --output auth.js
```

### Using Different AI Models

```bash
# Default model is Gemini 2.5 Flash Preview
yosi "create a function that calculates the factorial of a number"

# Use Gemini 2.5 Pro model
yosi advanced "create a React component with form validation" --model gemini-2.5-pro-exp-03-25 --language jsx

# Use Gemini 1.5 Pro model
yosi "create a sorting algorithm" --model gemini-1.5-pro
```

### Using the Advanced Command

#### Generate a React Component with Framework Context

```bash
yosi advanced "create a Button component with primary and secondary variants" --language jsx --framework react --comments --output Button.jsx
```

#### Extend Existing Code

```bash
# First, create a file with some starter code
echo 'function UserProfile() { /* TODO */ }' > user.js

# Then use yosi to complete it
yosi advanced "complete this UserProfile function to display user information" --existing user.js --output completed-user.js
```

## Documentation

For more detailed information, check out these guides:

- [Advanced Usage Guide](docs/ADVANCED_USAGE.md) - Learn about advanced features and options
- [Advanced Features](docs/ADVANCED_FEATURES.md) - Project scaffolding, code refactoring, and test generation
- [Language Guide](docs/LANGUAGE_GUIDE.md) - Examples for different programming languages
- [Use Cases](docs/USE_CASES.md) - Common use cases and examples
- [API Reference](docs/API_REFERENCE.md) - Detailed API documentation for programmatic usage
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Solutions for common issues

## Examples

The `examples` directory contains sample code showing how to use yosi.ai for different scenarios:

### Basic Examples
- `basic-usage.js` - Simple example of generating JavaScript code
- `react-component.js` - Example of generating a React component
- `python-example.js` - Example of generating Python code
- `typescript-example.js` - Example of generating TypeScript code
- `express-example.js` - Example of generating an Express.js API
- `vue-example.js` - Example of generating a Vue.js component
- `angular-example.js` - Example of generating an Angular component
- `fullstack-example.js` - Example of generating a full-stack application

### Language Examples
- `java-example.js` - Example of generating Java code
- `csharp-example.js` - Example of generating C# code
- `go-example.js` - Example of generating Go code
- `ruby-example.js` - Example of generating Ruby code
- `swift-example.js` - Example of generating Swift code

### Advanced Examples
- `model-selection-example.js` - Example of using different AI models
- `scaffold-example.js` - Example of scaffolding different types of projects
- `refactor-example.js` - Example of refactoring and analyzing code
- `test-generation-example.js` - Example of generating tests for code

To run an example:

```bash
node examples/basic-usage.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
