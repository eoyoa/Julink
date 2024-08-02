import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { decrementLetter, incrementLetter } from './letter/letter-utils.ts';

export enum GameStatus {
    IN_PROGRESS,
    LOADING,
    WON,
    LOST,
}

export interface GameState {
    letters: string[];
    canGenerateHints: boolean[];
    clicks: number;
    status: GameStatus;
}

const initialWord = 'JULINK';
export const initialGameState: GameState = {
    letters: initialWord.split(''),
    canGenerateHints: new Array<boolean>(initialWord.length).fill(true),
    clicks: 0,
    status: GameStatus.IN_PROGRESS,
};

function change(
    state: Draft<GameState>,
    index: number,
    changeFunction: (letter: string) => string
) {
    state.letters[index] = changeFunction(state.letters[index]);
    if (index > 0)
        state.letters[index - 1] = changeFunction(state.letters[index - 1]);
    if (index < state.letters.length - 1)
        state.letters[index + 1] = changeFunction(state.letters[index + 1]);

    state.clicks++;
}

export const gameSlice = createSlice({
    name: 'letters',
    initialState: initialGameState,
    reducers: {
        increment: (state, { payload: index }: PayloadAction<number>) => {
            change(state, index, incrementLetter);
        },
        decrement: (state, { payload: index }: PayloadAction<number>) => {
            change(state, index, decrementLetter);
        },
        enableGeneration: (
            state,
            { payload: indices }: PayloadAction<number[]>
        ) => {
            for (const index of indices) {
                state.canGenerateHints[index] = true;
            }
        },
        disableGeneration: (
            state,
            { payload: index }: PayloadAction<number>
        ) => {
            state.canGenerateHints[index] = false;
        },
        setStatus: (
            state,
            { payload: newStatus }: PayloadAction<GameStatus>
        ) => {
            state.status = newStatus;
        },
    },
});

export const {
    increment,
    decrement,
    enableGeneration,
    disableGeneration,
    setStatus,
} = gameSlice.actions;
export default gameSlice.reducer;
