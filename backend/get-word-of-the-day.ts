import words from './words.txt'
import seedrandom from "seedrandom";

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

    return word.length === 6 && isAlphabetic(word);
}

export function getWordOfTheDay(day: number) {
    const allWords = words.split('\n').filter((word) => isValid(word));
    const word = allWords[Math.floor(seedrandom(day.toString())() * allWords.length)];

    return {
        word
    };
}