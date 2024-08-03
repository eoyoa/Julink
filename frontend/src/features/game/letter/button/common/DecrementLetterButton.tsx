import { ChangeLetterButton } from './ChangeLetterButton.tsx';

interface DecrementLetterButtonProps {
    readonly hovering: boolean;
}

export function DecrementLetterButton({
    hovering,
}: DecrementLetterButtonProps) {
    return <ChangeLetterButton hovering={hovering} symbol={'-'} decrement />;
}
