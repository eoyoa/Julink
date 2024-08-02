import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IndexLetterPair } from './letter/button/common/use-handle-change-callback.ts';

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

export const gameSlice = createSlice({
    name: 'letters',
    initialState: initialGameState,
    reducers: {
        setLetters: (
            state,
            { payload: pairs }: PayloadAction<IndexLetterPair[]>
        ) => {
            for (const pair of pairs) {
                state.letters[pair.index] = pair.letter;
            }
            state.clicks++;
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

export const { setLetters, enableGeneration, disableGeneration, setStatus } =
    gameSlice.actions;
export default gameSlice.reducer;
