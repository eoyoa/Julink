export type GameState = {
    characters: CharacterState[]
}

export type CharacterState = {
    char: string,
    hints: Hint[],
    canGenerateHints: boolean
}

export type Hint = {
    char: string,
    isRight: boolean
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
                hints: [],
                canGenerateHints: true,
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

            const changedChars = getClickedChars(state.characters, action.charIndex, action.clickButton);

            return {
                ...state,
                characters: changedChars
            };
        }
    }
}

// TODO: move logic elsewhere?

function charIsCorrect(mutatedChar: string, charIndex: number) {
    return mutatedChar === correctWord.charAt(charIndex);
}

function getClickedChars(charStates: CharacterState[], charIndex: number, clickButton: ClickButton) {
    const newCharStates = [...charStates];
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

    function changeState(charState: CharacterState) {
        return {
            ...charState,
            char: changeFunction(charState.char)
        }
    }

    const canGenerate = newCharStates[charIndex].canGenerateHints;
    let shouldGenerate = false;

    // get valid indices to mutate
    let validIndices = [charIndex];
    if (charIndex > 0) validIndices = validIndices.concat(charIndex - 1);
    if (charIndex < charStates.length - 1) validIndices = validIndices.concat(charIndex + 1);

    for (const i of validIndices) {
        // TODO: https://react.dev/learn/updating-arrays-in-state don't use assignment
        newCharStates[i] = changeState(charStates[i]);
        if (!shouldGenerate && charIsCorrect(newCharStates[i].char, i)) {
            shouldGenerate = true;
        }
    }

    if (!canGenerate || !shouldGenerate) {
        if (shouldGenerate && !canGenerate) console.debug(`cannot generate new hints from ${charIndex}!`)
        return newCharStates;
    }

    console.debug(`one of the ${validIndices.length} characters is right and we can generate hints from ${charIndex}.`);
    console.debug('generating...');
    newCharStates[charIndex].canGenerateHints = false;
    const toGenerate = validIndices.filter(i => !charIsCorrect(newCharStates[i].char, i));

    if (toGenerate.length === 0) {
        // every letter is right.
        // reveal to the player that all are right.
        for (const i of validIndices) {
            // TODO: don't use assignment
            newCharStates[i].hints = newCharStates[i].hints.concat({
                char: newCharStates[i].char,
                isRight: true,
            });
        }
    } else {
        // at least one letter is wrong.
        // reveal to the player a random wrong letter.
        const indexToHint = toGenerate[Math.floor(Math.random() * toGenerate.length)];
        // TODO: don't use assignment
        newCharStates[indexToHint].hints = newCharStates[indexToHint].hints.concat({
            char: newCharStates[indexToHint].char,
            isRight: false,
        });
    }

    return newCharStates;
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