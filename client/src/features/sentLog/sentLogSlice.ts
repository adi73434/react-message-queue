import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Typez} from "../../../../types/index";
import {RootState} from "../../init/store";



export interface SentLogState {
	messages: Typez.MessageSentLog
}



const initialState: SentLogState = {
	messages: [],
};



export const sentLogSlice = createSlice({
	name: "sentLog",
	initialState,
	reducers: {
		logSentMessage: (state, action: PayloadAction<Typez.MessageInSentLog>) => {
			// This adds the message to the store
			state.messages.push(action.payload);
		},
	},
});



/**
 * Retrieve all of the sent messages
 *
 * @param {RootState} state
 * @return {*}  {Typez.MessageSenderQueue}
 */
export const selectSentMessages = (state: RootState): Typez.MessageSentLog => state.sentLog.messages;


export const {logSentMessage} = sentLogSlice.actions;
export default sentLogSlice.reducer;
