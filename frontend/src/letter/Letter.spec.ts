import {Letter} from "./Letter.ts";

describe('Letter.increase() tests', () => {
    test.each([
        ['A', 1, 'B'],
        ['B', 1, 'C'],
        ['A', 2, 'C']
    ])('increasing %s by %i becomes %s', (letter, amount, expectedLetter) => {
        const letterA = new Letter(letter);

        expect(letterA.increase(amount)).toStrictEqual(new Letter(expectedLetter));
    })
    describe('rollover tests', () => {
        test.each([
            ['Z', 1, 'A'],
            ['Y', 2, 'A'],
            ['Z', 2, 'B'],
        ])('increasing %s by %i becomes %s', (letter, amount, expectedLetter) => {
            const letterA = new Letter(letter);

            expect(letterA.increase(amount)).toStrictEqual(new Letter(expectedLetter));
        })
    })
});

describe('Letter constructor tests', () => {
    describe('single letter tests', () => {
        test.each('abcdefghijklmnopqrstuvwxyz'.split(''))('single char %s works', (letter) => {
            expect(new Letter(letter).letter).toStrictEqual(letter);
        })
        test.each('abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''))('upper case char %s works', (letter) => {
            expect(new Letter(letter).letter).toStrictEqual(letter.toLowerCase());
        })
        test.each('1234567890!@#$%^&*()-=_+[]{}|;:,.<>/?\\'.split(''))('non-alphabetic char %s does not work', (invalidLetter) => {
            expect(() => { new Letter(invalidLetter) }).toThrowError();
        })
    })
    describe('multiple letter tests', () => {
        test.each([
            'ab',
            'bc',
            'ad',
            'abc',
            'abd',
            'jduw'
        ])('%s should not work', (invalidLetter) => {
            expect(() => { new Letter(invalidLetter) }).toThrowError();
        })
    })
})