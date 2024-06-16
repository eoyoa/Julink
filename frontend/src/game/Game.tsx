import {Box, Button, Grid, Stack} from "@mui/material";
import {useCallback, useReducer} from "react";
import GameReducer, {GameState} from "./gameReducer.ts";
import './CharacterFont.css';

function createInitialState(initialWord: string): GameState {
    return {
        characters: initialWord.split('').map(ch => {
            return {
                char: ch,
                isCorrect: false, // TODO: shouldn't initialize to false (shouldn't exist in the first place)
                hints: []
            }
        }),
    }
}


const buttonStyles = {
    padding: 1,
    minWidth: 0, // to make single letters
    fontFamily: 'inconsolata'
}

export default function Game() {
    const [gameState, dispatch] = useReducer(GameReducer, 'JULINK', createInitialState);

    const handleClick = useCallback((event: React.MouseEvent, index: number) => {
        event.preventDefault();
        console.debug('clicked!');
        dispatch({
            type: 'click',
            clickButton: event.nativeEvent.button,
            charIndex: index
        })
        // TODO: also send state to backend for verification, then await response
    }, [])

    return (
        // <Stack direction='row' spacing={1}>
        //     {gameState.characters.map((ch, index) =>
        //         <Button
        //             key={index}
        //             variant={ch.isCorrect ? 'contained' : 'outlined'}
        //             sx={buttonStyles}
        //             onClick={event => handleClick(event, index)}
        //             onContextMenu={event => handleClick(event, index)}
        //             color={ch.isCorrect ? 'success' : 'primary'}
        //         >
        //             {ch.char}
        //         </Button>)}
        // </Stack>
        <Grid
            container
            spacing={2}
            columns={6}
        >
            {gameState.characters.map((ch, index) =>
                (<Grid item xs={1} key={index}>
                    <Button
                        variant={ch.isCorrect ? 'contained' : 'outlined'}
                        sx={buttonStyles}
                        onClick={event => handleClick(event, index)}
                        onContextMenu={event => handleClick(event, index)}
                        color={ch.isCorrect ? 'success' : 'primary'}
                    >
                        {ch.char}
                    </Button>
                </Grid>))
            }
            {gameState.characters.map((ch, charI) => (
                <Grid item xs={1} key={charI}>
                    <Stack
                        direction='column'
                    >
                        {ch.hints.map((hint, hintI) => (
                            <Box key={hintI}>
                                {hint}
                            </Box>
                        ))}
                    </Stack>
                </Grid>
            ))}
        </Grid>
    );
}