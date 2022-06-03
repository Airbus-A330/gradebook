const sort = require("../functions/sort.js");

module.exports = {

	/**
	 * name: list,
	 * description: Lists all entries in the gradebook,
	 * parameters: list [list_options(grade/name)] <order (true/false)>
	 */

	name: 'list',
	description: "List all entries in the gradebook",
	usage: "list [list_options] <order>",
	async execute(chalk, ascii, log, data, fs, db, args, error) {
		if (args.length == 0) {
			// An error is thrown here because arguments are lacking.
			error("list", "You are lacking arguments!", "list [list_options (name/grade)] <order (true/false)>"); // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
		var order = args[2]; // The order element is the third element of the arguments array/list.
		if (!order) order = "true"; // We will set it to true by default if there is no args[2]/order.
		if (args[1] == "grade" || args[1] == "name") {
			// Here, we check to see if args[1] is equal to either "grade" or "name". If it's not, it will go to the else statement below stating incorrect usage.
			if (args[1] == "grade") {
				// Here, we want to deal with the listing of the grades.
				if (order == "true") {
					// The order is set to true, which means that the grades should be listed in order from greatest to least.
					var array = await sort.grade(db, true); // This is an external function that we have imported on line 1.
					log(array.join("\n")); // The function returns an array/list which we have to join to make it human readable.  The final output is logged into the console.
				} else if (order == "false") {
					// The order here is false, so the grades should be listed in order from least to greatest.
					var array = await sort.grade(db, false); // This is an external function that we have imported on line 1.
					log(array.join("\n")); // The function returns an array/list which we have to join to make it human readable.  The final output is logged into the console.
				}
			} else if (args[1] == "name") {
				// Here, we want to deal with the listing of the names.
				if (order == "true") {
					// The order is set to true, which means that the grades should be listed in alphabetical order from A to Z.
					var array = await sort.name(db, true); // This is an external function that we have imported on line 1.
					log(array.join("\n")); // The function returns an array/list which we have to join to make it human readable.  The final output is logged into the console.
				} else if (order == "false") {
					// The order is set to false, which means that the grades should be listed in alphabetical order from Z to A.
					var array = await sort.name(db, false); // This is an external function that we have imported on line 1.
					log(array.join("\n")); // The function returns an array/list which we have to join to make it human readable.  The final output is logged into the console.
				}
			}
		} else {
			// args[1] was not either "grade" or "name", so we will begin to throw an error stating that incorrect arguments were provided.
			error("list", "Incorrect listing options!", "list [grade/name] <true/false>"); // // This is an error function that was imported into this file (see imports above).
			return; // The code is returned here. No further action should be done and the command should halt action.
		}
	},
};