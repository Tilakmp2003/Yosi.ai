/**
 * Mock AI handler for testing purposes
 * This module provides mock implementations of the AI handlers
 * to allow testing without an actual API key
 */

/**
 * Available AI models
 * @type {Object}
 */
const MODELS = {
  // Standard Gemini models
  'gemini-1.5-pro': {
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    description: 'Google\'s Gemini 1.5 Pro model - balanced performance and quality'
  },
  'gemini-1.5-flash': {
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    description: 'Google\'s Gemini 1.5 Flash model - faster responses'
  },
  'gemini-1.0-pro': {
    name: 'Gemini 1.0 Pro',
    provider: 'google',
    description: 'Google\'s Gemini 1.0 Pro model - previous generation'
  },
  'gemini-1.0-pro-vision': {
    name: 'Gemini 1.0 Pro Vision',
    provider: 'google',
    description: 'Google\'s Gemini 1.0 Pro Vision model - includes vision capabilities'
  },

  // Preview/Experimental models
  'gemini-2.5-flash-preview-04-17': {
    name: 'Gemini 2.5 Flash (Preview)',
    provider: 'google',
    description: 'Google\'s Gemini 2.5 Flash preview model - faster responses'
  },
  'gemini-2.5-flash-preview-04-17:thinking': {
    name: 'Gemini 2.5 Flash Thinking (Preview)',
    provider: 'google',
    description: 'Google\'s Gemini 2.5 Flash preview model with thinking mode enabled'
  },
  'gemini-2.5-pro-exp-03-25': {
    name: 'Gemini 2.5 Pro (Experimental)',
    provider: 'google',
    description: 'Google\'s experimental Gemini 2.5 Pro model - enhanced capabilities'
  }
};

/**
 * Get available models
 * @returns {Object} - Available models
 */
function getAvailableModels() {
  return MODELS;
}

/**
 * Generates mock code based on a natural language command
 * @param {string} command - The natural language command to generate code
 * @param {string} language - The programming language to generate code in
 * @param {string} model - The model to use (default: 'gemini-2.5-flash-preview-04-17')
 * @returns {Promise<string>} - The generated code
 */
async function generateMockCode(command, language = 'javascript', model = 'gemini-2.5-flash-preview-04-17') {
  console.log(`[MOCK] Generating ${language} code using ${model} for: "${command}"`);

  // Return different mock code based on the language
  switch (language.toLowerCase()) {
    case 'javascript':
      return `function ${getNameFromCommand(command)}() {
  console.log("Hello, World!");
  return "Hello, World!";
}`;
    case 'python':
      return `def ${getNameFromCommand(command)}():
    print("Hello, World!")
    return "Hello, World!"`;
    case 'typescript':
      return `function ${getNameFromCommand(command)}(): string {
  console.log("Hello, World!");
  return "Hello, World!";
}`;
    case 'jsx':
    case 'react':
      return `import React from 'react';

function ${getNameFromCommand(command)}() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is a React component.</p>
    </div>
  );
}

export default ${getNameFromCommand(command)};`;
    case 'vue':
      return `<template>
  <div>
    <h1>Hello, World!</h1>
    <p>This is a Vue component.</p>
  </div>
</template>

<script>
export default {
  name: '${getNameFromCommand(command)}',
  props: {
    msg: String
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>`;
    default:
      return `// Generated ${language} code for: ${command}
// This is a mock response for testing purposes`;
  }
}

/**
 * Generates mock code with advanced options
 * @param {Object} options - Options for code generation
 * @param {string} options.model - The model to use (default: 'gemini-2.5-flash-preview-04-17')
 * @returns {Promise<string>} - The generated code
 */
async function generateAdvancedMockCode(options) {
  const {
    command,
    language = 'javascript',
    framework = '',
    existingCode = '',
    includeComments = false,
    model = 'gemini-2.5-flash-preview-04-17'
  } = options;

  console.log(`[MOCK] Generating advanced ${language} code using ${model} for: "${command}"`);

  // Add framework info to the mock response
  let frameworkInfo = '';
  if (framework) {
    frameworkInfo = `\n// Using ${framework} framework`;
  }

  // Add comments if requested
  let comments = '';
  if (includeComments) {
    comments = `\n/**
 * This code was generated with yosi.js
 * Command: ${command}
 * Language: ${language}
 * Framework: ${framework || 'none'}
 * Model: ${model}
 */`;
  }

  // If there's existing code, return a modified version
  if (existingCode) {
    return `${comments}${frameworkInfo}
// Modified existing code:
${existingCode}

// Added new code:
function newFeature() {
  console.log("New feature added!");
}`;
  }

  // Otherwise return a new mock implementation
  return `${comments}${frameworkInfo}
${await generateMockCode(command, language)}`;
}

/**
 * Helper function to extract a name from the command
 * @param {string} command - The command to extract a name from
 * @returns {string} - The extracted name or a default name
 */
function getNameFromCommand(command) {
  // Try to extract a name from the command
  const nameMatch = command.match(/named? (\w+)/i);
  if (nameMatch && nameMatch[1]) {
    return nameMatch[1];
  }

  // If no name found, use a default
  return 'example';
}

module.exports = {
  generateMockCode,
  generateAdvancedMockCode,
  getAvailableModels
};
