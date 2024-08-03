export function incrementLetter(letter: string) {
    return increaseLetter(letter, 1);
}

export function changeLetter(letter: string, decrement?: boolean) {
    return increaseLetter(letter, decrement ? -1 : 1);
}

function increaseLetter(letter: string, amount: number) {
    const currentCharCode = letter.charCodeAt(0);

    return String.fromCharCode(getResultingCharCode(currentCharCode + amount));
}

function getResultingCharCode(unwrappedCode: number): number {
    const ENGLISH_ALPHABET_LENGTH = 26;
    const properMod = (n: number, m: number) => ((n % m) + m) % m;

    const charCodeA = 'A'.charCodeAt(0);
    const shiftedCharCode = unwrappedCode - charCodeA;
    const codeInAlphabet = Math.abs(
        properMod(shiftedCharCode, ENGLISH_ALPHABET_LENGTH)
    );

    return codeInAlphabet + charCodeA;
}
