// EXTERNAL PACKAGES
const chalk = require("chalk"); // Source: https://www.npmjs.com/package/chalk
const fs = require("fs"); // Native with node.js
const Database = require("@replit/database"); // Source: https://www.npmjs.com/package/@replit/database

// CUSTOM INTERNAL PACKAGES
const ascii = require("./functions/ascii.js");
const log = require("./functions/log.js");
const error = require("./functions/error.js");

// INITIALIZATION
const db = new Database();
var commands = new Map(); // This object holds complex key, value pairs. We will use this to store our commands. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

(async () => {
	// As we want the following promises to execute in order, we need to use async/await. You need to add an async function here in order for await to be useable.
	const data = await ascii("GRADEBOOK");
	await log(chalk.blue.bold(data));
	await log(chalk.red.bold("PROTIP: ") + chalk.green("Type `help` to view a list of all commands!"));
})();

const commandFiles = fs.readdirSync(`${__dirname}/commands/`).filter(file => file.endsWith('.js')); // Here, we use the "fs" module to find all the files in the directory of "commands/". It will return an array/list.
for (const file of commandFiles) {
	// For all files in the commandFiles array, we will use Map.set() to add this key, value system to our map.
	const command = require(`./commands/${file}`); // As we are exporting a Javascript file, we can use "require" to get its contents.
	commands.set(command.name, command); // Adds a value to the map. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
}

process.stdin.on("data", async (data) => {
	// As we are accepting a constant stream of input into the console, we will use the native process stdin event. Source: https://nodejs.org/api/process.html#process_process_stdin
	const args = data.toString().replace("\n", "").split(" "); // We want to turn our input into separate arguments (an array/list of them). We will split the entire phrase by spaces.
	const command = args[0]; // The command we are using is the first index of the "args" array.
	if (!commands.has(command)) return; // This checks to see if the command exists by using Map.has() to search the map for the command. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
	try {
		commands.get(command).execute(chalk, ascii, log, data, fs, db, args, error); // We have fetched the command from the map and we will use execute to execute the function inside the command that makes everything work.
	} catch (error) {
		console.log(error); // If there is an error with executing the command, it will be logged into the console. With proper error handling in place, this should rarely happen.
	}
});