import { useIndexContext } from '../../IndexProvider.tsx';
import { useAppDispatch } from '../../../../../common/hooks.ts';
import { useCallback } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export function useHandleChangeCallback(
    action: ActionCreatorWithPayload<number>
) {
    const { index } = useIndexContext();
    const dispatch = useAppDispatch();

    return useCallback(() => {
        dispatch(action(index));
        // TODO: check against backend for right or wrong
    }, []);
}
