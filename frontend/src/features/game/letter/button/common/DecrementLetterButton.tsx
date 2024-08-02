import { ChangeLetterButton } from './ChangeLetterButton.tsx';
import { decrementLetter } from '@/features/game/letter/letter-utils.ts';

interface DecrementLetterButtonProps {
    readonly hovering: boolean;
}

export function DecrementLetterButton({
    hovering,
}: DecrementLetterButtonProps) {
    return (
        <ChangeLetterButton
            hovering={hovering}
            symbol={'-'}
            changeFunction={decrementLetter}
        />
    );
}
