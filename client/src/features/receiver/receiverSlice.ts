import {createSlice} from "@reduxjs/toolkit";



export interface MessageItem {
	text: string,
	date: Date,
}

export interface ReceiverState {
	messages: MessageItem[],
}



const initialState: ReceiverState = {
	messages: [],
};



export const receiverSlice = createSlice({
	name: "sender",
	initialState,
	reducers: {
		addMessage: (state) => {
			// This adds the message to the store
		},
	},
});



export default receiverSlice.reducer;
