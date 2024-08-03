import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { createTheme, Stack, ThemeProvider } from '@mui/material';
import { Header } from './Header.tsx';
import { Game } from '../features/game/Game.tsx';
import { Provider } from 'react-redux';
import { setupStore } from './store.ts';

function throwNoRoot(): never {
    throw new ReferenceError('Root element was not found in index.html!');
}

const theme = createTheme({
    typography: {
        fontFamily: ['inconsolata', 'monospace'].join(','),
    },
});

createRoot(document.getElementById('root') ?? throwNoRoot()).render(
    <StrictMode>
        <Provider store={setupStore()}>
            <ThemeProvider theme={theme}>
                <Stack
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                    height={'100%'}
                >
                    <Header />
                    <Game />
                </Stack>
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
