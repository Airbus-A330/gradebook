module.exports = {

	/**
	 * name: ping,
	 * description: Check to make sure the program is working
	 * parameters: N/A
	 */

	name: 'ping',
	description: "Checks to make sure the program is working",
	usage: "ping",
	async execute(chalk, ascii, log, data, fs, db, args, error) {
		log("Debug " + chalk.green.bold("successful") + "! Systems working properly."); // An output is logged to the console. Log is also an external function called (see imports on top).
	},
};