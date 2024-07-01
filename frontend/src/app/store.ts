import {combineReducers, configureStore} from "@reduxjs/toolkit";
import hintsReducer from "../features/hints/hints.slice";
import lettersReducer from "../features/letters/letters.slice";

const rootReducer = combineReducers({
    hints: hintsReducer,
    letters: lettersReducer
});

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];