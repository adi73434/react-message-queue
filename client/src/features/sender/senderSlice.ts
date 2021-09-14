import {createSlice} from "@reduxjs/toolkit";

import {TypesZ} from "../../../../types/index";


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
