import { ChangeLetterButton } from './ChangeLetterButton.tsx';

interface IncrementLetterButtonProps {
    readonly hovering: boolean;
}

export function IncrementLetterButton({
    hovering,
}: IncrementLetterButtonProps) {
    return <ChangeLetterButton hovering={hovering} symbol={'+'} />;
}
