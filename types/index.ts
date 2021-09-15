// -----------------------------------------------------------------------------
// NOTE
// FIXME
// and a general developer warning:
// You cannot use enums in this file:
// - React will tell you that the file resides outside of the src/ dir, but
// it does not complain about that for anything else in here thus far
// - The server complains that this is a CommonJS file, but this, again,
// only occurs for enums.
// Basically, don't use enums in here.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// NOTE: The Z in TypesZ is just for uniqueness, just in case
// I decided to use this file for common types for the server and client.
// Probably a bad idea now that I think about it, or at least annoying to get used to.
// -----------------------------------------------------------------------------
export namespace Typez {
	export interface MessageBasic {
		id: number,
		text: string,
	}

	export interface MessageInSenderQueue extends MessageBasic {
		// eslint-disable-next-line
		sent_date: number,
		attemptedToSend?: boolean,
		cancelledByUser?: boolean,
		sending: boolean,
	}

	export interface MessageInSentLog extends MessageBasic {
		// eslint-disable-next-line
		sent_date: number,
	}

	export interface MessageFromServer extends MessageBasic {
		// eslint-disable-next-line
		sent_date: number,
		// This would be extended with stuff like "marked_as_read", which
		// would not be necessary for the MessageInSenderQueue or MessageInSentLog,
		// hence why I split this
	}

	// See: https://stackoverflow.com/a/41690796/13310905
	export interface MessageSenderQueue extends Array<MessageInSenderQueue> {};
	export interface MessageSentLog extends Array<MessageInSentLog> {};
	export interface MessageReceivedList extends Array<MessageFromServer> {};	
}
export namespace ServerUserErrors {

	
	export interface Response {
		type: "MISSING_REQUIRED_FIELD" | "REQUIRED_FIELD_TOO_SHORT",
		errorConcerns?: string,
		desc: string,
		request: string,
	}
}
