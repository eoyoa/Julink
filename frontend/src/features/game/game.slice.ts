import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {decrementLetter, incrementLetter} from "./letter-utils.ts";

export interface GameState {
    readonly letters: string[],
    readonly canGenerateHints: boolean[]
}

const initialWord = "JULINK";
export const initialGameState: GameState = {
    letters: initialWord.split(""),
    canGenerateHints: new Array<boolean>(initialWord.length).fill(true)
}

function change(state: Draft<GameState>, index: number, changeFunction: (letter: string) => string) {
    state.letters[index] = changeFunction(state.letters[index]);
    if (index > 0)
        state.letters[index - 1] = changeFunction(state.letters[index - 1]);
    if (index < state.letters.length - 1)
        state.letters[index + 1] = changeFunction(state.letters[index + 1]);
}

export const gameSlice = createSlice({
    name: "letters",
    initialState: initialGameState,
    reducers: {
        increment: (state, {payload: index}: PayloadAction<number>) => {
            change(state, index, incrementLetter);
        },
        decrement: (state, {payload: index}: PayloadAction<number>) => {
            change(state, index, decrementLetter);
        },
        enableGeneration: (state, {payload: indices}: PayloadAction<number[]>) => {
            for (const index of indices) {
                state.canGenerateHints[index] = true;
            }
        },
        disableGeneration: (state, {payload: index}: PayloadAction<number>) => {
            state.canGenerateHints[index] = false;
        },
    }
})

export const {
    increment,
    decrement,
    enableGeneration,
    disableGeneration
} = gameSlice.actions;
export default gameSlice.reducer;