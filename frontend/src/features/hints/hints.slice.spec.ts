import hintsReducer, {Hint, HintType, push} from './hints.slice';

describe.concurrent('hints slice tests', () => {
    it('should return the initial state', async () => {
        expect(hintsReducer(undefined, {type: 'unknown'})).toStrictEqual([]);
    });

    it('should push new hint into state', async () => {
        const firstHint: Hint[] = [
            {type: HintType.MAYBE, char: 'A'},
            {type: HintType.WRONG, char: 'B'},
            {type: HintType.MAYBE, char: 'C'}
        ];
        const previousState: Hint[][] = [firstHint];

        const newHint: Hint[] = [
            {type: HintType.RIGHT, char: 'D'},
            {type: HintType.RIGHT, char: 'E'},
            {type: HintType.RIGHT, char: 'F'}
        ];

        expect(hintsReducer(previousState, push(newHint))).toStrictEqual([
            firstHint, newHint
        ]);
    });
});