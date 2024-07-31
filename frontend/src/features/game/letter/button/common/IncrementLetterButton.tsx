import { ChangeLetterButton } from './ChangeLetterButton.tsx';
import { increment } from '../../../game.slice.ts';

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
            action={increment}
        />
    );
}
