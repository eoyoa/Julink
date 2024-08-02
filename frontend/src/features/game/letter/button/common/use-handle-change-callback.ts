import { useIndexContext } from '../../IndexProvider.tsx';
import { useAppDispatch } from '../../../../../common/hooks.ts';
import { useCallback } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { GameStatus, setStatus } from '../../../game.slice.ts';

export function useHandleChangeCallback(
    letterAction: ActionCreatorWithPayload<number>
) {
    const { index } = useIndexContext();
    const dispatch = useAppDispatch();

    return useCallback(() => {
        dispatch(letterAction(index));
        // TODO: check against backend for right or wrong
        dispatch(setStatus(GameStatus.LOADING));
    }, []);
}
