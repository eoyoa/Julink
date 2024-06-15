import {Button, Stack} from "@mui/material";
import {useReducer} from "react";
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

    const handleIncrement = (index: number) => {
        console.debug('incremented!');
        dispatch({
            type: 'increment',
            charIndex: index
        })
    }

    const handleDecrement = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        console.debug('decremented!');
        dispatch({
            type: 'decrement',
            charIndex: index
        })
    }

    return (
        <Stack direction='row' spacing={1}>
            {gameState.characters.map((character, index) =>
                <Button
                    key={index}
                    variant="outlined"
                    sx={buttonStyles}
                    onClick={() => handleIncrement(index)}
                    onContextMenu={(event) => handleDecrement(event, index)}
                >
                    {character}
                </Button>)}
        </Stack>
    );
}