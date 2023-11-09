import validator from 'validator';
import chalk from 'chalk';

const check= validator.isEmail("anshukrmandal7007@gmail.com")
console.log(check? chalk.green.inverse(check):chalk.red.inverse(check));
// console.log(chalk.red.underline.inverse("Hello world"));