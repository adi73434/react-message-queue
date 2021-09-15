// -----------------------------------------------------------------------------
// External
import express, {Response, response} from "express";
import {body} from "express-validator";
import {ServerResponse} from "http";
import {MysqlError} from "mysql";
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Internal
import {Typez, ServerUserErrors} from "../../../types/index";
// import ServerUserErrors from "../serverErrorsd.ts";
import {makeDbConn} from "../util/dbconn";
import {jsTimeToMysqlDatetime} from "../util/conversions";
// -----------------------------------------------------------------------------


// eslint-disable-next-line
const routerApi = express.Router();


routerApi.get("/message/list", (req: express.Request, res: express.Response) => {
	makeDbConn().query("SELECT id FROM messages WHERE 1", (err: MysqlError | null, result: Array<{id: number}>) => {
		if (err) throw err;
		const flatList: number[] = [];
		// Loop over the RowDataPacket objects and get their values into the flat array
		for (const key in result) {
			if (Object.prototype.hasOwnProperty.call(result, key)) {
				const element = result[key];
				flatList.push(element.id);
			}
		}
		res.status(200).send(JSON.stringify(flatList));
		res.end();
	});
});

routerApi.get("/message/:id", (req: express.Request, res: express.Response) => {
	makeDbConn().query("SELECT * FROM messages WHERE id = ?", [req.params["id"]], (err: MysqlError | null, result: Typez.MessageFromServer) => {
		if (err) throw err;
		// res.status(200).send(result);
		// res.send(JSON.stringify({msg: "test"}));
		res.send("test2");
		res.end();
	});
});


routerApi.post("/message/add", (req: express.Request, res: express.Response) => {
	// console.log(JSON.parse(req.body));
	console.log("/message/add", req.body);
	// I don't know if this is how I should be handling "errors" or "bad requests"
	if (req.body["text"] === undefined) {
		const msg: ServerUserErrors.Response = {
			type: "MISSING_REQUIRED_FIELD",
			errorConcerns: "Text",
			desc: "Missing text",
			request: "/message/add",
		};
		res.status(400).json({status: "error", error: msg});
		res.end();
		return;
	}
	else if (req.body["text"].length < 4) {
		const msg: ServerUserErrors.Response = {
			type: "REQUIRED_FIELD_TOO_SHORT",
			errorConcerns: "Text",
			desc: "Missing text",
			request: "/message/add",
		};
		res.status(400).json({status: "error", error: msg});
		res.end();
		return;
	}

	const sqlTime = jsTimeToMysqlDatetime(req.body["sent_date"]);

	// The message ID in the db does not actually match that of the sender's auto-increment.
	makeDbConn().query("INSERT into messages (id, text, sent_date) VALUES (?, ?, ?)", [null, req.body["text"], sqlTime], (err: any, result: any) => {
		// I don't know if the response should be ended before throwing an error if there is an error.
		if (err) throw err;
		// To my knowledge, returning json here is unnecssary, but then the JSON-expecting client
		// would throw an error. I put a note about this (with the workaround) in commitMessage in senderSlice
		res.status(200).json({status: "success"});
		res.end();
	});
});



export default routerApi;
