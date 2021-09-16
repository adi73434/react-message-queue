// -----------------------------------------------------------------------------
// This file taken/dataped from create-react-app --template redux-typescript
// -----------------------------------------------------------------------------

import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import receiverSlice from "../features/receiver/receiverSlice";
import senderSlice from "../features/sender/senderSlice";
import sentLogSlice from "../features/sentLog/sentLogSlice";

// import thunk from "redux-thunk";


export const store = configureStore({
	reducer: {
		receiver: receiverSlice,
		sender: senderSlice,
		sentLog: sentLogSlice,
	},
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
