import { Stack } from '@mui/material';
import { LetterInfo } from './letter/LetterInfo.tsx';
import { useAppSelector } from '../../common/hooks.ts';

export function PlayArea() {
    const letters = useAppSelector((state) => state.game.letters);

    return (
        <Stack
            direction={'row'}
            flexGrow={1}
            justifyContent="center"
            alignItems="baseline"
            spacing={2}
        >
            {letters.map((_, index) => (
                <LetterInfo key={index} index={index} />
            ))}
        </Stack>
    );
}
