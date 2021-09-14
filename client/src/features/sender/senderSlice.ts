import {createSlice} from "@reduxjs/toolkit";



export interface MessageItem {
	text: string,
	date: Date,
	attemptedSendToServer: boolean,
}

export interface SenderState {
	messages: MessageItem[],
}



const initialState: SenderState = {
	messages: [],
};



export const senderSlice = createSlice({
	name: "sender",
	initialState,
	reducers: {
		addMessage: (state) => {
			// This adds the message to the store
		},
		cancelMessage: (state) => {
			// User chose to cancel the message, remove from store cleanly
		},
		commitMessage: (state) => {
			// This commits the message to the server. It will be removed after the server replies that
			// all is good
		},
	},
});



export default senderSlice.reducer;
