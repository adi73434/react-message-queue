import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ServerUserErrors, Typez} from "../../../../types/index";
import {useAppDispatch} from "../../init/hooks";
import {RootState, store} from "../../init/store";


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
		prepareMessageSend: (state: SenderState, action: PayloadAction<Typez.MessageInSenderQueue>) => {
			// This adds the message to the store
			state.messages.push(action.payload);
		},
		cancelMessage: (state, action: PayloadAction<number>) => {
			console.log(action.payload);
			// User chose to cancel the message, remove from store cleanly
			// if (msg.id === action.payload) {
			state.messages = state.messages.filter((item) => item.id !== action.payload);
		},
		// Send the message. This expects to receive the ID of the message,
		// based on the sender increment in the sender component
		// This commits the message to the server. It will be removed after the server replies that
		// all is good
		commitMessage: (state, action: PayloadAction<number>) => {
			let stateIndexOfMessageToSend: number | undefined = undefined;
			// Loop over the messages until the desired message is found.
			// When the return is false, that prompts every to stop looking,
			// so return false is used when the *desired* properties are found
			state.messages.every((msg, idx) => {
				if (msg.id !== action.payload) {
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

			state.messages[stateIndexOfMessageToSend].sending = true;

			// Send data. If server returns a-ok, remove this msg from this store and add it to sentLogSlice
			fetch(process.env.REACT_APP_API_URI + "message/add", {
				method: "POST",
				credentials: "omit",
				headers: {
					"Accept": "application/json, text/plain, */*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text: state.messages[stateIndexOfMessageToSend].text,
					sent_date: state.messages[stateIndexOfMessageToSend].sent_date,
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

					// Here, stuff is presumably all good, so follow through with store actions
				});

			// state.messages = state.messages.filter((item) => item.id !== action.payload);
		},
	},
});



/**
 *
 *
 * @param {RootState} state
 * @return {*}  {TypesZ.MessageSenderQueue}
 */
export const selectMessages = (state: RootState): Typez.MessageSenderQueue => state.sender.messages;




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



export const {prepareMessageSend, cancelMessage, commitMessage} = senderSlice.actions;
export default senderSlice.reducer;
