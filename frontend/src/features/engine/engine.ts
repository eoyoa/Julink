import {
    HintType,
    IndexLetterPair,
    LetterHint,
} from '@/features/game/types.ts';
import defaultWords from './words_default.txt?raw';
import { isBackendPayload } from '@backend/api_types';

const apiKey = import.meta.env.VITE_API_KEY;
if (!apiKey) {
    console.error('API key not found?');
}
// TODO: this top level await blocks the webpage from loading, consider a better way to do this
const correctWord: string = await fetch(import.meta.env.VITE_API_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({
        timestamp: Date.now(),
    }),
})
    .then(async (res) => {
        const response: unknown = await res.json();
        if (!isBackendPayload(response))
            throw new Error(`invalid payload: ${response}`);
        console.debug('successfully retrieved word from backend!');
        return response.word;
    })
    .catch((reason) => {
        // TODO: de-dupe all words
        console.error(
            'failed to fetch word of the day, falling back to default words list',
            reason
        );
        const allWords = defaultWords
            .split('\n')
            .filter((word) => isValid(word));
        console.debug(`added ${allWords.length} words!`);
        return allWords[Math.floor(Math.random() * allWords.length)];
    });

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
