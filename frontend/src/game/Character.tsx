import {Button, Grid} from "@mui/material";
import React, {useCallback} from "react";
import {CharacterState, GameAction} from "./reducer/gameReducer.ts";

export type CharacterProps = {
    ch: CharacterState,
    index: number,
    dispatch: React.Dispatch<GameAction>
}

const buttonStyles = {
    padding: 1,
    minWidth: 0, // to make single letters
    fontFamily: 'inconsolata'
}

export default function Character(props: CharacterProps) {
    const handleClick = useCallback((event: React.MouseEvent, index: number) => {
        event.preventDefault();
        console.debug('clicked!');
        props.dispatch({
            type: 'click',
            clickButton: event.nativeEvent.button,
            charIndex: index
        })
        // TODO: also send state to backend for verification, then await response
    }, [props])

    return (
        <Grid item xs={1}>
            <Button
                variant={props.ch.isCorrect ? 'contained' : 'outlined'}
                sx={buttonStyles}
                onClick={event => handleClick(event, props.index)}
                onContextMenu={event => handleClick(event, props.index)}
                color={props.ch.isCorrect ? 'success' : 'primary'}
            >
                {props.ch.char}
            </Button>
        </Grid>
    );
}