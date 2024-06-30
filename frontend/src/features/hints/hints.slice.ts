import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type HintRow = {
    hints: Hint[]
}
type Hint = {
    type: HintType,
    char: string
}

export enum HintType {
    RIGHT = 'O',
    WRONG = 'X',
    MAYBE = '?',
    UNKNOWN = '-'
}

const initialState: HintRow[] = [];

export const hintsSlice = createSlice({
    name: "hints",
    initialState,
    reducers: {
        push: (state, {payload}: PayloadAction<HintRow>) => {
            state.push(payload);
        }
    }
});

export const {push} = hintsSlice.actions;
export default hintsSlice.reducer