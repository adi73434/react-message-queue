// -----------------------------------------------------------------------------
// External
import express from "express";
// -----------------------------------------------------------------------------

import routerApi from "./api/main";



const app = express();


app.use(express.json());

// See: https://stackoverflow.com/a/18311469/13310905
// Add headers before the routes are defined
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

	// Request methods you wish to allow
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

	// Request headers you wish to allow
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", "true");

	// Pass to next layer of middleware
	next();
});

app.get("/test", (req: express.Request, res: express.Response) => {
	res.status(200).send("Hello World!!!");
});

app.use("/", routerApi);


app.listen(3010, () => {
	console.log("Example app listening on port 3010!");
});

export default app;
