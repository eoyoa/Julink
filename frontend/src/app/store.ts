import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/game.slice.ts';

const rootReducer = combineReducers({
    game: gameReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
