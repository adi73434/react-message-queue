import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ServerUserErrors, Typez} from "../../../../types/index";
import {useAppDispatch} from "../../init/hooks";
import {AppThunk, RootState} from "../../init/store";
import {logSentMessage} from "../sentLog/sentLogSlice";


export interface SenderState {
	messages: Typez.MessageSenderQueue,
}



const initialState: SenderState = {
	messages: [],
};



export const senderSlice = createSlice({
	name: "sender",
	initialState,
	reducers: {
		// Add the message to the list of messages to send
		addMessageToSend: (state: SenderState, action: PayloadAction<Typez.MessageInSenderQueue>) => {
			// This adds the message to the store
			state.messages.push(action.payload);
		},
		removeMessage: (state, action: PayloadAction<number>) => {
			// User chose to cancel the message, remove from store cleanly
			// if (msg.id === action.payload) {
			state.messages = state.messages.filter((item) => item.id !== action.payload);
		},
		setMesageSending: (state, action: PayloadAction<{messageId: number, status: boolean}>) => {
			state.messages[action.payload.messageId].sending = action.payload.status;
		},

		// removeMessage: (state, action: PayloadAction<number>) => {

		// },
	},
});



/**
 *
 *
 * @param {RootState} state
 * @return {*}  {TypesZ.MessageSenderQueue}
 */
export const selectMessages = (state: RootState): Typez.MessageSenderQueue => state.sender.messages;



/**
 * Send the message. This expects to receive the ID of the message,
 * based on the sender increment in the sender component
 * This commits the message to the server. It will be removed after the server replies that
 * all is good
 *
 * @param {number} messageId
 * @return {*}
 */
export const commitMessage = (messageId: number): AppThunk => (dispatch, getState) => {
	let stateIndexOfMessageToSend: number | undefined = undefined;
	// Loop over the messages until the desired message is found.
	// When the return is false, that prompts every to stop looking,
	// so return false is used when the *desired* properties are found
	const state = getState();
	state.sender.messages.every((msg, idx) => {
		if (msg.id !== messageId) {
			return true;
		}

		if (!msg.cancelledByUser) {
		// This is used to know the index, and to keep track of whether or not
		// the item exists and this can continue... though it should
			stateIndexOfMessageToSend = idx;
			return false;
		}
	});

	if (stateIndexOfMessageToSend === undefined) {
		return;
	}

	dispatch(setMesageSending({messageId: stateIndexOfMessageToSend, status: true}));

	// Send data. If server returns a-ok, remove this msg from this store and add it to sentLogSlice
	fetch(process.env.REACT_APP_API_URI + "message/add", {
		method: "POST",
		credentials: "omit",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			text: state.sender.messages[stateIndexOfMessageToSend].text,
			sent_date: state.sender.messages[stateIndexOfMessageToSend].sent_date,
		}),
	})
		.then((response) => {
		// "What the fuck": https://stackoverflow.com/a/47267312/13310905
			response.json().then((data) => {
				({status: response.status, body: data});
			});
		})
		.then((data: any) => {
			if (status === "400") {
			// If status is 400, we know it was an error, so re-type it
				const errData = data.error as ServerUserErrors.Response;
				if (errData.type === "MISSING_REQUIRED_FIELD") {
					alert("Missing required field: " + errData.errorConcerns);
				}
				else if (errData.type === "REQUIRED_FIELD_TOO_SHORT") {
					alert(errData.errorConcerns + "is too short (must be 4 or longer)");
				}
				return;
			}

			// For some reason typescript was comaplioning about it potentially being
			// undefined even though I literally check above
			if (stateIndexOfMessageToSend === undefined) {
				return;
			}

			// Add message to sent log then remove from this store
			dispatch(logSentMessage({
				id: state.sender.messages[stateIndexOfMessageToSend].id,
				text: state.sender.messages[stateIndexOfMessageToSend].text,
				sent_date: state.sender.messages[stateIndexOfMessageToSend].sent_date,
			}));
			dispatch(removeMessage(stateIndexOfMessageToSend));
		});
};
// state.messages = state.messages.filter((item) => item.id !== action.payload);


// export const selectWasMessageCancelled = (state: RootState, msgId: number): boolean => {
// 	let wasCancelled = false;
// 	// What a mess.
// 	// This checks if the specified message ID has been cancelled or not
// 	// Every stops/breaks when the return is false; hence, return false when the correct
// 	// item was found
// 	state.sender.messages.every((msg) => {
// 		if (msg.id === msgId) {
// 			if (msg.cancelledByUser === undefined ) {
// 				wasCancelled = false;
// 			}
// 			else {
// 				wasCancelled = msg.cancelledByUser;
// 			}
// 			return false;
// 		}
// 	});
// 	return wasCancelled;
// };



export const {addMessageToSend, removeMessage, setMesageSending} = senderSlice.actions;
export default senderSlice.reducer;
