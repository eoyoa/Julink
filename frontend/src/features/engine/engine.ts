import {
    HintType,
    IndexLetterPair,
    LetterHint,
} from '@/features/game/types.ts';
import defaultWords from './words_default.txt?raw';

// TODO: de-dupe all words
const allWords = defaultWords.split('\n').filter((word) => isValid(word));
console.debug(`added ${allWords.length} words!`);
// TODO: only choose random preset word as a fallback, normally query backend
const correctWord = allWords[Math.floor(Math.random() * allWords.length)];

function isValid(word: string) {
    function isAlphabetic(word: string) {
        return word
            .split('')
            .every(
                (letter) =>
                    letter.charCodeAt(0) >= 'A'.charCodeAt(0) &&
                    letter.charCodeAt(0) <= 'Z'.charCodeAt(0)
            );
    }

    // TODO: technically word can be longer if i wanted to, consider it for the future
    return word.length === 6 && isAlphabetic(word);
}

const isRight = (pair: IndexLetterPair) =>
    correctWord[pair.index] === pair.letter;
const isWrong = (pair: IndexLetterPair) => !isRight(pair);

export type IndexedLetterHint = LetterHint & IndexLetterPair;

export function convertToLetterHint(
    indexedHint?: IndexedLetterHint
): LetterHint | undefined {
    if (!indexedHint) return indexedHint;

    const copy = { ...indexedHint, index: undefined };
    delete copy.index;
    return copy;
}

function validateWord(letters: string[]) {
    return correctWord
        .split('')
        .every((correctLetter, index) => correctLetter === letters[index]);
}

function getHints(
    indexClicked: number,
    letters: string[]
): IndexedLetterHint[] {
    const pairs = letters
        .map((letter, index) => ({ index, letter }) satisfies IndexLetterPair)
        .filter(
            (_, index) => index >= indexClicked - 1 && index <= indexClicked + 1
        );

    if (pairs.every(isWrong)) return [];

    if (pairs.every(isRight)) {
        return pairs.map((pair) => ({
            ...pair,
            type: HintType.RIGHT,
        }));
    }

    const wrongPairs = pairs.filter(isWrong);
    const randomWrongPair =
        wrongPairs[Math.floor(Math.random() * wrongPairs.length)];
    return pairs.map((pair) => ({
        ...pair,
        type: pair === randomWrongPair ? HintType.WRONG : HintType.MAYBE,
    }));
}

export function checkLetters(
    indexClicked: number,
    letters: string[],
    shouldGenerateHints: boolean
) {
    if (validateWord(letters)) return null;
    return shouldGenerateHints ? getHints(indexClicked, letters) : [];
}
