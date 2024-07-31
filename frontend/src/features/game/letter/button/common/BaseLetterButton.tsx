import { Button, useTheme } from '@mui/material';
import { useIndexContext } from '../../IndexProvider.tsx';
import { useAppSelector } from '../../../../../common/hooks.ts';
import { useHandleChangeCallback } from './use-handle-change-callback.ts';
import { decrement, increment } from '../../../game.slice.ts';
import { MouseEvent, useCallback } from 'react';

export function BaseLetterButton() {
    const { index } = useIndexContext();
    const letter = useAppSelector((state) => state.game.letters[index]);

    const handleIncrement = useHandleChangeCallback(increment);
    const handleDecrement = useHandleChangeCallback(decrement);
    const handleOnContextMenu = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleDecrement();
        },
        []
    );

    const theme = useTheme();

    return (
        <Button
            variant={'outlined'}
            onClick={handleIncrement}
            onContextMenu={handleOnContextMenu}
            sx={{
                minWidth: 0,
                width: '1.25rem',
                height: '2.5rem',
                '&:disabled': {
                    background: theme.palette.success.main,
                    color: theme.palette.success.contrastText,
                },
            }}
        >
            {letter}
        </Button>
    );
}
