// Example of using yosi.js to scaffold a project

const { scaffoldProject } = require('../src/scaffold');

async function scaffoldExample() {
  try {
    // Scaffold a React project
    console.log('Scaffolding a React project...');
    
    const reactProjectDir = await scaffoldProject({
      projectName: 'my-react-app',
      projectType: 'react',
      description: 'A sample React application',
      outputDir: './examples/output'
    });
    
    console.log(`React project scaffolded at: ${reactProjectDir}`);
    
    // Scaffold an Express project
    console.log('\nScaffolding an Express project...');
    
    const expressProjectDir = await scaffoldProject({
      projectName: 'my-express-api',
      projectType: 'express',
      description: 'A sample Express API',
      outputDir: './examples/output'
    });
    
    console.log(`Express project scaffolded at: ${expressProjectDir}`);
    
    // Scaffold a full-stack project
    console.log('\nScaffolding a full-stack project...');
    
    const fullStackProjectDir = await scaffoldProject({
      projectName: 'my-fullstack-app',
      projectType: 'fullstack',
      description: 'A sample full-stack application',
      outputDir: './examples/output'
    });
    
    console.log(`Full-stack project scaffolded at: ${fullStackProjectDir}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Make sure to set the GEMINI_API_KEY environment variable before running this example
if (!process.env.GEMINI_API_KEY) {
  console.error('Please set the GEMINI_API_KEY environment variable');
  process.exit(1);
}

scaffoldExample();
