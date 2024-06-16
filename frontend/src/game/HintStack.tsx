import {Box, Grid, Stack} from "@mui/material";

export type HintStackProps = {
    hints: string[]
}

export default function HintStack(props: HintStackProps) {
    return (
        <Grid item xs={1}>
            <Stack
                direction='column'
            >
                {props.hints.map((hint, hintI) => (
                    <Box key={hintI}>
                        {hint}
                    </Box>
                ))}
            </Stack>
        </Grid>
    );
}