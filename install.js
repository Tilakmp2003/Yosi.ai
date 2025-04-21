#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to the yosi.ai installer!');
console.log('This script will help you install yosi.ai globally and set up your Gemini API key.');

// Check if the user has a Gemini API key
rl.question('\nDo you have a Google Gemini API key? (y/n): ', (hasKey) => {
  if (hasKey.toLowerCase() === 'n') {
    console.log('\nYou need a Gemini API key to use yosi.ai.');
    console.log('You can get one from: https://makersuite.google.com/app/apikey');
    console.log('\nOnce you have your API key, run this installer again.');
    rl.close();
    return;
  }

  // Ask for the API key
  rl.question('\nPlease enter your Gemini API key: ', (apiKey) => {
    if (!apiKey || apiKey.trim() === '') {
      console.log('API key cannot be empty. Please try again.');
      rl.close();
      return;
    }

    console.log('\nInstalling yosi.ai globally...');

    try {
      // Install the package globally
      execSync('npm install -g .', { stdio: 'inherit' });

      console.log('\nyosi.ai has been installed globally!');

      // Set up the API key based on the platform
      const isWindows = process.platform === 'win32';

      if (isWindows) {
        console.log('\nTo set up your API key on Windows, run the following command:');
        console.log(`setx GEMINI_API_KEY "${apiKey}"`);
        console.log('\nYou may need to restart your terminal for the changes to take effect.');
      } else {
        // For macOS and Linux
        const homeDir = process.env.HOME;
        let shellConfigFile = '';

        if (fs.existsSync(path.join(homeDir, '.zshrc'))) {
          shellConfigFile = path.join(homeDir, '.zshrc');
        } else if (fs.existsSync(path.join(homeDir, '.bashrc'))) {
          shellConfigFile = path.join(homeDir, '.bashrc');
        } else if (fs.existsSync(path.join(homeDir, '.bash_profile'))) {
          shellConfigFile = path.join(homeDir, '.bash_profile');
        }

        if (shellConfigFile) {
          console.log(`\nAdding API key to ${shellConfigFile}...`);

          try {
            fs.appendFileSync(shellConfigFile, `\n# yosi.ai Gemini API key\nexport GEMINI_API_KEY="${apiKey}"\n`);
            console.log(`API key added to ${shellConfigFile}`);
            console.log('\nYou may need to restart your terminal or run the following command:');
            console.log(`source ${shellConfigFile}`);
          } catch (error) {
            console.error(`Error adding API key to ${shellConfigFile}:`, error.message);
            console.log('\nPlease manually add the following line to your shell configuration file:');
            console.log(`export GEMINI_API_KEY="${apiKey}"`);
          }
        } else {
          console.log('\nPlease manually add the following line to your shell configuration file:');
          console.log(`export GEMINI_API_KEY="${apiKey}"`);
        }
      }

      console.log('\nYou can now use yosi.ai by running the "yosi" command!');
      console.log('For example: yosi "create a function named hello that returns Hello World"');

    } catch (error) {
      console.error('Error during installation:', error.message);
    }

    rl.close();
  });
});

rl.on('close', () => {
  process.exit(0);
});
