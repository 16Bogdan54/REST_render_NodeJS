const chalk = require('chalk');

const info = (args) => {
    console.log(chalk.blue(`[${new Date().toLocaleDateString()}] [INFO]`), chalk.blueBright(args));
}

const warn = (args) => {
    console.log(chalk.yellow(`[${new Date().toLocaleDateString()}] [WARN]`), chalk.yellowBright(args));
}

const error = (args) => {
    console.log(chalk.red(`[${new Date().toLocaleDateString()}] [ERROR]`), chalk.redBright(args));
}

const log = (args) => {
    info(args)
}

module.exports = {
    info,
    warn,
    error,
    log
}