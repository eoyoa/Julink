export type GameState = {
    characters: CharacterState[]
}

export type CharacterState = {
    char: string,
    isCorrect: boolean, // TODO: shouldn't exist! make the backend reveal hints when correct
    hints: string[]
}

export type ClickAction = {
    type: 'click',
    clickButton: ClickButton,
    charIndex: number
}

enum ClickButton {
    LEFT = 0,
    RIGHT = 2
}

export type GameAction = ClickAction

export const startWord = 'JULINK';

export function createInitialState(initialWord: string): GameState {
    return {
        characters: initialWord.split('').map(ch => {
            return {
                char: ch,
                isCorrect: false, // TODO: shouldn't initialize to false (shouldn't exist in the first place)
                hints: []
            }
        }),
    }
}

// TODO: move to backend
const correctWord = 'LETTER';

export default function GameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'click': {
            const i = action.charIndex;
            console.debug(`received click from ${i}`);

            const changedChars = getClickedChars(state.characters.map((ch) => ch.char), action.charIndex, action.clickButton);
            const validatedChars: CharacterState[] = changedChars.map((ch, i) => {
                return {
                    char: ch,
                    isCorrect: ch === correctWord.charAt(i),
                    hints: correctWord.substring(0, i).split('') // TODO: replace with actual hints
                }
            })

            return {
                ...state,
                characters: validatedChars
            };
        }
    }
}

// TODO: move logic elsewhere?

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

    // TODO: add monty hall logic here
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