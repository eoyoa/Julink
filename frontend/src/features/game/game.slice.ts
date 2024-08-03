import {
    createAsyncThunk,
    createSlice,
    Draft,
    PayloadAction,
} from '@reduxjs/toolkit';
import {
    ClickAction,
    GameStatus,
    Hint,
    HintType,
    UnknownLetterHint,
} from './types.ts';
import {
    convertToLetterHint,
    IndexedLetterHint,
    runFakeBackendCall,
} from '@/features/game/fake-backend.ts';
import { changeLetter } from '@/features/game/letter/letter-utils.ts';
import { AppDispatch, RootState } from '@/app/store.ts';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
}>();

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

export const fetchHints = createAppAsyncThunk<
    IndexedLetterHint[] | null,
    number
>('game/fetchHints', (index: number, thunkAPI) => {
    const letters = thunkAPI.getState().game.letters;
    const shouldGenerateHints =
        thunkAPI.getState().game.canGenerateHints[index];

    // TODO: fake backend stuff should become not fake
    const hints = runFakeBackendCall(index, letters, shouldGenerateHints);
    if (hints && hints.length > 0) thunkAPI.dispatch(disableGeneration(index));
    return hints;
});

export const gameSlice = createSlice({
    name: 'letters',
    initialState: initialGameState,
    reducers: {
        click: (
            state,
            { payload: { index, decrement } }: PayloadAction<ClickAction>
        ) => {
            handleClick(state, index, decrement);

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchHints.pending, (state) => {
                state.status = GameStatus.LOADING;
            })
            .addCase(fetchHints.fulfilled, (state, { payload: hints }) => {
                if (!hints) {
                    state.status = GameStatus.WON;
                    return;
                }
                state.status = GameStatus.IN_PROGRESS;
                if (hints.length > 0) {
                    pushHints(state, hints);
                }
            });
    },
});

function handleClick(
    state: Draft<GameState>,
    index: number,
    decrement?: boolean
) {
    state.letters[index] = changeLetter(state.letters[index], decrement);
    if (index > 0) {
        state.letters[index - 1] = changeLetter(
            state.letters[index - 1],
            decrement
        );
    }
    if (index < state.letters.length - 1) {
        state.letters[index + 1] = changeLetter(
            state.letters[index + 1],
            decrement
        );
    }
}

function pushHints(state: Draft<GameState>, hints: IndexedLetterHint[]) {
    state.letters
        .map(
            (_, index) =>
                convertToLetterHint(
                    hints.find((hint) => hint.index === index)
                ) ?? ({ type: HintType.UNKNOWN } satisfies UnknownLetterHint)
        )
        .forEach((hint, index) => state.hints[index].push(hint));
}

export const { click, enableGeneration, disableGeneration, setStatus } =
    gameSlice.actions;
export default gameSlice.reducer;
