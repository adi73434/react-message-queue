import {createSlice} from "@reduxjs/toolkit";



export interface MessageItem {
	text: string,
	date: Date,
}

export interface SentLogState {
	messages: MessageItem[],
}



const initialState: SentLogState = {
	messages: [],
};



export const sentLogSlice = createSlice({
	name: "sender",
	initialState,
	reducers: {
		addMessage: (state) => {
			// This adds the message to the store
		},
	},
});



export default sentLogSlice.reducer;
