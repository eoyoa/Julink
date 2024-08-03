import { Stack } from '@mui/material';
import { ClicksCounter } from './ClicksCounter.tsx';
import { PlayArea } from './PlayArea.tsx';

export function Game() {
    return (
        <Stack
            flexGrow={1}
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
        >
            <ClicksCounter />
            <PlayArea />
        </Stack>
    );
}
