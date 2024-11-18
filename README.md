# Web UI Tests with Playwright

## Prerequisites:
	- Node.js 18 or higher
	- VS Code or any other IDE/terminal

This project contains Web UI tests created using Playwright and TypeScript.
Tests cover some of the most business critical functionality available at [https://www.saucedemo.com].

## Tests:
1. Verify login error message: ensure that locked-out users cannot login.
2. Verify products sorting: ensure that default sorting by 'Name (A to Z)' is available to users and it is possible for them to change the sorting order.
3. Add product to cart and finish order: ensure that it is possible for a standard user to 
		- login;
		- add item to a shopping cart;
		- verify item's details in the cart;
		- successfully complete ordering process;
		- 'Thank you' message is shown at the end of the process.

## To run Web UI tests using Playwright:
1. Clone this repository to your machine.
2. Open folder with tests (ui-tests) in IDE/terminal. 
3. Install all required dependencies from package.json file, before running the tests for the first time. 
This can be done using the next command:
	npm install
If you skipped browser installation, you can install them later manulally using command:
    npx playwright install
To install a specific single browser use:
	npx playwright install chromium
4. To run all tests use command 
	npx playwright test
5. To view the tests results with the built-in Playwright report viewer run   
    npx playwright show-report
