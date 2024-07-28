import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Hint = LetterHint[];

export interface LetterHint {
    readonly type: HintType,
    readonly char: string
}

export enum HintType {
    RIGHT = 'O',
    WRONG = 'X',
    MAYBE = '?',
    UNKNOWN = '-'
}

export type HintsState = Hint[];

export const initialHintsState: HintsState = [];

export const hintsSlice = createSlice({
    name: "hints",
    initialState: initialHintsState,
    reducers: {
        push: (state, {payload}: PayloadAction<LetterHint[]>) => {
            state.push(payload);
        }
    }
});

export const {push} = hintsSlice.actions;
export default hintsSlice.reducer