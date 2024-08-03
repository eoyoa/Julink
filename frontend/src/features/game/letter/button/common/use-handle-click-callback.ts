import { useCallback } from 'react';
import { click, fetchHints } from '@/features/game/game.slice.ts';
import { useAppDispatch } from '@/common/hooks.ts';
import { useIndexContext } from '@/features/game/letter/IndexProvider.tsx';

export function useHandleClickCallback(decrement?: boolean) {
    const { index } = useIndexContext();
    const dispatch = useAppDispatch();
    return useCallback(() => {
        dispatch(
            click({
                index,
                decrement,
            })
        );
        dispatch(fetchHints(index));
    }, [decrement, dispatch, index]);
}
