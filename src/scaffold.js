const fs = require('fs');
const path = require('path');
const { generateAdvancedCode } = require('./advanced-ai-handler');

/**
 * Scaffolds a project based on a template and user input
 * @param {Object} options - Options for project scaffolding
 * @param {string} options.projectName - The name of the project
 * @param {string} options.projectType - The type of project (e.g., 'react', 'express', 'fullstack')
 * @param {string} options.description - A description of the project
 * @param {string} options.outputDir - The directory to output the project
 * @returns {Promise<string>} - The path to the scaffolded project
 */
async function scaffoldProject(options) {
  const { projectName, projectType, description, outputDir } = options;
  
  // Create the project directory
  const projectDir = path.join(outputDir || process.cwd(), projectName);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }
  
  // Generate project files based on the project type
  switch (projectType.toLowerCase()) {
    case 'react':
      await scaffoldReactProject(projectName, description, projectDir);
      break;
    case 'express':
      await scaffoldExpressProject(projectName, description, projectDir);
      break;
    case 'fullstack':
      await scaffoldFullStackProject(projectName, description, projectDir);
      break;
    default:
      throw new Error(`Unsupported project type: ${projectType}`);
  }
  
  return projectDir;
}

/**
 * Scaffolds a React project
 * @param {string} projectName - The name of the project
 * @param {string} description - A description of the project
 * @param {string} projectDir - The directory to output the project
 * @returns {Promise<void>}
 */
async function scaffoldReactProject(projectName, description, projectDir) {
  console.log('Scaffolding React project...');
  
  // Create directory structure
  fs.mkdirSync(path.join(projectDir, 'src'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'src', 'components'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'src', 'pages'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'public'), { recursive: true });
  
  // Generate package.json
  const packageJson = await generateAdvancedCode({
    command: `create a package.json file for a React project named ${projectName} with description: "${description}"`,
    language: 'json'
  });
  fs.writeFileSync(path.join(projectDir, 'package.json'), packageJson);
  
  // Generate index.html
  const indexHtml = await generateAdvancedCode({
    command: `create an index.html file for a React project named ${projectName}`,
    language: 'html'
  });
  fs.writeFileSync(path.join(projectDir, 'public', 'index.html'), indexHtml);
  
  // Generate App.jsx
  const appJsx = await generateAdvancedCode({
    command: `create a React App.jsx component for a project named ${projectName}`,
    language: 'jsx',
    framework: 'react',
    includeComments: true
  });
  fs.writeFileSync(path.join(projectDir, 'src', 'App.jsx'), appJsx);
  
  // Generate index.js
  const indexJs = await generateAdvancedCode({
    command: `create an index.js file that renders the App component for a React project`,
    language: 'jsx',
    framework: 'react'
  });
  fs.writeFileSync(path.join(projectDir, 'src', 'index.js'), indexJs);
  
  // Generate README.md
  const readme = await generateAdvancedCode({
    command: `create a README.md file for a React project named ${projectName} with description: "${description}"`,
    language: 'markdown'
  });
  fs.writeFileSync(path.join(projectDir, 'README.md'), readme);
  
  console.log('React project scaffolded successfully!');
}

/**
 * Scaffolds an Express project
 * @param {string} projectName - The name of the project
 * @param {string} description - A description of the project
 * @param {string} projectDir - The directory to output the project
 * @returns {Promise<void>}
 */
async function scaffoldExpressProject(projectName, description, projectDir) {
  console.log('Scaffolding Express project...');
  
  // Create directory structure
  fs.mkdirSync(path.join(projectDir, 'src'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'src', 'routes'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'src', 'controllers'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'src', 'models'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'src', 'middleware'), { recursive: true });
  
  // Generate package.json
  const packageJson = await generateAdvancedCode({
    command: `create a package.json file for an Express.js project named ${projectName} with description: "${description}"`,
    language: 'json'
  });
  fs.writeFileSync(path.join(projectDir, 'package.json'), packageJson);
  
  // Generate server.js
  const serverJs = await generateAdvancedCode({
    command: `create a server.js file for an Express.js project with routes, middleware, and error handling`,
    language: 'javascript',
    framework: 'express',
    includeComments: true
  });
  fs.writeFileSync(path.join(projectDir, 'src', 'server.js'), serverJs);
  
  // Generate index.js
  const indexJs = await generateAdvancedCode({
    command: `create an index.js file that imports and starts the Express server`,
    language: 'javascript',
    framework: 'express'
  });
  fs.writeFileSync(path.join(projectDir, 'index.js'), indexJs);
  
  // Generate example route
  const exampleRoute = await generateAdvancedCode({
    command: `create an Express.js route file for handling user-related endpoints (CRUD operations)`,
    language: 'javascript',
    framework: 'express',
    includeComments: true
  });
  fs.writeFileSync(path.join(projectDir, 'src', 'routes', 'users.js'), exampleRoute);
  
  // Generate README.md
  const readme = await generateAdvancedCode({
    command: `create a README.md file for an Express.js project named ${projectName} with description: "${description}"`,
    language: 'markdown'
  });
  fs.writeFileSync(path.join(projectDir, 'README.md'), readme);
  
  console.log('Express project scaffolded successfully!');
}

/**
 * Scaffolds a full-stack project (React + Express)
 * @param {string} projectName - The name of the project
 * @param {string} description - A description of the project
 * @param {string} projectDir - The directory to output the project
 * @returns {Promise<void>}
 */
async function scaffoldFullStackProject(projectName, description, projectDir) {
  console.log('Scaffolding full-stack project...');
  
  // Create directory structure
  fs.mkdirSync(path.join(projectDir, 'client'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'server'), { recursive: true });
  
  // Scaffold client (React)
  await scaffoldReactProject(projectName + '-client', description + ' (Client)', path.join(projectDir, 'client'));
  
  // Scaffold server (Express)
  await scaffoldExpressProject(projectName + '-server', description + ' (Server)', path.join(projectDir, 'server'));
  
  // Generate root package.json
  const packageJson = await generateAdvancedCode({
    command: `create a package.json file for a full-stack project (React + Express) named ${projectName} with description: "${description}" and scripts to run both client and server`,
    language: 'json'
  });
  fs.writeFileSync(path.join(projectDir, 'package.json'), packageJson);
  
  // Generate README.md
  const readme = await generateAdvancedCode({
    command: `create a README.md file for a full-stack project (React + Express) named ${projectName} with description: "${description}" and instructions on how to run both client and server`,
    language: 'markdown'
  });
  fs.writeFileSync(path.join(projectDir, 'README.md'), readme);
  
  console.log('Full-stack project scaffolded successfully!');
}

module.exports = {
  scaffoldProject
};
