import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {decrement, increment} from "./letter-utils.ts";

interface LettersState {
    letters: string[],
    canGenerateHints: boolean[]
}

const initialWord = "JULINK";
const initialState: LettersState = {
    letters: initialWord.split(""),
    canGenerateHints: new Array<boolean>(initialWord.length).fill(true)
}

function change(state: Draft<LettersState>, index: number, changeFunction: (letter: string) => string) {
    state.letters[index] = changeFunction(state.letters[index]);
    if (index > 0)
        state.letters[index - 1] = changeFunction(state.letters[index - 1]);
    if (index < state.letters.length - 1)
        state.letters[index + 1] = changeFunction(state.letters[index + 1]);
}

export const lettersSlice = createSlice({
    name: "letters",
    initialState,
    reducers: {
        increment: (state, {payload: indices}: PayloadAction<number[]>) => {
            for (const index of indices) {
                change(state, index, increment);
            }
        },
        decrement: (state, {payload: indices}: PayloadAction<number[]>) => {
            for (const index of indices) {
                change(state, index, decrement);
            }
        },
        enableGeneration: (state, {payload: indices}: PayloadAction<number[]>) => {
            for (const index of indices) {
                state.canGenerateHints[index] = true;
            }
        },
        disableGeneration: (state, {payload: indices}: PayloadAction<number[]>) => {
            for (const index of indices) {
                state.canGenerateHints[index] = false;
            }
        },
    }
})