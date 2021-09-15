import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// ...lol
import {Typez} from "../../../../types/index";
import {AppThunk, RootState} from "../../init/store";


export interface ReceiverState {
	messages: Typez.MessageReceivedList,
	neededMessages: number[]
}



const initialState: ReceiverState = {
	messages: [],
	neededMessages: [],
};



export const receiverSlice = createSlice({
	name: "receiver",
	initialState,
	reducers: {
		// This can receive either one or multiple messages to add to the store
		addMessage: (state: ReceiverState, action: PayloadAction<Typez.MessageFromServer | Typez.MessageFromServer[]>) => {
			state.messages = state.messages.concat(action.payload);
		},
		addNeededMessage: (state: ReceiverState, action: PayloadAction<number | number[]>) => {
			state.neededMessages = state.neededMessages.concat(action.payload);
		},
	},
});

/**
 *
 *
 * @param {RootState} state
 * @return {*}  {TypesZ.MessageReceivedList}
 */
export const selectMessages = (state: RootState): Typez.MessageReceivedList => state.receiver.messages;


/**
 * Check if new messages exist on the server and add them to the store if they do.
 *
 *
 * @return {*}  {AppThunk}
 */
export const checkNewMessages = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	fetch(process.env.REACT_APP_API_URI + "message/list", {
		method: "GET",
		// mode: "cors",
		// credentials: "omit",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status === "success") {
				// console.log(data.list);
				// state.receiver.messages.forEach((recMsg) => {
				// 	if ()
				// });

				// Filter creates new array with all items that pass the test inside
				// const neededMessages = data.list.filter((newMsg: number) => {
				// ONLY add new neededMessages if:
				// - they are *not* already part of the already received messages; and
				// - they are *not* already part of the needed messages, neg 1.
				// NOTE: This implementation relied on the PK in the DB starting at 1 (hence neg 1),
				// and that it never skips a key.
				// return !state.receiver.messages[newMsg] && !state.receiver.neededMessages[newMsg];

				// });

				// See: https://stackoverflow.com/a/9736915
				const alreadyReceived: {[key: number]: boolean} = {};
				const alreadyQueued: {[key: number]: boolean} = {};

				// Generate "hash maps" of the already received and queued-for-receiving messages,
				// or whatever
				state.receiver.messages.forEach((msg) => {
					alreadyReceived[msg.id] = true;
				});
				state.receiver.neededMessages.forEach((msgId) => {
					alreadyQueued[msgId] = true;
				});

				// Filter out and keep only messages that have been neither received nor queued
				const neededMessages = data.list.filter((msgId: number) => {
					return !alreadyReceived[msgId] && !alreadyQueued[msgId];
				});

				console.log("Needed Messages: " + neededMessages);
				dispatch(addNeededMessage(neededMessages));
				console.log(state.receiver.neededMessages);
			}
		});
};



export const {addMessage, addNeededMessage} = receiverSlice.actions;
export default receiverSlice.reducer;

// export const selectMessages = (state: RootState) => state.counter.value;
