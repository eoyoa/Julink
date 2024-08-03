import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IndexLetterPair } from './letter/button/common/use-handle-change-callback.ts';
import { GameStatus, Hint, HintType, UnknownLetterHint } from './types.ts';
import {
    convertToLetterHint,
    IndexedLetterHint,
} from '@/features/game/letter/button/common/fake-backend-action.ts';

export interface GameState {
    letters: string[];
    hints: Hint[][];
    canGenerateHints: boolean[];
    clicks: number;
    status: GameStatus;
}

const initialWord = 'JULINK';
export const initialGameState: GameState = {
    letters: initialWord.split(''),
    hints: new Array<Hint[]>(initialWord.length).fill([]),
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
        pushHints: (
            state,
            { payload: hints }: PayloadAction<IndexedLetterHint[]>
        ) => {
            state.letters
                .map(
                    (_, index) =>
                        convertToLetterHint(
                            hints.find((hint) => hint.index === index)
                        ) ??
                        ({ type: HintType.UNKNOWN } satisfies UnknownLetterHint)
                )
                .forEach((hint, index) => state.hints[index].push(hint));
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
    setLetters,
    enableGeneration,
    disableGeneration,
    setStatus,
    pushHints,
} = gameSlice.actions;
export default gameSlice.reducer;
