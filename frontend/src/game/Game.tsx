import {Grid, Typography} from "@mui/material";
import {useReducer} from "react";
import GameReducer, {createInitialState, startWord} from "./reducer/gameReducer.ts";
import HintStack from "./HintStack.tsx";
import Character from "./Character.tsx";

export default function Game() {
    const [gameState, dispatch] = useReducer(GameReducer, startWord, createInitialState);

    const columns = 6;
    return (
        <Grid
            container
            spacing={0}
            columns={columns}
        >
            <Grid item xs={columns} paddingBottom={5}>
                <Typography>
                    {gameState.foundWord
                        ? `Found word in ${gameState.clicks} clicks!`
                        : `Current # of clicks: ${gameState.clicks}`}
                </Typography>
            </Grid>
            {gameState.characters.map((ch, index) =>
                <Character key={index} ch={ch} index={index} dispatch={dispatch}
                           foundWord={gameState.foundWord}></Character>
            )}
            {gameState.characters.map((ch, charI) =>
                <HintStack hints={ch.hints} key={charI}></HintStack>
            )}
        </Grid>
    );
}