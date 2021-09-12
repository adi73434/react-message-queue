// -----------------------------------------------------------------------------
// External
import express from "express";
// -----------------------------------------------------------------------------

const app = express();

app.get("/test", (req: express.Request, res: express.Response) => {
	res.status(200).send("Hello World!!!");
});


app.listen(3010, () => {
	console.log("Example app listening on port 3010!");
});

export default app;
