import { Button, useMediaQuery } from '@mui/material';
import { usePaletteFromStatus } from './use-palette-from-status.ts';
import { useAppSelector } from '@/common/hooks.ts';
import { GameStatus } from '@/features/game/types.ts';
import { useHandleClickCallback } from '@/features/game/letter/button/common/use-handle-click-callback.ts';

interface ChangeLetterButtonProps {
    readonly hovering: boolean;
    readonly symbol: string;
    readonly decrement?: boolean;
}

export function ChangeLetterButton({
    hovering,
    symbol,
    decrement,
}: ChangeLetterButtonProps) {
    const loading = useAppSelector(
        (state) => state.game.status === GameStatus.LOADING
    );
    const won = useAppSelector((state) => state.game.status === GameStatus.WON);
    const shouldDisable = loading;

    const handleChange = useHandleClickCallback(decrement);

    const userHasMouse = useMediaQuery('(pointer:fine)');
    // const showControls = false;

    const showButton =
        !won && (!userHasMouse || hovering); /* || showControls */
    const disableButton = shouldDisable || !showButton;

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
