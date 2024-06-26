#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import ora from 'ora';
function countdown(targetDate) {
    const spinner = ora('Countdown running...').start();
    const updateCountdown = () => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();
        if (difference <= 0) {
            clearInterval(intervalId);
            spinner.stop();
            console.log(chalk.green.bold('🎉 Countdown finished! 🎉'));
            return;
        }
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        spinner.text = `${chalk.cyan(`${days}d`)} ${chalk.magenta(`${hours}h`)} ${chalk.yellow(`${minutes}m`)} ${chalk.red(`${seconds}s`)} remaining`;
    };
    const intervalId = setInterval(updateCountdown, 1000);
}
async function getTargetDate() {
    console.log(gradient.rainbow.multiline(figlet.textSync('Countdown Timer!', { horizontalLayout: 'full' })));
    console.log(chalk.blue.bold('<<<<<<<<<<< Welcome to the Countdown Timer! >>>>>>>>>>>>'));
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'targetDate',
            message: chalk.blue('📅 Enter the target date (YYYY-MM-DD):'),
            validate: function (value) {
                const pass = value.match(/^\d{4}-\d{2}-\d{2}$/);
                if (pass) {
                    return true;
                }
                return chalk.red('❌ Please enter a valid date in the format YYYY-MM-DD');
            }
        },
        {
            type: 'input',
            name: 'targetTime',
            message: chalk.blue('⏰ Enter the target time (HH:MM:SS):'),
            validate: function (value) {
                const pass = value.match(/^\d{2}:\d{2}:\d{2}$/);
                if (pass) {
                    return true;
                }
                return chalk.red('❌ Please enter a valid time in the format HH:MM:SS');
            }
        }
    ]);
    return new Date(`${answers.targetDate}T${answers.targetTime}`);
}
async function main() {
    const targetDate = await getTargetDate();
    console.log(chalk.green.bold(`⏳ Countdown to ${targetDate.toString()} started!`));
    countdown(targetDate);
}
main();
