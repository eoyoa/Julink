import {Button, createTheme, Stack, ThemeProvider, Typography} from "@mui/material";

const testingTheme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    backgroundColor: "lightpink"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "lightgreen"
                }
            }
        }
    }
});

function TestHeader() {
    return <Typography variant={'h1'}>Julink</Typography>
}

function TestClicksCounter() {
    function fakeUseClicksSelector() {
        return 0;
    }

    const clicks = fakeUseClicksSelector();

    return <Typography>{`Current # of clicks: ${clicks}`}</Typography>;
}

function TestLetterButtons() {
    const letters = 'JULINK'.split('');

    return <Stack spacing={2} direction={'row'}>
        {letters.map((letter, index) => (
            <Button key={index} sx={{
                minWidth: 0,
                width: '1.5rem'
            }}>{letter}</Button>
        ))}
    </Stack>
}

function TestHintStack() {
    return <Stack flexGrow={1}></Stack>
}

// function TestHintRow() {
//     return <Stack direction={'row'}></Stack>
// }

function TestGame() {
    return <Stack flexGrow={1}
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={2}>
        <TestClicksCounter/>
        <TestLetterButtons/>
        <TestHintStack/>
    </Stack>
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
                <TestHeader/>
                <TestGame/>
            </Stack>
        </ThemeProvider>
    );
}