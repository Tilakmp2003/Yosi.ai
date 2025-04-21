# Publishing Checklist for yosi.js

This checklist helps ensure that everything is ready before publishing yosi.js to npm.

## Pre-Publish Checklist

### Code Quality
- [ ] All unit tests pass (`npm test`)
- [ ] Mock tests pass (`npm run mock-test`)
- [ ] Real API tests pass (`npm run test:real`) - requires GEMINI_API_KEY
- [ ] Code is properly formatted and follows project style
- [ ] No linting errors or warnings
- [ ] All TODOs have been addressed

### Documentation
- [ ] README.md is up-to-date
- [ ] All features are documented
- [ ] Usage examples are provided
- [ ] API documentation is complete
- [ ] Installation instructions are clear

### Package Configuration
- [ ] package.json has correct version number
- [ ] package.json has correct dependencies
- [ ] package.json has correct entry points
- [ ] package.json has correct metadata (description, keywords, etc.)
- [ ] .npmignore excludes appropriate files
- [ ] LICENSE file is included

### Security
- [ ] No API keys or secrets are included in the code
- [ ] Dependencies are up-to-date and have no known vulnerabilities

## Publishing Steps

1. Update version number in package.json
2. Run tests: `npm test`
3. Run mock tests: `npm run mock-test`
4. Run real API tests (if possible): `npm run test:real`
5. Update CHANGELOG.md with new version changes
6. Commit changes: `git commit -am "Prepare for version X.Y.Z"`
7. Create a git tag: `git tag vX.Y.Z`
8. Push changes and tag: `git push && git push --tags`
9. Publish to npm: `npm run publish`

## Post-Publish Checklist

- [ ] Verify the package is available on npm
- [ ] Install the package in a new project to verify it works
- [ ] Update documentation website (if applicable)
- [ ] Announce the new version (if applicable)

## Troubleshooting

If you encounter issues during publishing:

1. Check npm logs: `npm logs`
2. Verify npm authentication: `npm whoami`
3. Check if the package name is available: `npm view yosi`
4. Ensure you have the correct permissions to publish
