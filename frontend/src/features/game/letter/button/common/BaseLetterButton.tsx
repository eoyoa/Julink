import { Button } from '@mui/material';
import { useIndexContext } from '../../IndexProvider.tsx';
import { useAppSelector } from '@/common/hooks.ts';
import { useHandleChangeCallback } from './use-handle-change-callback.ts';
import { MouseEvent, useCallback } from 'react';
import { usePaletteFromStatus } from './use-palette-from-status.ts';
import {
    decrementLetter,
    incrementLetter,
} from '@/features/game/letter/letter-utils.ts';
import { GameStatus } from '@/features/game/types.ts';

export function BaseLetterButton() {
    const { index } = useIndexContext();
    const letter = useAppSelector((state) => state.game.letters[index]);
    const loading = useAppSelector(
        (state) => state.game.status === GameStatus.LOADING
    );

    const handleIncrement = useHandleChangeCallback(incrementLetter);
    const handleDecrement = useHandleChangeCallback(decrementLetter);
    const handleOnContextMenu = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleDecrement();
        },
        [handleDecrement]
    );

    const palette = usePaletteFromStatus();

    return (
        <Button
            variant={'outlined'}
            onClick={handleIncrement}
            onContextMenu={handleOnContextMenu}
            disabled={loading}
            sx={{
                minWidth: 0,
                width: '1.25rem',
                height: '2.5rem',
                '&:disabled': loading
                    ? {
                          color: palette.main,
                      }
                    : {
                          background: palette.main,
                          color: palette.contrastText,
                      },
            }}
        >
            {letter}
        </Button>
    );
}
