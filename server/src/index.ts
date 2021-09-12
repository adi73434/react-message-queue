// -----------------------------------------------------------------------------
// External
import express from "express";
// -----------------------------------------------------------------------------

const app = express();

app.get("/test", (req: express.Request, res: express.Response) => {
	res.status(200).send("Hello World!!!");
});


/**
 * typedoc test
 *
 * @param {string} a
 */
export const asdf = (a: string): void => {
	console.log(a)
	;
};


app.listen(3010, () => {
	console.log("Example app listening on port 3010!");
});

export default app;
