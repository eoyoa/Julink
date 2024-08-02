import { useIndexContext } from '../../IndexProvider.tsx';
import { useAppDispatch, useAppSelector } from '@/common/hooks.ts';
import { useCallback } from 'react';
import {
    disableGeneration,
    GameStatus,
    setLetters,
    setStatus,
} from '../../../game.slice.ts';
import { getHints } from './fake-backend-action.ts';

export interface IndexLetterPair {
    readonly index: number;
    readonly letter: string;
}

function useChangedLetters(
    index: number,
    changeFunction: (letter: string) => string
) {
    const letters = useAppSelector((state) => state.game.letters);

    const indexLetterPairs: IndexLetterPair[] = [];
    indexLetterPairs.push({
        index,
        letter: changeFunction(letters[index]),
    });
    if (index > 0)
        indexLetterPairs.push({
            index: index - 1,
            letter: changeFunction(letters[index - 1]),
        });
    if (index < letters.length - 1)
        indexLetterPairs.push({
            index: index + 1,
            letter: changeFunction(letters[index + 1]),
        });

    return indexLetterPairs;
}

export function useHandleChangeCallback(
    changeFunction: (letter: string) => string
) {
    const { index } = useIndexContext();
    const dispatch = useAppDispatch();
    const pairs = useChangedLetters(index, changeFunction);

    return useCallback(() => {
        console.debug('CLICKED');
        dispatch(setLetters(pairs));
        console.debug('SET LETTERS', pairs);
        // TODO: check against backend for right or wrong
        dispatch(setStatus(GameStatus.LOADING));
        console.debug('SET LOADING');
        const hints = getHints(pairs);
        console.debug('GOT HINTS', hints);
        if (hints) {
            dispatch(disableGeneration(index));
            console.debug('ONE WAS RIGHT, RECEIVED HINTS', hints);
        }
        dispatch(setStatus(GameStatus.IN_PROGRESS));
        console.debug('SET IN PROGRESS AGAIN');
    }, [dispatch, index, pairs]);
}
