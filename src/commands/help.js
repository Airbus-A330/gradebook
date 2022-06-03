module.exports = {

	/**
	 * name: help,
	 * description: Displays the help interface,
	 * parameters: N/A
	 */

	name: 'help',
	description: "Displays this interface",
	usage: "help",
	async execute(chalk, ascii, log, data, fs, db, args, error) {
		const array = []; // Intiailize the help array/list. This will be our list of commands.
		const commandFiles = fs.readdirSync(`${__dirname}`).filter(file => file.endsWith('.js')); // Pull all files from the "/commands/" directory.
		for (const file of commandFiles) {
			// for loop that iterates through all files in the directory.
			const command = require(__dirname + "/" + file); // Command name.
			array.push(chalk.green.bold(command.name) + " — " + chalk.cyanBright(command.description) + " • " + chalk.blue(command.usage)); // Push the command values to the array/list.
		}
		log(chalk.bold.underline("COMMANDS - List") + "\n" + chalk.dim.italic("Arguments surrounded with [] are required, those with <> are optional") + "\n" + array.join("\n")); // An output is logged to the console. Log is also an external function called (see imports on top).
	},
};