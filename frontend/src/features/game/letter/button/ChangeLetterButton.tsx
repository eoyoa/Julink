import { Button, useMediaQuery } from '@mui/material';
import { useIndexContext } from '../IndexProvider.tsx';
import { useAppDispatch } from '../../../../common/hooks.ts';
import { useCallback } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface ChangeLetterButtonProps {
    readonly hovering: boolean;
    readonly symbol: string;
    readonly action: ActionCreatorWithPayload<number>;
}

export function ChangeLetterButton({
    hovering,
    symbol,
    action,
}: ChangeLetterButtonProps) {
    const { index } = useIndexContext();
    const dispatch = useAppDispatch();

    const handleChange = useCallback(() => {
        dispatch(action(index));
        // TODO: check against backend for right or wrong
    }, []);

    const userHasMouse = useMediaQuery('(pointer:fine)');
    // const showControls = false;

    const showButton = !userHasMouse || hovering; /* || showControls */
    const disableButton = userHasMouse && !hovering;

    return (
        <Button
            disabled={disableButton}
            onClick={handleChange}
            sx={{
                minWidth: 0,
                width: '1.25rem',
                height: '1.25rem',
                fontSize: '1.25rem',
                opacity: showButton ? 1 : 0,
                visibility: showButton ? 'visible' : 'hidden',
                transition: 'visibility 0.25s linear,opacity 0.25s linear',
            }}
        >
            {symbol}
        </Button>
    );
}
