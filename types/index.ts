

// -----------------------------------------------------------------------------
// NOTE: The Z in TypesZ is just for uniqueness, just in case
// I decided to use this file for common types for the server and client.
// Probably a bad idea now that I think about it, or at least annoying to get used to.
// -----------------------------------------------------------------------------
export namespace TypesZ {
	export interface MessageBasic {
		id: number,
		text: string,
	}

	export interface MessageInSenderQueue extends MessageBasic {
		// eslint-disable-next-line
		sent_date?: number,
		attemptedToSend: boolean
	}

	export interface MessageInSentLog extends MessageBasic {
		// eslint-disable-next-line
		sent_date: number,
	}

	export interface MessageFromServer extends MessageBasic {
		// eslint-disable-next-line
		sent_date: numberZZ,
		// This would be extended with stuff like "marked_as_read", which
		// would not be necessary for the MessageInSenderQueue or MessageInSentLog,
		// hence why I split this
	}



	// See: https://stackoverflow.com/a/41690796/13310905
	export interface MessageSenderQueue extends Array<MessageInSenderQueue> {};
	export interface MessageSentLog extends Array<MessageInSentLog> {};
	export interface MessageReceivedList extends Array<MessageFromServer> {};
}
