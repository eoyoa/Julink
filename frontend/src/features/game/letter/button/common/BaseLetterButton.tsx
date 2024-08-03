import { Button } from '@mui/material';
import { useIndexContext } from '../../IndexProvider.tsx';
import { useAppSelector } from '@/common/hooks.ts';
import { usePaletteFromStatus } from './use-palette-from-status.ts';
import { GameStatus } from '@/features/game/types.ts';
import { useHandleClickCallback } from '@/features/game/letter/button/common/use-handle-click-callback.ts';

export function BaseLetterButton() {
    const { index } = useIndexContext();
    const letter = useAppSelector((state) => state.game.letters[index]);

    const loading = useAppSelector(
        (state) => state.game.status === GameStatus.LOADING
    );
    const won = useAppSelector((state) => state.game.status === GameStatus.WON);
    const shouldDisable = loading || won;

    const handleDecrementClick = useHandleClickCallback(true);

    const palette = usePaletteFromStatus();

    return (
        <Button
            variant={won ? 'contained' : 'outlined'}
            onClick={useHandleClickCallback()}
            onContextMenu={(e) => {
                e.preventDefault();
                handleDecrementClick();
            }}
            disabled={shouldDisable}
            sx={{
                minWidth: 0,
                width: '1.25rem',
                height: '2.5rem',
                '&:disabled': !won
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
