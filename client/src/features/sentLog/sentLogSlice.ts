import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
		addMessage: (state, action: PayloadAction<TypesZ.MessageInSentLog>) => {
			// This adds the message to the store
			state.messages.push(action.payload);
		},
	},
});



export default sentLogSlice.reducer;
