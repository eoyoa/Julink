import {Grid, Stack, Typography} from "@mui/material";
import {Hint} from "./reducer/gameReducer.ts";

export type HintStackProps = {
    hints: Hint[]
}

export default function HintStack(props: HintStackProps) {
    return (
        <Grid item xs={1}>
            <Stack
                direction='column'
            >
                {props.hints.map((hint, hintI) => (
                    <Stack key={hintI} alignItems='center' direction='row' spacing={1} justifyContent='center'>
                        <Typography>{hint.isRight ? 'O' : 'X'}</Typography>
                        <Typography>{hint.char}</Typography>
                    </Stack>
                ))}
            </Stack>
        </Grid>
    );
}