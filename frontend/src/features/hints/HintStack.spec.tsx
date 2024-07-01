import {renderWithProviders} from "../../../testing/test-utils.tsx";
import HintStack from "./HintStack.tsx";
import {Hint, HintType} from "./hints.slice.ts";

const testHintRow1: Hint[] = [
    {type: HintType.WRONG, char: "A"},
    {type: HintType.MAYBE, char: "B"},
    {type: HintType.MAYBE, char: "C"},
    {type: HintType.UNKNOWN, char: "-"},
    {type: HintType.UNKNOWN, char: "-"},
    {type: HintType.UNKNOWN, char: "-"},
]
const testHintRow2: Hint[] = [
    {type: HintType.UNKNOWN, char: "-"},
    {type: HintType.RIGHT, char: "D"},
    {type: HintType.RIGHT, char: "E"},
    {type: HintType.RIGHT, char: "F"},
    {type: HintType.UNKNOWN, char: "-"},
    {type: HintType.UNKNOWN, char: "-"},
]

describe.concurrent('hint stack component tests', () => {
    it('should render empty grid if no hints in store', () => {
        renderWithProviders(<HintStack/>);
    });
    it('should render 1 hint row if 1 hint row is in store', () => {
        const hintsWith1Row: Hint[][] = [testHintRow1];

        renderWithProviders(<HintStack/>, {
            preloadedState: {
                hints: hintsWith1Row
            }
        });


    });
    it('should render multiple hint rows if multiple hint rows are in store', () => {
        const hintsWith2Rows: Hint[][] = [
            testHintRow1,
            testHintRow2
        ];

        renderWithProviders(<HintStack/>, {
            preloadedState: {
                hints: hintsWith2Rows
            }
        });
    });
});