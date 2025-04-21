#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = require(packageJsonPath);
const currentVersion = packageJson.version;

console.log(`Current version: ${currentVersion}`);

// Parse the current version
const [major, minor, patch] = currentVersion.split('.').map(Number);

console.log('\nSelect version bump:');
console.log(`1. Patch (${major}.${minor}.${patch + 1})`);
console.log(`2. Minor (${major}.${minor + 1}.0)`);
console.log(`3. Major (${major + 1}.0.0)`);
console.log('4. Custom version');

rl.question('\nEnter your choice (1-4): ', (choice) => {
  let newVersion;
  
  switch (choice) {
    case '1':
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    case '2':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case '3':
      newVersion = `${major + 1}.0.0`;
      break;
    case '4':
      rl.question('Enter custom version (x.y.z): ', (customVersion) => {
        if (!/^\d+\.\d+\.\d+$/.test(customVersion)) {
          console.error('Invalid version format. Must be x.y.z where x, y, and z are numbers.');
          rl.close();
          return;
        }
        updateVersionAndPublish(customVersion);
      });
      return;
    default:
      console.error('Invalid choice. Please enter a number between 1 and 4.');
      rl.close();
      return;
  }
  
  if (newVersion) {
    updateVersionAndPublish(newVersion);
  }
});

function updateVersionAndPublish(newVersion) {
  rl.question(`Publish version ${newVersion}? (y/n): `, (answer) => {
    if (answer.toLowerCase() === 'y') {
      try {
        // Update package.json
        packageJson.version = newVersion;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        console.log(`Updated package.json to version ${newVersion}`);
        
        // Run tests
        console.log('\nRunning tests...');
        execSync('npm test', { stdio: 'inherit' });
        
        // Publish to npm
        console.log('\nPublishing to npm...');
        execSync('npm publish', { stdio: 'inherit' });
        
        console.log(`\nSuccessfully published version ${newVersion} to npm!`);
      } catch (error) {
        console.error('Error during publishing:', error.message);
      }
    } else {
      console.log('Publishing cancelled.');
    }
    
    rl.close();
  });
}

rl.on('close', () => {
  process.exit(0);
});
