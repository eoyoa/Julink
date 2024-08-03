export enum GameStatus {
    IN_PROGRESS,
    LOADING,
    WON,
    LOST,
}

export type Hint = LetterHint | UnknownLetterHint;

export interface LetterHint {
    readonly type: Omit<HintType, HintType.UNKNOWN>;
    readonly letter: string;
}

export interface UnknownLetterHint {
    readonly type: HintType.UNKNOWN;
}

export enum HintType {
    RIGHT = '✓',
    WRONG = '✗',
    MAYBE = '?',
    UNKNOWN = '-',
}
