import {Button} from "@mui/material";
import './CharacterFont.css';
import React from "react";

export type CharacterProps = {
    letter: string,
    clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Character(props: CharacterProps) {
    return (
        <Button
            variant="outlined"
            sx={{
                display: 'inline-flex',
                padding: 1,
                minWidth: 0, // to make single letters
                fontFamily: 'inconsolata'
            }}
        >
            {props.letter}
        </Button>
    );
}