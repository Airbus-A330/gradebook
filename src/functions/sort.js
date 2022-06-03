const chalk = require("chalk"); // External package used for terminal coloring. Source: https://www.npmjs.com/package/chalk

exports.grade = async (db, order) => {
	var array = [];
	var list = await db.list();
	var toPromise = list.map(async key => {
		// Creates a new array/list based on the values given. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
		const value = await db.get(key);
		return {
			key,
			value
		};
	});
	const data = await Promise.all(toPromise); // Iterates through a list of promises (database values in this case). Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
	var sorted = data.sort((a, b) => a.value - b.value); // This sorts the elements in numerical order (from least to greatest). Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	if (order == false) {
		// Nothing to do here as the list is in the format we want it.
	} else {
		sorted = sorted.reverse(); // As we want the array/list to display greatest to least, we will "reverse" the array/list. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
	}
	for (var i = 0; i < sorted.length; i++) {
		// Iterate through the "sorted" array/list and push the full element to the "array" variable.
		array.push(`${chalk.bold((array.length) + 1) + "."} ${chalk.blueBright(sorted[i].key)} — ${chalk.green(parseInt(sorted[i].value).toLocaleString())}`);
	}
	return array; // We return the array variable, the sorting by numerical grade has been complete!
}

exports.name = async (db, order) => {
	var list = await db.list();
	list = list.sort(); // This sorts the elements in alphabetical order. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	if (!order) {
		list.reverse(); // As we want the array/list to display the reverse alphabetical order, we will "reverse" the array/list. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
	}
	var array = []; // Declare a new list/array so we can push our final output to it.
	var maximumGrade = 0; // Set our maximum grade to 0 so we can compare it to the other grades that will come in through our database.
	for (var i = 0; i < list.length; i++) {
		// This for loop is meant to iterate through all the names from the "list" variable and get their grades through the database. It will then compare them to the "maximumGrade" variable to see which grade is higher in value.
		var grade = await db.get(`${list[i]}`); // This function gets the entry from the database.
		if (parseInt(grade) > parseInt(maximumGrade)) {
			// This if statement sees if the "grade" variable is greater than the current "maximumGrade" variable's value.
			maximumGrade = grade; // If it is greater, the "grade" value becomes the new "maximumGrade" variable's value.
		} else {
			continue; // If the variable "grade"'s value is less than the variable "maximumGrade"'s value, we will move on.
		}
	}
	for (var i = 0; i < list.length; i++) {
		// This for loop is meant for adding a trophy emoji to the highest grade according to the variable "maximumGrade"'s value.
		var value = await db.get(`${list[i]}`); // This function gets the entry from the database.
		if (value == maximumGrade) {
			// Here, the condition is met, the grade value is equal to the maximumGrade value, the trophy emoji is added as it is the highest grade.
			array.push(`${chalk.bold((array.length) + 1) + "."} ${chalk.blueBright(list[i])} — ${chalk.green(parseInt(value).toLocaleString())} 🏆`);
		} else {
			// Here, the condition is not met. No trophy emoji is added.
			array.push(`${chalk.bold((array.length) + 1) + "."} ${chalk.blueBright(list[i])} — ${chalk.green(parseInt(value).toLocaleString())}`);
		}
	}
	return array; // We return the array variable, the alphabetizer is complete!
}