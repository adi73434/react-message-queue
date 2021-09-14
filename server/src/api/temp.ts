// -----------------------------------------------------------------------------
// External
import express from "express";
import {body} from "express-validator";
import {MysqlError} from "mysql";
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Internal
import {TypesZ} from "../../../types/index";
import {makeDbConn} from "../util/dbconn";
// -----------------------------------------------------------------------------


// eslint-disable-next-line
const routerApi = express.Router();


routerApi.get("/message/list", (req: express.Request, res: express.Response) => {
	makeDbConn().query("SELECT * FROM messages WHERE 1", (err: MysqlError | null, result: TypesZ.MessageFromServer[]) => {
		if (err) throw err;
		res.send(result);
	});
});

routerApi.get("/message/:id", (req: express.Request, res: express.Response) => {
	makeDbConn().query("SELECT * FROM messages WHERE id = ?", [req.params["id"]], (err: MysqlError | null, result: TypesZ.MessageFromServer[]) => {
		if (err) throw err;
		res.send(result);
	});
});

routerApi.post("/message/add", (req: express.Request, res: express.Response) => {
	makeDbConn().query("SELECT * FROM messages WHERE 1", (err: any, result: any) => {
		if (err) throw err;

		res.send(result);
	});
});



export default routerApi;
