const inquirer = require('inquirer');
const _ = require('lodash');
const fs = require('fs');

function validate(answer) {
    // if (answer.length < 1) {
    //     return 'You must choose at least one topping.';
    // }

    return true;
}

function convertComponentName(value) {
    value.split(" ")
        .map(_.startCase)
        .join("")
}

/**
 * Render path from list name separated with semicolon (Eg. eggs,mango,apple)
 */
function renderPath(values) {
    values.split(',')
}

module.exports = function (plop) {
    // TODO: adding a custom inquirer prompt type
    plop.addPrompt('directory', require('inquirer-directory'));

    // TODO: controller generator
    plop.setGenerator('components', {
        description: 'Add Components',
        prompts: [
            {
                type: 'directory',
                name: 'path',
                message: 'where would you like to put this component?',
                basePath: plop.getPlopfilePath()
            },
            {
                type: 'checkbox',
                message: 'Select components',
                name: 'components',
                choices: [
                    new inquirer.Separator(),
                    new inquirer.Separator('GENERAL'),
                    'Typography',
                    'Button',
                    'Icon',
                    new inquirer.Separator(),
                    new inquirer.Separator('LAYOUT'),
                    'Header',
                    new inquirer.Separator(),
                    new inquirer.Separator('DATA ENTRY'),
                    'Input',
                    'Checkbox',
                    'Date Picker',
                    new inquirer.Separator(),
                    new inquirer.Separator('Display'),
                    'Avatar',
                    new inquirer.Separator(),
                    new inquirer.Separator('NAVIGATION'),
                    'Menu',
                ],
                validate
            }],
        actions: [
            function copyComponents(answers) {
                // move the current working directory to the plop file path
                // this allows this action to work even when the generator is
                // executed from inside a subdirectory
                process.chdir(plop.getPlopfilePath());

                const components = plop.renderString('{{components}}', answers).split(',').map(_.startCase);
                const path = plop.renderString('{{path}}', answers)

                // do a synchronous copy via node fs
                components.forEach(component => {
                    fs.writeFileSync(`${path}/${component}.js`, fs.readFileSync('plop-components/controller.js'));
                })
                return 'Wrote';
            },
            function appendDependencies(answers) {
                // move the current working directory to the plop file path
                // this allows this action to work even when the generator is
                // executed from inside a subdirectory
                process.chdir(plop.getPlopfilePath());

                let packageStr = fs.readFileSync('package.json');
                let packageObj = JSON.parse(packageStr);
                packageObj = { ...packageObj, dependencies: { "react-native": "^0.60.4", ...packageObj.dependencies, } }

                packageStr = JSON.stringify(packageObj, null, '\t');

                // TODO: Write package.json file
                fs.writeFileSync('package.json', packageStr);
                return packageObj;
            }],
    });
};
