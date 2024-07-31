import { Stack } from '@mui/material';
import { IndexProvider } from './IndexProvider.tsx';
import { LetterButton } from './button/LetterButton.tsx';

interface LetterStackProps {
    readonly index: number;
}

export function LetterInfo({ index }: LetterStackProps) {
    return (
        <IndexProvider index={index}>
            <Stack justifyContent="center" alignItems="center">
                <LetterButton />
                {/*{hints.map((hint, index) => (*/}
                {/*    <Stack direction={'row'} key={index} spacing={1}>*/}
                {/*        <Typography>{hint.type}</Typography>*/}
                {/*        <Typography>{hint.char}</Typography>*/}
                {/*    </Stack>*/}
                {/*))}*/}
            </Stack>
        </IndexProvider>
    );
}
