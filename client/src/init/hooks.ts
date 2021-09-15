// -----------------------------------------------------------------------------
// This file taken/dataped from create-react-app --template redux-typescript
// -----------------------------------------------------------------------------

import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {RootState, AppDispatch} from "./store";



/**
 * Use this instead of useDipatch.
 *
 * I statically typed this based on VSCode's inferred type, so I don't know if the return
 * type is actually correct.
 *
 * @return {*}  {ThunkDispatch<{ counter: unknown; }, null, AnyAction>}
 */
// export const useAppDispatch = (): ThunkDispatch<{ counter: unknown; }, null, AnyAction> => useDispatch<AppDispatch>();

/**
 * I had an issue with the typing on the above useAppDispatch, so I just used this which is how it
 * was in the redux/react/typescript template
 *
 * @return {*}  {*}
 */
export const useAppDispatch = (): any => useDispatch<AppDispatch>();

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
