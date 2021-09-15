import {ServerUserErrors} from "../../types/index";

// -----------------------------------------------------------------------------
// NOTE:
// I was fiddling with trying to merge the namespace/interface of the Express.Response json
// -----------------------------------------------------------------------------


// declare namespace Express {
// 	// Response<any, Record<string, any>, number>.json: (body?: any)
// 	export interface Response {
// 		error?: ServerUserErrors.Response
// 	}
//  }




// thing, so that any "error" object needs to match the defined ServerUserError, but I couldn't get it to work

// eslint-disable-next-line @typescript-eslint/no-namespace
// declare global {

// 	type resError = {
// 		error: number,
// 	}

// 	type Send<ResBody = resError, T = Response<ResBody>> = (body: ResBody) => T;

// 		// Response<any, Record<string, any>, number>.json: (body?: any)
// 		interface Response<
// 		ResBody = resError,
// 		Locals extends Record<string, any> = Record<string, any>,
// 		StatusCode extends number = number
// 	> extends ServerResponse,
// 			Express.Response {

// 				json: Send<ResBody, this>;
// 			}
// }
