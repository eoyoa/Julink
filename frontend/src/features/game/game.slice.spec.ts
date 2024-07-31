import gameReducer, {
    decrement,
    disableGeneration,
    enableGeneration,
    GameState,
    increment,
    initialGameState,
} from './game.slice.ts';

describe.concurrent('game slice tests', () => {
    const testState: GameState = initialGameState;
    const enableTestState: GameState = {
        ...testState,
        canGenerateHints: [false, false, false, false, false, false],
    };

    // TODO: consider breaking into test suites, haven't done yet just because i'm not sure how concurrent works
    it('should return the initial state', async () => {
        expect(gameReducer(undefined, { type: 'unknown' })).toMatchObject({
            letters: ['J', 'U', 'L', 'I', 'N', 'K'],
            canGenerateHints: [true, true, true, true, true, true],
            clicks: 0,
        });
    });
    it('should increment 2 letters at passed indices', async () => {
        expect(gameReducer(testState, increment(0))).toMatchObject({
            letters: ['K', 'V', 'L', 'I', 'N', 'K'],
        });
    });
    it('should increment 3 letters at passed indices', async () => {
        expect(gameReducer(testState, increment(2))).toMatchObject({
            letters: ['J', 'V', 'M', 'J', 'N', 'K'],
        });
    });
    it('should decrement 2 letters at passed indices', async () => {
        expect(gameReducer(testState, decrement(5))).toMatchObject({
            letters: ['J', 'U', 'L', 'I', 'M', 'J'],
        });
    });
    it('should decrement 3 letters at passed indices', async () => {
        expect(gameReducer(testState, decrement(3))).toMatchObject({
            letters: ['J', 'U', 'K', 'H', 'M', 'K'],
        });
    });
    it('should enable hint generation for 2 letters at passed indices', async () => {
        expect(
            gameReducer(enableTestState, enableGeneration([0, 1]))
        ).toMatchObject({
            canGenerateHints: [true, true, false, false, false, false],
        });
    });
    it('should enable hint generation for 3 letters at passed indices', async () => {
        expect(
            gameReducer(enableTestState, enableGeneration([3, 4, 5]))
        ).toMatchObject({
            canGenerateHints: [false, false, false, true, true, true],
        });
    });
    it('should enable hint generation for all letters if all are passed', async () => {
        expect(
            gameReducer(enableTestState, enableGeneration([0, 1, 2, 3, 4, 5]))
        ).toMatchObject({
            canGenerateHints: [true, true, true, true, true, true],
        });
    });
    it('should disable hint generation for letter at passed index', async () => {
        expect(gameReducer(testState, disableGeneration(5))).toMatchObject({
            canGenerateHints: [true, true, true, true, true, false],
        });
    });
});
