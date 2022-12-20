import chalk from 'chalk';
export function labelNaming(text : string){ return chalk.bold.bgWhite(text); }
export function outputID(text : string){ return chalk.yellow(text); }
export function outputUser(text : string){ return chalk.green(text); }
export function outputDesc(text : string){ return chalk.blue(text); }
export function outputTag(text : string){ return chalk.red(text); }