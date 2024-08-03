import { Stack } from '@mui/material';
import { IndexProvider } from './IndexProvider.tsx';
import { LetterButton } from './button/LetterButton.tsx';
import { HintsStack } from '@/features/game/HintsStack.tsx';

interface LetterStackProps {
    readonly index: number;
}

export function LetterInfo({ index }: LetterStackProps) {
    return (
        <IndexProvider index={index}>
            <Stack justifyContent="center" alignItems="center">
                <LetterButton />
                <HintsStack />
            </Stack>
        </IndexProvider>
    );
}
