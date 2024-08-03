import { useState } from 'react';
import { Stack } from '@mui/material';
import { IncrementLetterButton } from './common/IncrementLetterButton.tsx';
import { DecrementLetterButton } from './common/DecrementLetterButton.tsx';
import { BaseLetterButton } from './common/BaseLetterButton.tsx';

export function LetterButton() {
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
            <BaseLetterButton />
            <DecrementLetterButton hovering={hovering} />
        </Stack>
    );
}
