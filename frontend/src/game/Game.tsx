import {Grid} from "@mui/material";
import {useReducer} from "react";
import GameReducer, {createInitialState, startWord} from "./gameReducer.ts";
import {HintStack} from "./HintStack.tsx";
import Character from "./Character.tsx";

export default function Game() {
    const [gameState, dispatch] = useReducer(GameReducer, startWord, createInitialState);

    return (
        <Grid
            container
            spacing={2}
            columns={6}
        >
            {gameState.characters.map((ch, index) =>
                <Character ch={ch} index={index} dispatch={dispatch} key={index}></Character>
            )}
            {gameState.characters.map((ch, charI) =>
                <HintStack hints={ch.hints} key={charI}></HintStack>
            )}
        </Grid>
    );
}