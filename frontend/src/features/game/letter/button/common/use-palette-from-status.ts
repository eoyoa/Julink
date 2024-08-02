import { PaletteColor, useTheme } from '@mui/material';
import { GameStatus } from '../../../game.slice.ts';
import { useAppSelector } from '@/common/hooks.ts';
import { useMemo } from 'react';
import { grey } from '@mui/material/colors';

export function usePaletteFromStatus() {
    const theme = useTheme();
    const status = useAppSelector((state) => state.game.status);

    const inProgressPalette = useMemo<PaletteColor>(
        () => ({ ...theme.palette.primary, main: grey['800'] }),
        [theme.palette.primary]
    );

    switch (status) {
        case GameStatus.LOADING:
            return inProgressPalette;
        case GameStatus.WON:
            return theme.palette.success;
        case GameStatus.LOST:
            return theme.palette.error;
        default:
            return theme.palette.primary;
    }
}
