import {
    Button,
    createTheme,
    Stack,
    ThemeProvider,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import {
    Hint,
    HintType,
    LetterHint,
} from '../../src/features/hints/hints.slice.ts';

const testingTheme = createTheme({
    typography: {
        fontFamily: ['inconsolata', 'monospace'].join(','),
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    // backgroundColor: 'lightpink',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    // backgroundColor: 'lightblue',
                },
            },
        },
    },
});

function TestHeader() {
    return <Typography variant={'h1'}>Julink</Typography>;
}

function TestClicksCounter() {
    function fakeUseClicksSelector() {
        return 0;
    }

    const clicks = fakeUseClicksSelector();

    return <Typography>{`Current # of clicks: ${clicks}`}</Typography>;
}

function TestGameGrid() {
    const letters = 'JULINK'.split('');
    const testHintRow: Hint = [
        { type: HintType.UNKNOWN, char: '-' },
        { type: HintType.RIGHT, char: 'D' },
        { type: HintType.RIGHT, char: 'E' },
        { type: HintType.RIGHT, char: 'F' },
        { type: HintType.UNKNOWN, char: '-' },
        { type: HintType.UNKNOWN, char: '-' },
    ];

    return (
        <Stack
            direction={'row'}
            flexGrow={1}
            justifyContent="center"
            alignItems="baseline"
            spacing={2}
        >
            {letters.map((letter, index) => (
                <TestLetterStack
                    key={index}
                    letter={letter}
                    hints={testHintRow}
                />
            ))}
        </Stack>
    );
}

interface TestLetterStackProps {
    readonly letter: string;
    readonly hints: LetterHint[];
}

function TestLetterStack({ letter, hints }: TestLetterStackProps) {
    return (
        <Stack justifyContent="center" alignItems="center">
            <TestLetterButton letter={letter} />
            {hints.map((hint, index) => (
                <Stack direction={'row'} key={index} spacing={1}>
                    <Typography>{hint.type}</Typography>
                    <Typography>{hint.char}</Typography>
                </Stack>
            ))}
        </Stack>
    );
}

interface TestLetterButtonProps {
    readonly letter: string;
}

function TestLetterButton({ letter }: TestLetterButtonProps) {
    const [hovering, setHovering] = useState(false);

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            spacing={1}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <TestChangeLetterButton hovering={hovering} symbol={'+'} />
            <Button
                variant={'outlined'}
                sx={{
                    minWidth: 0,
                    width: '1.25rem',
                    height: '2.5rem',
                    '&:disabled': {
                        background: testingTheme.palette.success.main,
                        color: testingTheme.palette.success.contrastText,
                    },
                }}
            >
                {letter}
            </Button>
            <TestChangeLetterButton hovering={hovering} symbol={'-'} />
        </Stack>
    );
}

interface TestChangeLetterButtonProps {
    readonly hovering: boolean;
    readonly symbol: string;
}

function TestChangeLetterButton({
    hovering,
    symbol,
}: TestChangeLetterButtonProps) {
    const userHasMouse = useMediaQuery('(pointer:fine)');
    const showControls = false;

    const showButton = !userHasMouse || showControls || hovering;
    const disableButton = userHasMouse && !hovering;

    return (
        <Button
            disabled={disableButton}
            sx={{
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

function TestGame() {
    return (
        <Stack
            flexGrow={1}
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            width={'fit-content'}
        >
            <TestClicksCounter />
            <TestGameGrid />
        </Stack>
    );
}

export function TestLayout() {
    return (
        <ThemeProvider theme={testingTheme}>
            <Stack
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
                height={'100%'}
            >
                <TestHeader />
                <TestGame />
            </Stack>
        </ThemeProvider>
    );
}
