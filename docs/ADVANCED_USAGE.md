# Advanced Usage Guide for yosi.ai

This guide covers advanced usage patterns and features of yosi.ai.

## Table of Contents

- [Advanced Command Options](#advanced-command-options)
- [Framework-Specific Code Generation](#framework-specific-code-generation)
- [Extending Existing Code](#extending-existing-code)
- [Generating Complete Projects](#generating-complete-projects)
- [Integration with Development Workflows](#integration-with-development-workflows)

## Advanced Command Options

The `advanced` command provides more control over code generation:

```bash
yosi advanced [options] "<command>"
```

### Options

- `-l, --language <language>`: Specify the programming language (default: javascript)
- `-f, --framework <framework>`: Specify the framework to use (e.g., react, express)
- `-e, --existing <file>`: Provide a file with existing code to extend or modify
- `-c, --comments`: Include comments in the generated code
- `-o, --output <file>`: Save the generated code to a file
- `-v, --verbose`: Show detailed output

### Examples

Generate a React component with comments:

```bash
yosi advanced "create a Button component with primary and secondary variants" --language jsx --framework react --comments --output Button.jsx
```

## Framework-Specific Code Generation

yosi.ai can generate code for specific frameworks by providing the framework name:

### React

```bash
yosi advanced "create a form component with validation for email and password" --framework react --language jsx --output LoginForm.jsx
```

### Express.js

```bash
yosi advanced "create an API endpoint for user authentication" --framework express --output auth.js
```

### Vue.js

```bash
yosi advanced "create a data table component with sorting and filtering" --framework vue --language vue --output DataTable.vue
```

### Angular

```bash
yosi advanced "create a service for handling HTTP requests" --framework angular --language typescript --output data.service.ts
```

## Extending Existing Code

You can extend or modify existing code by providing a file with the `--existing` option:

```bash
# First, create a file with some starter code
echo 'function UserProfile() { /* TODO */ }' > user.js

# Then use yosi to complete it
yosi advanced "complete this UserProfile function to display user information" --existing user.js --output completed-user.js
```

This is particularly useful for:

- Adding features to existing components
- Implementing TODOs in your code
- Refactoring code to follow best practices
- Adding tests to existing code

## Generating Complete Projects

You can use yosi.js to generate complete project structures:

### Example: Todo Application

```bash
# Create a directory for the project
mkdir todo-app && cd todo-app

# Generate backend code
yosi advanced "create an Express.js API for a Todo application" --framework express --output backend/server.js

# Generate frontend code
yosi advanced "create a React Todo application with components for displaying and adding todos" --framework react --language jsx --output frontend/App.jsx

# Generate README
yosi "create a README.md for a Todo application" --language markdown --output README.md
```

## Integration with Development Workflows

### Using yosi.js in Scripts

You can use yosi.js in npm scripts:

```json
{
  "scripts": {
    "generate:component": "yosi advanced \"create a React component\" --framework react --language jsx --output src/components/NewComponent.jsx",
    "generate:api": "yosi advanced \"create an Express.js API endpoint\" --framework express --output src/api/endpoint.js"
  }
}
```

### Using yosi.js Programmatically

You can use yosi.js programmatically in your Node.js applications:

```javascript
const { generateCode, generateAdvancedCode } = require('yosi');
const fs = require('fs');

async function generateComponents() {
  const components = ['Button', 'Card', 'Modal', 'Navbar'];

  for (const component of components) {
    const code = await generateAdvancedCode({
      command: `create a React ${component} component`,
      language: 'jsx',
      framework: 'react',
      includeComments: true
    });

    fs.writeFileSync(`src/components/${component}.jsx`, code);
    console.log(`Generated ${component} component`);
  }
}

generateComponents();
```
