export type GameState = {
    characters: CharacterState[],
    foundWord: boolean,
    clicks: number
}

export type CharacterState = {
    char: string,
    hints: Hint[],
    canGenerateHints: boolean
}

export type Hint = {
    char: string,
    type: HintType
}

export enum HintType {
    RIGHT = 'O',
    WRONG = 'X',
    MAYBE = '?',
    UNKNOWN = '-'
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
                currentHints: [],
                canGenerateHints: true,
            }
        }),
        foundWord: false,
        clicks: 0
    }
}

// TODO: move to backend
const correctWord = 'LETTER';

export default function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'click': {
            const i = action.charIndex;
            console.debug(`received click from ${i}`);

            const changedChars = getClickedChars(state.characters, action.charIndex, action.clickButton);

            const newState = {
                ...state,
                characters: changedChars,
                foundWord: changedChars.reduce((prev, curr, currI) =>
                    charIsCorrect(curr.char, currI) && prev, true),
                clicks: state.clicks + 1
            };
            if (newState.foundWord) console.debug('finished!');
            return newState;
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

    // TODO: this entire section could be done better. use map to avoid array assignment.
    if (toGenerate.length === 0) {
        // every letter is right.
        // reveal to the player that all are right.
        for (let i = 0; i < charStates.length; i++) {
            const currChar = newCharStates[i];
            if (validIndices.includes(i)) {
                // TODO: don't use assignment
                newCharStates[i] = {
                    ...currChar,
                    currentHints: currChar.hints.concat({
                        char: currChar.char,
                        type: HintType.RIGHT
                    })
                }
                continue;
            }
            // TODO: don't use assignment
            newCharStates[i] = {
                ...currChar,
                currentHints: currChar.hints.concat({
                    char: '-',
                    type: HintType.UNKNOWN
                })
            }
        }
    } else {
        // at least one letter is wrong.
        // reveal to the player a random wrong letter.
        const indexToHint = toGenerate[Math.floor(Math.random() * toGenerate.length)];

        for (let i = 0; i < charStates.length; i++) {
            const currChar = newCharStates[i];
            if (i === indexToHint) {
                // TODO: don't use assignment
                newCharStates[i] = {
                    ...currChar,
                    currentHints: currChar.hints.concat({
                        char: currChar.char,
                        type: HintType.WRONG
                    })
                }
                continue;
            }
            if (validIndices.includes(i)) {
                // TODO: don't use assignment
                newCharStates[i] = {
                    ...currChar,
                    currentHints: currChar.hints.concat({
                        char: currChar.char,
                        type: HintType.MAYBE
                    })
                }
                continue;
            }
            // TODO: don't use assignment
            newCharStates[i] = {
                ...currChar,
                currentHints: currChar.hints.concat({
                    char: '-',
                    type: HintType.UNKNOWN
                })
            }
        }

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