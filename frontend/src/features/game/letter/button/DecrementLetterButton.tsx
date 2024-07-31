import { ChangeLetterButton } from './ChangeLetterButton.tsx';
import { decrement } from '../../game.slice.ts';

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
            action={decrement}
        />
    );
}
