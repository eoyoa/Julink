import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;