import './App.css'
import Game from "./game/Game.tsx";
import {createTheme, Stack, ThemeProvider, Typography} from "@mui/material";

function App() {
    const theme = createTheme({
        typography: {
            fontFamily: "Inconsolata, monospace",
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <Stack direction="column" spacing={2} alignItems="center">
                <Typography variant="h1" component="h1">
                    Julink
                </Typography>
                <Game></Game>
            </Stack>
        </ThemeProvider>
    )
}

export default App
