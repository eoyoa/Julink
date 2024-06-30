import {decrement, increment} from "./letter-utils.ts";

describe.concurrent('increment function tests', () => {
    it.each([
        ['A', 'B'],
        ['B', 'C'],
        ['D', 'E'],
        ['Y', 'Z'],
    ])('should increment %s to %s', (beforeLetter, afterLetter) => {
        expect(increment(beforeLetter)).toStrictEqual(afterLetter);
    });
    it('should roll over Z to A', () => {
        expect(increment('Z')).toStrictEqual('A');
    });
});

describe.concurrent('decrement function tests', () => {
    it.each([
        ['B', 'A'],
        ['C', 'B'],
        ['E', 'D'],
        ['Z', 'Y'],
    ])('should increment %s to %s', (beforeLetter, afterLetter) => {
        expect(decrement(beforeLetter)).toStrictEqual(afterLetter);
    });
    it('should roll over A to Z', () => {
        expect(decrement('A')).toStrictEqual('Z');
    });
});