export function increment(letter: string) {
    return increase(letter, 1);
}

export function decrement(letter: string) {
    return decrease(letter, 1);
}

function decrease(letter: string, amount: number) {
    return increase(letter, -amount);
}

function increase(letter: string, amount: number) {
    const currentCharCode = letter.charCodeAt(0);

    return String.fromCharCode(getResultingCharCode(currentCharCode + amount));
}

function getResultingCharCode(unwrappedCode: number): number {
    const ENGLISH_ALPHABET_LENGTH = 26;
    const properMod = (n: number, m: number) => ((n % m) + m) % m;

    const charCodeA = 'A'.charCodeAt(0);
    const shiftedCharCode = (unwrappedCode) - charCodeA;
    const codeInAlphabet = Math.abs(properMod(shiftedCharCode, ENGLISH_ALPHABET_LENGTH));

    return codeInAlphabet + charCodeA;
}