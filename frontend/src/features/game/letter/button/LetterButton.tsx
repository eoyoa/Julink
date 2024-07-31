import { useState } from 'react';
import { Button, Stack, useTheme } from '@mui/material';
import { useIndexContext } from '../IndexProvider.tsx';
import { useAppSelector } from '../../../../common/hooks.ts';
import { IncrementLetterButton } from './IncrementLetterButton.tsx';
import { DecrementLetterButton } from './DecrementLetterButton.tsx';

export function LetterButton() {
    const { index } = useIndexContext();
    const letter = useAppSelector((state) => state.game.letters[index]);
    const theme = useTheme();

    const [hovering, setHovering] = useState(false);

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            spacing={1}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <IncrementLetterButton hovering={hovering} />
            <Button
                variant={'outlined'}
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
            <DecrementLetterButton hovering={hovering} />
        </Stack>
    );
}
