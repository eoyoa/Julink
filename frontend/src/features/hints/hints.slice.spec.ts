import hintsReducer from './hints.slice';

describe('hints slice tests', () => {
    it('should return the initial state', async () => {
        expect(hintsReducer(undefined, { type: 'unknown' })).toStrictEqual([]);
    });

    it.skip('should push new hint into state', async () => {
        // const firstHint: Hint = [
        //     { type: HintType.MAYBE, letter: 'A' },
        //     { type: HintType.WRONG, letter: 'B' },
        //     { type: HintType.MAYBE, letter: 'C' },
        // ];
        // const previousState: HintsState = [firstHint];
        //
        // const newHint: Hint = [
        //     { type: HintType.RIGHT, letter: 'D' },
        //     { type: HintType.RIGHT, letter: 'E' },
        //     { type: HintType.RIGHT, letter: 'F' },
        // ];
        //
        // expect(hintsReducer(previousState, push(newHint))).toStrictEqual([
        //     firstHint,
        //     newHint,
        // ]);
    });
});
