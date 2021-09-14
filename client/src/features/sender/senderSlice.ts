import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {TypesZ} from "../../../../types/index";
import {RootState, store} from "../../init/store";


export interface SenderState {
	messages: TypesZ.MessageSenderQueue,
}



const initialState: SenderState = {
	messages: [],
};



export const senderSlice = createSlice({
	name: "sender",
	initialState,
	reducers: {
		// Add the message to the list of messages to send
		prepareMessageSend: (state: SenderState, action: PayloadAction<TypesZ.MessageInSenderQueue>) => {
			// This adds the message to the store
			state.messages.push(action.payload);
			// setTimeout(() => {
			// if ()
			// }, 1000);
		},
		cancelMessage: (state, action: PayloadAction<number>) => {
			console.log(action.payload);
			// User chose to cancel the message, remove from store cleanly
			// if (msg.id === action.payload) {
			state.messages = state.messages.filter((item) => item.id !== action.payload);
		},
		commitMessage: (state) => {
			// This commits the message to the server. It will be removed after the server replies that
			// all is good
		},
	},
});

/**
 *
 *
 * @param {RootState} state
 * @return {*}  {TypesZ.MessageSenderQueue}
 */
export const selectMessages = (state: RootState): TypesZ.MessageSenderQueue => state.sender.messages;



export const {prepareMessageSend, cancelMessage, commitMessage} = senderSlice.actions;
export default senderSlice.reducer;
