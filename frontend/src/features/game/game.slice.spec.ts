import gameReducer, {decrement, disableGeneration, enableGeneration, GameState, increment} from "./game.slice.ts";

describe('game slice tests', () => {
    const testState: GameState = {
        letters: ["J", "U", "L", "I", "N", "K"],
        canGenerateHints: [true, true, true, true, true, true]
    };
    const enableTestState: GameState = {
        ...testState,
        canGenerateHints: [false, false, false, false, false, false]
    };

    // TODO: consider breaking into test suites, haven't done yet just because i'm not sure how concurrent works
    it('should return the initial state', async () => {
        expect(gameReducer(undefined, {type: 'unknown'})).toStrictEqual({
            letters: ["J", "U", "L", "I", "N", "K"],
            canGenerateHints: [true, true, true, true, true, true]
        });
    });
    it('should increment 2 letters at passed indices', async () => {
        expect(gameReducer(testState, increment(0))).toStrictEqual({
            ...testState,
            letters: ["K", "V", "L", "I", "N", "K"],
        });
    });
    it('should increment 3 letters at passed indices', async () => {
        expect(gameReducer(testState, increment(2))).toStrictEqual({
            ...testState,
            letters: ["J", "V", "M", "J", "N", "K"],
        });
    });
    it('should decrement 2 letters at passed indices', async () => {
        expect(gameReducer(testState, decrement(5))).toStrictEqual({
            ...testState,
            letters: ["J", "U", "L", "I", "M", "J"],
        });
    });
    it('should decrement 3 letters at passed indices', async () => {
        expect(gameReducer(testState, decrement(3))).toStrictEqual({
            ...testState,
            letters: ["J", "U", "K", "H", "M", "K"],
        });
    });
    it('should enable hint generation for 2 letters at passed indices', async () => {
        expect(gameReducer(enableTestState, enableGeneration([0, 1]))).toStrictEqual({
            ...enableTestState,
            canGenerateHints: [true, true, false, false, false, false]
        });
    });
    it('should enable hint generation for 3 letters at passed indices', async () => {
        expect(gameReducer(enableTestState, enableGeneration([3, 4, 5]))).toStrictEqual({
            ...enableTestState,
            canGenerateHints: [false, false, false, true, true, true]
        });
    });
    it('should enable hint generation for all letters if all are passed', async () => {
        expect(gameReducer(enableTestState, enableGeneration([0, 1, 2, 3, 4, 5]))).toStrictEqual({
            ...enableTestState,
            canGenerateHints: [true, true, true, true, true, true]
        });
    });
    it('should disable hint generation for letter at passed index', async () => {
        expect(gameReducer(testState, disableGeneration(5))).toStrictEqual({
            ...testState,
            canGenerateHints: [true, true, true, true, true, false]
        });
    });
});