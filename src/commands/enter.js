module.exports = {

	/**
	 * name: enter,
	 * description: Enter a student and their grade
	 * parameters: name<string> | grade<integer>
	 */

	name: 'enter',
	description: "Enter a student and their grade",
	usage: "enter [name] | [grade_int]",
	async execute(chalk, ascii, log, data, fs, db, args, error) {
		var arguments = args.join(" ").replace("enter ", ""); // Arguments is an array/list. It will be joined together (with a space) into one large string. It will also replace the "enter " part of it since "enter " is the name of the command is not important.
		arguments = arguments.split(" | "); // With the new string, it will be turned back into an array/list, but separated with a pipe (|) character this time. This will help differentiate between arguments that should not be separated by a space.
		if (arguments.length == 0 || arguments.length == 1) {
			// An error is thrown here because arguments are lacking.
			error("enter", "You are lacking arguments!", "enter [name] | [grade_int]"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
		if (isNaN(arguments[1])) {
			// An error is thrown here because arguments are incorrect.
			error("enter", "`grade_int` must be an integer/number!", "enter [name] | [grade_int]"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
		var student = await db.get(`${arguments[0]}`); // This fetches the student from the database.
		if (student !== undefined && student !== null) {
			// If the student already exists, it should check here as we do not want to re-enter the grade if it already exists.
			error("enter", "Student already exists in gradebook! Use edit command instead.", "N/A"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
		await db.set(`${arguments[0]}`, `${arguments[1]}`);
		log(chalk.green.bold("✅ Success") + " — " + "Grade for " + chalk.underline(arguments[0]) + " was input as " + chalk.underline(arguments[1]) + "."); // An output is logged to the console. Log is also an external function called (see imports on top).
	},
};