const chalk = require("chalk"); // External package used for terminal coloring. Source: https://www.npmjs.com/package/chalk

const error = async (command, desc, usage) => {
	const log = require("./log.js"); // Require log function.
	log(chalk.red.bold(`❌ ERROR — ${command}`) + "\n" + "• " + chalk.dim("Error: ") + desc + "\n" + "• " + chalk.dim("Usage: ") + usage); // Console logs the error.
};

module.exports = error;