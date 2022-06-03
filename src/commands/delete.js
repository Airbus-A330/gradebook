module.exports = {

	/**
	 * name: delete,
	 * description: Delete an entry in the gradebook
	 * parameters: name<string>
	 */

	name: 'delete',
	description: "Delete an entry in the gradebook",
	usage: "delete [name]",
	async execute(chalk, ascii, log, data, fs, db, args, error) {
		var arguments = args.join(" ").replace("delete ", ""); // Arguments is an array/list. It will be joined together (with a space) into one large string. It will also replace the "delete " part of it since "delete " is the name of the command is not important.
		arguments = arguments.split(" | "); // With the new string, it will be turned back into an array/list, but separated with a pipe (|) character this time. This will help differentiate between arguments that should not be separated by a space.
		if (arguments.length == 0) {
			// An error is thrown here because arguments are lacking.
			error("delete", "You are lacking arguments!", "delete [name]"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
		var student = await db.get(`${arguments[0]}`); // Here, we fetch the student from the database.  Arguments is an array and the name is the first index of it (index 0).
		if (student == undefined || student == null) {
			// The student does not exist as it returns as either undefined or null (depending on the circumstance). The code should throw an error and immediately stop.
			error("delete", "Student did not exist in your gradebook to begin with! Use enter command instead.", "N/A"); // Again, this is an imported error function (see imports on top).
			return; // The function should return with nothing here and halt action, as there is no one to delete.
		}
		await db.delete(`${arguments[0]}`); // The name is deleted from the database.
		log(chalk.green.bold("✅ Success") + " — " + "Grade for " + chalk.underline(arguments[0]) + " was removed from the gradebook.") // An output is logged to the console. Log is also an external function called (see imports on top).
	},
};