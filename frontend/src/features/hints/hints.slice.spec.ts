import reducer, {HintRow, HintType, push} from './hints.slice';

it('should return the initial state', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual([]);
});

it('should push new hint into state', () => {
    const firstHint: HintRow = {
        hints: [
            {type: HintType.MAYBE, char: 'A'},
            {type: HintType.WRONG, char: 'B'},
            {type: HintType.MAYBE, char: 'C'}
        ]
    }
    const previousState: HintRow[] = [firstHint];

    const newHint: HintRow = {
        hints: [
            {type: HintType.RIGHT, char: 'D'},
            {type: HintType.RIGHT, char: 'E'},
            {type: HintType.RIGHT, char: 'F'}
        ]
    };

    expect(reducer(previousState, push(newHint))).toEqual([
        firstHint, newHint
    ]);
});