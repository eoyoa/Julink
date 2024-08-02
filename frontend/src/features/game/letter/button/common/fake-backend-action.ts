import { IndexLetterPair } from './use-handle-change-callback.ts';
import { HintType, LetterHint } from '@/features/hints/hints.slice.ts';

const correctWord = 'LETTER';

const isRight = (pair: IndexLetterPair) =>
    correctWord[pair.index] === pair.letter;
const isWrong = (pair: IndexLetterPair) => !isRight(pair);

export function getHints(pairs: IndexLetterPair[]): LetterHint[] | null {
    if (pairs.every(isWrong)) return null;

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
