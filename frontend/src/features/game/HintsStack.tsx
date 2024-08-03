import { useIndexContext } from '@/features/game/letter/IndexProvider.tsx';
import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '@/common/hooks.ts';
import { Hint, HintType, LetterHint } from '@/features/game/types.ts';

function isLetterHint(hint: Hint): hint is LetterHint {
    return hint.type !== HintType.UNKNOWN;
}

export function HintsStack() {
    const { index } = useIndexContext();
    const hints = useAppSelector((state) => state.game.hints[index]);

    return hints.map((hint, index) =>
        isLetterHint(hint) ? (
            <Stack direction={'row'} key={index} spacing={1}>
                <Typography>{hint.type}</Typography>
                <Typography>{hint.letter}</Typography>
            </Stack>
        ) : (
            <Typography key={index}>{hint.type}</Typography>
        )
    );
}
