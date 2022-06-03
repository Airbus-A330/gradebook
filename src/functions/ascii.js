const f = require("figlet"); // We are using the external package "figlet" to create ASCII art. Source: https://github.com/patorjk/figlet.js#readme

const asciiLog = async (text) => {
	var data = await f.textSync(text); // textSync method from figlet.
	return data; // Return synchronous data (in a promise).
}

module.exports = asciiLog;