import { Button, useMediaQuery } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useHandleChangeCallback } from './use-handle-change-callback.ts';
import { usePaletteFromStatus } from './use-palette-from-status.ts';

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
    const handleChange = useHandleChangeCallback(action);

    const userHasMouse = useMediaQuery('(pointer:fine)');
    // const showControls = false;

    const showButton = !userHasMouse || hovering; /* || showControls */
    const disableButton = userHasMouse && !hovering;

    const palette = usePaletteFromStatus();

    return (
        <Button
            disabled={disableButton}
            onClick={handleChange}
            sx={{
                '&:disabled': {
                    color: palette.main,
                },
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
