import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// ...lol
import {Typez} from "../../../../types/index";
import {AppThunk, RootState} from "../../init/store";


export interface ReceiverState {
	messages: Typez.MessageReceivedList,
}



const initialState: ReceiverState = {
	messages: [],
};



export const receiverSlice = createSlice({
	name: "receiver",
	initialState,
	reducers: {
		// This can receive either one or multiple messages to add to the store
		addMessage: (state: ReceiverState, action: PayloadAction<Typez.MessageFromServer | Typez.MessageFromServer[]>) => {
			state.messages = state.messages.concat(action.payload);
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
	fetch(process.env.REACT_APP_API_URI + "message/list", {
		method: "GET",
		// mode: "cors",
		// credentials: "omit",
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.text())
		.then((data) => {
			console.log(data);
		});
};



export const {addMessage} = receiverSlice.actions;
export default receiverSlice.reducer;

// export const selectMessages = (state: RootState) => state.counter.value;
