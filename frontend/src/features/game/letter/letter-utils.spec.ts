import { incrementLetter } from './letter-utils.ts';

describe('incrementLetter function tests', () => {
    // TODO: wait for vitest v2 for passing expect from test context (test.for)
    it.each([
        ['A', 'B'],
        ['B', 'C'],
        ['D', 'E'],
        ['Y', 'Z'],
    ])('should increment %s to %s', async (beforeLetter, afterLetter) => {
        expect(incrementLetter(beforeLetter)).toStrictEqual(afterLetter);
    });
    it('should roll over Z to A', async () => {
        expect(incrementLetter('Z')).toStrictEqual('A');
    });
});
