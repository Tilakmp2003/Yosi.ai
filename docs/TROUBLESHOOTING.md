# Troubleshooting Guide for yosi.ai

This guide helps you troubleshoot common issues with yosi.ai.

## Table of Contents

- [API Key Issues](#api-key-issues)
- [Installation Issues](#installation-issues)
- [Code Generation Issues](#code-generation-issues)
- [Project Scaffolding Issues](#project-scaffolding-issues)
- [Code Refactoring Issues](#code-refactoring-issues)
- [Test Generation Issues](#test-generation-issues)
- [CLI Issues](#cli-issues)

## API Key Issues

### Error: GEMINI_API_KEY environment variable is not set

**Problem:** You're seeing an error message about the GEMINI_API_KEY not being set.

**Solution:**
1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set the environment variable:

```bash
# For Linux/macOS
export GEMINI_API_KEY=your_api_key_here

# For Windows (Command Prompt)
set GEMINI_API_KEY=your_api_key_here

# For Windows (PowerShell)
$env:GEMINI_API_KEY="your_api_key_here"
```

3. Verify the API key is set:

```bash
# For Linux/macOS
echo $GEMINI_API_KEY

# For Windows (Command Prompt)
echo %GEMINI_API_KEY%

# For Windows (PowerShell)
echo $env:GEMINI_API_KEY
```

### Error: Failed to generate code: 400 Bad Request

**Problem:** The Gemini API is returning a 400 Bad Request error.

**Solution:**
1. Check that your API key is valid
2. Ensure you're not exceeding API rate limits
3. Try a simpler command or shorter prompt
4. Check the Gemini API status page for any outages

## Installation Issues

### Error: npm ERR! code EACCES

**Problem:** Permission issues when installing globally.

**Solution:**
1. Use sudo (not recommended):
```bash
sudo npm install -g yosi
```

2. Fix npm permissions (recommended):
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Error: npm ERR! code ENOENT

**Problem:** File or directory not found during installation.

**Solution:**
1. Check that you're in the correct directory
2. Try clearing the npm cache:
```bash
npm cache clean --force
```
3. Reinstall:
```bash
npm install -g yosi
```

## Code Generation Issues

### Error: Failed to generate code: API error

**Problem:** The Gemini API is returning an error.

**Solution:**
1. Check your API key
2. Try a different command
3. Check if you're exceeding API rate limits
4. Try again later

### Generated code is not what I expected

**Problem:** The generated code doesn't match your expectations.

**Solution:**
1. Be more specific in your command
2. Use the advanced command with more options:
```bash
yosi advanced "create a React component for a user profile with name, email, and avatar" --framework react --language jsx
```
3. Provide existing code to extend:
```bash
yosi advanced "add form validation" --existing form.js --output form-validated.js
```

## Project Scaffolding Issues

### Error: Unsupported project type

**Problem:** You're trying to scaffold a project with an unsupported type.

**Solution:**
Use one of the supported project types:
```bash
yosi scaffold --name my-project --type react
yosi scaffold --name my-api --type express
yosi scaffold --name my-app --type fullstack
```

### Error: Failed to scaffold project

**Problem:** Project scaffolding failed.

**Solution:**
1. Check that you have write permissions to the output directory
2. Try a different output directory
3. Check for disk space issues
4. Try scaffolding a simpler project type

## Code Refactoring Issues

### Error: File not found

**Problem:** The file you're trying to refactor doesn't exist.

**Solution:**
1. Check the file path
2. Make sure the file exists
3. Use an absolute path if necessary

### Error: Failed to refactor code

**Problem:** Code refactoring failed.

**Solution:**
1. Try a simpler refactoring command
2. Check that the file is valid code
3. Try refactoring a smaller file

## Test Generation Issues

### Error: Failed to generate tests

**Problem:** Test generation failed.

**Solution:**
1. Check that the file contains valid code
2. Try a different test framework
3. Try generating tests for a simpler file

### Generated tests don't compile or run

**Problem:** The generated tests have syntax errors or don't run correctly.

**Solution:**
1. Check that the source file is valid
2. Try a different test framework
3. Manually fix any issues in the generated tests
4. Try generating tests for a simpler file

## CLI Issues

### Command not found: yosi

**Problem:** The yosi command is not found after installation.

**Solution:**
1. Check that yosi is installed:
```bash
npm list -g yosi
```
2. Make sure the npm bin directory is in your PATH
3. Try installing again:
```bash
npm install -g yosi
```
4. Try running with npx:
```bash
npx yosi "create a function"
```

### Error: Unknown option

**Problem:** You're using an option that doesn't exist.

**Solution:**
1. Check the help for the command:
```bash
yosi --help
yosi advanced --help
```
2. Make sure you're using the correct syntax
3. Update to the latest version of yosi
