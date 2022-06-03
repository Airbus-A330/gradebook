module.exports = {

	/**
	 * name: edit,
	 * description: Edit an existing entry's grade
	 * parameters: name<string> grade<integer>
	 */

	name: 'edit',
	description: "Edit an existing entry's grade",
	usage: "edit [name] | [grade_int]",
	async execute(chalk, ascii, log, data, fs, db, args, error) {
		var arguments = args.join(" ").replace("edit ", ""); // Arguments is an array/list. It will be joined together (with a space) into one large string. It will also replace the "edit " part of it since "edit " is the name of the command is not important.
		arguments = arguments.split(" | "); // With the new string, it will be turned back into an array/list, but separated with a pipe (|) character this time. This will help differentiate between arguments that should not be separated by a space.
		if (arguments.length == 0 || arguments.length == 1) {
			// An error is thrown here because arguments are lacking.
			error("edit", "You are lacking arguments!", "edit [name] | [grade_int]"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
		if (isNaN(arguments[1])) {
			// An error is thrown here because the grade argument is not a number.
			error("edit", "`grade_int` must be an integer/number!", "edit [name] | [grade_int]"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
		var student = await db.get(`${arguments[0]}`); // This fetches the student from the database.
		if (student == undefined || student == null) {
			// The student does not exist as it returns as either undefined or null (depending on the circumstance). The code should throw an error and immediately stop.
			error("edit", "Student did not exist in your gradebook to begin with! Use enter command instead.", "N/A"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
		await db.set(`${arguments[0]}`, `${arguments[1]}`);
		log(chalk.green.bold("✅ Success") + " — " + "Grade for " + chalk.underline(arguments[0]) + " was edited to " + chalk.underline(arguments[1]) + "."); // An output is logged to the console. Log is also an external function called (see imports on top).
	},
};