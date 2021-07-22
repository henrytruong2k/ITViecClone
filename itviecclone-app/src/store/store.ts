import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import jobReducer from "../containers/pages/Home/jobSlice";
import favoriteReducer from "../containers/pages/Home/favoriteJobSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
