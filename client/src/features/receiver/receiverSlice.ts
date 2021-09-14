import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// ...lol
import {TypesZ} from "../../../../types/index";
import {RootState} from "../../init/store";


export interface ReceiverState {
	messages: TypesZ.MessageReceivedList,
}



const initialState: ReceiverState = {
	messages: [],
};



export const receiverSlice = createSlice({
	name: "receiver",
	initialState,
	reducers: {
		// This can receive either one or multiple messages to add to the store
		addMessage: (state: ReceiverState, action: PayloadAction<TypesZ.MessageFromServer | TypesZ.MessageFromServer[]>) => {
			state.messages = state.messages.concat(action.payload);
		},
	},
});

/**
 *
 *
 * @param {RootState} state
 * @return {*}  {TypesZ.MessageReceivedList}
 */
export const selectMessages = (state: RootState): TypesZ.MessageReceivedList => state.receiver.messages;



export const {addMessage} = receiverSlice.actions;
export default receiverSlice.reducer;

// export const selectMessages = (state: RootState) => state.counter.value;
