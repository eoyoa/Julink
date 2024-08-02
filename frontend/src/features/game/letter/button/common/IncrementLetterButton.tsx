import { ChangeLetterButton } from './ChangeLetterButton.tsx';
import { incrementLetter } from '@/features/game/letter/letter-utils.ts';

interface IncrementLetterButtonProps {
    readonly hovering: boolean;
}

export function IncrementLetterButton({
    hovering,
}: IncrementLetterButtonProps) {
    return (
        <ChangeLetterButton
            hovering={hovering}
            symbol={'+'}
            changeFunction={incrementLetter}
        />
    );
}
