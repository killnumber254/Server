const server = require("./app");

const PORT = process.env.PORT || 3002;
require("./db/index");

server.listen(PORT, (err) => {
	if (err) {
		throw err;
	}
	console.log("start server", PORT);
});
