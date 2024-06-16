import {Button, Grid, useTheme} from "@mui/material";
import React, {useCallback} from "react";
import {CharacterState, GameAction} from "./reducer/gameReducer.ts";

export type CharacterProps = {
    ch: CharacterState,
    index: number,
    dispatch: React.Dispatch<GameAction>,
    foundWord: boolean
}

export default function Character(props: CharacterProps) {
    const theme = useTheme();

    const buttonStyles = {
        padding: 1,
        minWidth: 0, // to make single letters
        '&:disabled': {
            background: theme.palette.success.main,
            color: theme.palette.success.contrastText,
        },
    }

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
                variant={props.foundWord ? 'contained' : 'outlined'}
                sx={buttonStyles}
                onClick={event => handleClick(event, props.index)}
                onContextMenu={event => handleClick(event, props.index)}
                color={props.foundWord ? 'success' : 'primary'}
                disabled={props.foundWord}
            >
                {props.ch.char}
            </Button>
        </Grid>
    );
}