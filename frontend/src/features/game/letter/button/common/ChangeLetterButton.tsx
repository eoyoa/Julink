import { Button, useMediaQuery } from '@mui/material';
import { useHandleChangeCallback } from './use-handle-change-callback.ts';
import { usePaletteFromStatus } from './use-palette-from-status.ts';
import { useAppSelector } from '@/common/hooks.ts';
import { GameStatus } from '../../../game.slice.ts';

interface ChangeLetterButtonProps {
    readonly hovering: boolean;
    readonly symbol: string;
    readonly changeFunction: (letter: string) => string;
}

export function ChangeLetterButton({
    hovering,
    symbol,
    changeFunction,
}: ChangeLetterButtonProps) {
    const loading = useAppSelector(
        (state) => state.game.status === GameStatus.LOADING
    );

    const handleChange = useHandleChangeCallback(changeFunction);

    const userHasMouse = useMediaQuery('(pointer:fine)');
    // const showControls = false;

    const showButton = !userHasMouse || hovering; /* || showControls */
    const disableButton = loading || (userHasMouse && !hovering);

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
