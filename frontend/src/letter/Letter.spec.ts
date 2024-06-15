import {Letter} from './Letter.ts';
import {expect} from "vitest";

describe('Letter.increase() tests', () => {
    it.each([
        ['A', 1, 'B'],
        ['B', 1, 'C'],
        ['A', 2, 'C']
    ])('should increase %s by %i to become %s', (letter, amount, expectedLetter) => {
        const actualLetter = new Letter(letter, []);
        actualLetter.increase(amount);

        expect(actualLetter).toStrictEqual(new Letter(expectedLetter, []));
    })
    describe('wrapping tests', () => {
        it.each([
            ['Z', 1, 'A'],
            ['Y', 2, 'A'],
            ['Z', 2, 'B'],
        ])('should increase %s by %i to become %s', (letter, amount, expectedLetter) => {
            const actualLetter = new Letter(letter, []);
            actualLetter.increase(amount);

            expect(actualLetter).toStrictEqual(new Letter(expectedLetter, []));
        })
    })
    describe('linked letters tests', () => {
        it.each([
            ['b', 1, 'c'],
            ['b', 2, 'd'],
            ['c', 1, 'd'],
            ['x', 1, 'y']
        ])('should increase one linked letter %s by %i when increased same amount', (letter, amount, expected) => {
            const linkedLetter = new Letter(letter, []);
            const actualLetter = new Letter('a', [linkedLetter]);

            actualLetter.increase(amount);

            expect(linkedLetter.letter).toStrictEqual(expected);
        });
        // TODO: not the best test, should make linked letters have different
        it.each([
            ['b', 1, 'c'],
            ['b', 2, 'd'],
            ['c', 1, 'd'],
            ['x', 1, 'y']
        ])('should increase multiple linked letter %s by %i when increased same amount', (letter, amount, expected) => {
            const linkedLetter1 = new Letter(letter, []);
            const linkedLetter2 = new Letter(letter, []);
            const actualLetter = new Letter('a', [linkedLetter1, linkedLetter2]);

            actualLetter.increase(amount);

            expect(linkedLetter1.letter).toStrictEqual(expected);
            expect(linkedLetter2.letter).toStrictEqual(expected);
        });
        it('should update linkedLetters of linked letters', () => {
            // TODO
        });
    });
});

/**
 * TODO: these are basically just copies of increase() with swapped expected.
 * maybe just test each function by passing them in as cases
 */
describe('Letter.decrease() tests', () => {
    it.each([
        ['B', 1, 'A'],
        ['C', 1, 'B'],
        ['C', 2, 'A']
    ])('should decrease %s by %i to become %s', (letter, amount, expectedLetter) => {
        const actualLetter = new Letter(letter, []);
        actualLetter.decrease(amount);

        expect(actualLetter).toStrictEqual(new Letter(expectedLetter, []));
    })
    describe('wrapping tests', () => {
        it.each([
            ['A', 1, 'Z'],
            ['A', 2, 'Y'],
            ['B', 2, 'Z'],
        ])('should decrease %s by %i to become %s', (letter, amount, expectedLetter) => {
            const actualLetter = new Letter(letter, []);
            actualLetter.decrease(amount);

            expect(actualLetter).toStrictEqual(new Letter(expectedLetter, []));
        })
    })
});

describe('Letter constructor tests', () => {
    describe('single letter tests', () => {
        it.each('abcdefghijklmnopqrstuvwxyz'.split(''))('single char %s works', (letter) => {
            expect(new Letter(letter, []).letter).toStrictEqual(letter);
        })
        it.each('abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''))('upper case char %s works', (letter) => {
            expect(new Letter(letter, []).letter).toStrictEqual(letter.toLowerCase());
        })
        it.each('1234567890!@#$%^&*()-=_+[]{}|;:,.<>/?\\'.split(''))('non-alphabetic char %s does not work', (invalidLetter) => {
            expect(() => {
                new Letter(invalidLetter, [])
            }).toThrowError();
        })
    })
    describe('multiple letter tests', () => {
        it.each([
            'ab',
            'bc',
            'ad',
            'abc',
            'abd',
            'jduw'
        ])('%s should not work', (multipleLetters) => {
            expect(() => {
                new Letter(multipleLetters, [])
            }).toThrowError();
        })
    })
})