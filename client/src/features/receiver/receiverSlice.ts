import {createSlice} from "@reduxjs/toolkit";

// ...lol
import {TypesZ} from "../../../../types/index";
import {RootState} from "../../init/store";


export interface ReceiverState {
	messages: TypesZ.MessageReceivedList,
}



const initialState: ReceiverState = {
	messages: [
		{
			id: 0,
			text: "asdf",
			sent_date: new Date().getDate(),
		},
	],
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

// export const selectMessages = (state: RootState) => state.counter.value;
