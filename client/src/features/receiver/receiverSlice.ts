import {createSlice} from "@reduxjs/toolkit";

// ...lol
import {TypesZ} from "../../../../types/index";


export interface ReceiverState {
	messages: TypesZ.MessageReceivedList,
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
