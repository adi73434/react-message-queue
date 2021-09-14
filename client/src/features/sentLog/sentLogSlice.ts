import {createSlice} from "@reduxjs/toolkit";

import {TypesZ} from "../../../../types/index";



export interface SentLogState {
	messages: TypesZ.MessageSentLog
}



const initialState: SentLogState = {
	messages: [],
};



export const sentLogSlice = createSlice({
	name: "sentLog",
	initialState,
	reducers: {
		addMessage: (state) => {
			// This adds the message to the store
		},
	},
});



export default sentLogSlice.reducer;
