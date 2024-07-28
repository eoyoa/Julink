import {Stack, StackProps, Typography} from "@mui/material";
import {useAppSelector} from "../../common/hooks.ts";
import {Hint, LetterHint} from "./hints.slice.ts";

export function HintStack() {
    const hints = useAppSelector(state => state.currentHints);

    return <Stack aria-label={'Hint stack'}>
        {hints.map((hint, index) =>
            (<HintRow key={index} hint={hint} aria-label={`Hint ${index + 1}`}/>)
        )}
    </Stack>
}

interface HintRowProps {
    readonly hint: Hint
}

function HintRow({hint, ...rest}: HintRowProps & StackProps) {
    return (
        <Stack direction={'row'} {...rest}>
            {hint.map((letterHint, index) =>
                (<HintUnit key={index} letterHint={letterHint}/>)
            )}
        </Stack>
    )
}

interface HintUnitProps {
    letterHint: LetterHint
}

// TODO: need better name
function HintUnit({letterHint}: HintUnitProps) {
    return (
        <Stack alignItems='center' direction='row' spacing={1} justifyContent='center'
               aria-label={`${letterHint.type} ${letterHint.char}`}>
            <Typography>{letterHint.type}</Typography>
            <Typography>{letterHint.char}</Typography>
        </Stack>
    )
}