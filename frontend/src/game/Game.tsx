import {Button, Stack} from "@mui/material";
import {useCallback, useReducer} from "react";
import GameReducer, {GameState} from "./gameReducer.ts";
import './CharacterFont.css';

function createInitialState(initialWord: string): GameState {
    return {
        characters: initialWord.split(''),
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
        <Stack direction='row' spacing={1}>
            {gameState.characters.map((character, index) =>
                <Button
                    key={index}
                    variant="outlined"
                    sx={buttonStyles}
                    onClick={event => handleClick(event, index)}
                    onContextMenu={event => handleClick(event, index)}
                >
                    {character}
                </Button>)}
        </Stack>
    );
}