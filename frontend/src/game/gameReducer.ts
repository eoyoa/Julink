export type GameState = {
    characters: string[]
}

export type IncrementAction = {
    type: 'increment',
    charIndex: number
}
export type DecrementAction = {
    type: 'decrement',
    charIndex: number
}

enum ClickButton {
    LEFT = 0,
    RIGHT = 2
}

export type GameAction = IncrementAction | DecrementAction

export default function GameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'increment': {
            const i = action.charIndex;
            console.debug(`received click from ${i}`);

            const newChars = getIncrementChars(state.characters, action.charIndex);

            return {
                ...state,
                characters: newChars
            };
        }
        case 'decrement': {
            const i = action.charIndex;
            console.debug(`received click from ${i}`);

            const newChars = getDecrementChars(state.characters, action.charIndex);

            return {
                ...state,
                characters: newChars
            };
        }
    }
}

// TODO: move all below to backend

function getIncrementChars(characters: string[], charIndex: number) {
    return getClickedChars(characters, charIndex, ClickButton.LEFT);
}

function getDecrementChars(characters: string[], charIndex: number) {
    return getClickedChars(characters, charIndex, ClickButton.RIGHT);
}

function getClickedChars(characters: string[], charIndex: number, clickButton: ClickButton) {
    const newChars = [...characters];
    const changeFunction = (() => {
        switch (clickButton) {
            case ClickButton.LEFT: {
                return increment;
            }
            case ClickButton.RIGHT: {
                return decrement;
            }
        }
    })();
    newChars[charIndex] = changeFunction(newChars[charIndex]);
    if (charIndex > 0) {
        const prevIndex = charIndex - 1;
        newChars[prevIndex] = changeFunction(newChars[prevIndex]);
    }
    if (charIndex < newChars.length - 1) {
        const nextIndex = charIndex + 1;
        newChars[nextIndex] = changeFunction(newChars[nextIndex]);
    }
    return newChars;
}

function increment(letter: string) {
    return increase(letter, 1);
}

function decrement(letter: string) {
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