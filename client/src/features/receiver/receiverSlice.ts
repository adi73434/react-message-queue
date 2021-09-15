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
		addToQueue: (state: ReceiverState, action: PayloadAction<number | number[]>) => {
			state.neededMessages = state.neededMessages.concat(action.payload);
		},
		removeFromQueue: (state: ReceiverState, action: PayloadAction<number[]>) => {
			// "hashmap" to keep track of fetched items
			const alreadyFetched: {[key: number]: boolean} = {};

			// With the way this works. alreadyFetched directly "maps"
			// to the action.payload[x] msgId, so if the msgId within the payload
			// has been "mapped" as true (existing in the received state), it can
			// be discarded from needed
			state.messages.forEach((msg) => {
				alreadyFetched[msg.id] = true;
			});

			state.neededMessages = action.payload.filter((msgId: number) => {
				return alreadyFetched[msgId];
			});
		},
		wipeQueue: (state: ReceiverState) => {
			state.neededMessages = [];
		},
		clearMessages: (state: ReceiverState) => {
			state.messages = [];
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
 * Check if new messages exist on the server and add their IDs to the store.
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

				dispatch(addToQueue(neededMessages));
			}
		});
};


/**
 *
 *
 * @return {*}  {AppThunk}
 */
export const clearMessagesClientAndServer = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	fetch(process.env.REACT_APP_API_URI + "message/all", {
		method: "DELETE",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.status === "success") {
				// TODO: I think there could/would be a condition where a fetch is made and new messages
				// get stored after these get dispatched.
				// I really can't be bothered accounting for that rn, though
				dispatch(wipeQueue());
				dispatch(clearMessages());
			}
		});
};

/**
 * Fetch the new needed messages in the store and store the full message data
 *
 * @return {*}  {AppThunk}
 */
export const receiveNewMessages = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	if (state.receiver.neededMessages.length < 1) {
		return;
	}

	console.log(process.env.REACT_APP_API_URI + "message/" + JSON.stringify(state.receiver.neededMessages));

	fetch(process.env.REACT_APP_API_URI + "message/" + state.receiver.neededMessages, {
		method: "GET",
		// mode: "cors",
		// credentials: "omit",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		// body: JSON.stringify({
		// 	idList: state.receiver.neededMessages,
		// }),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.status === "success") {
				console.log("AAAAAAAAAAA");
				dispatch(addMessage(data.list));
				dispatch(removeFromQueue(data.list));
			}
		});
};



export const {addMessage, addToQueue, removeFromQueue, wipeQueue, clearMessages} = receiverSlice.actions;
export default receiverSlice.reducer;

// export const selectMessages = (state: RootState) => state.counter.value;
