import mysql from "mysql";





/**
 * Helper function to return a mysql db connection
 *
 * @return {*}  {Promise<mysql.Connection>}
 */
const makeDbConn = (): mysql.Connection => {
	// return dbconn.connect("mongodb://localhost:27017/node_todo");
	const dbconn = mysql.createConnection({
		host: "localhost",
		user: "airi",
		password: "password",
		database: "message_queue",
	});

	return dbconn;
};



export {
	makeDbConn,
};
