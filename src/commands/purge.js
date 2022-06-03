module.exports = {

	/**
	 * name: purge,
	 * description: Purge all entries in the gradebook,
	 * parameters: purge [confirmation (YES/no)]
	 */

	name: 'purge',
	description: "Purge all entries in the gradebook",
	usage: "purge [confirmation]",
	async execute(chalk, ascii, log, data, fs, db, args, error) {
		var arguments = args.join(" ").replace("purge ", ""); // Arguments is an array/list. It will be joined together (with a space) into one large string. It will also replace the "delete " part of it since "delete " is the name of the command is not important.
		if (args.length == 1) {
			// An error is thrown here because arguments are lacking.
			error("purge", "You are lacking the confirmation!", "purge [YES/no]"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
		if (args[1] !== "YES") {
			// An error is thrown here because arguments are incorrect.
			error("purge", "Operation aborted.", "N/A"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}

		var list = await db.list(); // All values in the database are listed into an array/list.
		var counter = 0; // This is our counter to see how many items were actually purged from the database. It will increment for each item purged.
		for (var i = 0; i < list.length; i++) {
			// In this for loop, we iterate through all values in the array/list and delete it from the database, while incrementing a value of 1 to the counter variable.
			await db.delete(list[i]); // This value is deleted from the database.
			counter += 1; // The counter is incremented by 1.
		}

		log(chalk.green.bold("✅ Success") + " — " + chalk.underline(counter) + " items were purged from the entire gradebook."); // An output is logged to the console. Log is also an external function called (see imports on top).
	},
};