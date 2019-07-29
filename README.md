# What is Plop?
Plop is what I like to call a "micro-generator framework." Now, I call it that because it is a small tool that gives you a simple way to generate code or any other type of flat text files in a consistent way. You see, we all create structures and patterns in our code (routes, controllers, components, helpers, etc). These patterns change and improve over time so when you need to create a NEW *insert-name-of-pattern-here*, it's not always easy to locate the files in your codebase that represent the current "best practice." That's where plop saves you. With plop, you have your "best practice" method of creating any given pattern in CODE. Code that can easily be run from the terminal by typing `plop`. Not only does this save you from hunting around in your codebase for the right files to copy, but it also turns "the right way" into "the easiest way" to make new files.

If you boil plop down to its core, it is basically glue code between  [inquirer](https://github.com/SBoudrias/Inquirer.js/) prompts and [handlebar](https://github.com/wycats/handlebars.js/) templates.

> This documentation is a work in progress. If you have great ideas, I'd love to hear them.

# Installation
## 1. Add plop to your project
```
$ npm install --save-dev plop
```
## 2. Install plop globally (optional, but recommended for easy access)
```
$ npm install -g plop
```
## 3. Create a plopfile.js at the root of your project
``` javascript
module.exports = function (plop) {
	// create your generators here
	plop.setGenerator('basics', {
		description: 'this is a skeleton plopfile',
		prompts: [], // array of inquirer prompts
		actions: []  // array of actions
	});
};
```
## 4. Run CLI
```
$ plop
```