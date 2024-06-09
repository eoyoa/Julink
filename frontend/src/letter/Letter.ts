export class Letter {
    // TODO: look into making _letter a special length 1 string type
    constructor(private readonly _letter: string) {
        if (_letter.length !== 1) {
            throw new TypeError('Letter must be one character');
        }
        if (!this.isAlphabetic(_letter.toLowerCase())) {
            throw new TypeError('Letter must be an English letter');
        }
        this._letter = _letter.toLowerCase();
    }

    // public methods

    get letter(): string { return this._letter; }

    increase(amount: number) {
        const currentCharCode = this._letter.charCodeAt(0);

        return new Letter(String.fromCharCode(this.getResultingCharCode(currentCharCode, amount)));
    }

    // helper methods
    private readonly ENGLISH_ALPHABET_LENGTH = 26;

    private isAlphabetic(letter: string): boolean {
        const letterCharCode = letter.charCodeAt(0);
        return (letterCharCode >= 'a'.charCodeAt(0)) && (letterCharCode <= 'z'.charCodeAt(0));
    }

    private getResultingCharCode(currentCharCode: number, amount: number): number {
        const charCodeA = 'a'.charCodeAt(0);
        const shiftedCharCode = (currentCharCode + amount) - charCodeA;
        const codeInAlphabet = shiftedCharCode % this.ENGLISH_ALPHABET_LENGTH;

        return codeInAlphabet + charCodeA;
    }
}