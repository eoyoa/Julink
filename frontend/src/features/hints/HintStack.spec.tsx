import {renderWithProviders} from "../../../testing/test-utils.tsx";
import {HintStack} from "./HintStack.tsx";
import {Hint, HintType} from "./hints.slice.ts";
import {expect} from "vitest";

const testHintRow1: Hint = [
    {type: HintType.WRONG, char: "A"},
    {type: HintType.MAYBE, char: "B"},
    {type: HintType.MAYBE, char: "C"},
    {type: HintType.UNKNOWN, char: "-"},
    {type: HintType.UNKNOWN, char: "-"},
    {type: HintType.UNKNOWN, char: "-"},
]
const testHintRow2: Hint = [
    {type: HintType.UNKNOWN, char: "-"},
    {type: HintType.RIGHT, char: "D"},
    {type: HintType.RIGHT, char: "E"},
    {type: HintType.RIGHT, char: "F"},
    {type: HintType.UNKNOWN, char: "-"},
    {type: HintType.UNKNOWN, char: "-"},
]

describe('hint stack component tests', () => {
    it('should render empty grid if no hints in store', async () => {
        const renderResult = renderWithProviders(<HintStack/>);

        const hintStack = renderResult.getByLabelText('Hint stack');

        expect(hintStack).toBeInTheDocument();
        expect(hintStack).toBeEmptyDOMElement();
    });
    it('should render 1 hint row if 1 hint row is in store', async () => {
        const hintsWith1Row: Hint[] = [testHintRow1];

        const renderResult = renderWithProviders(<HintStack/>, {
            preloadedState: {
                currentHints: hintsWith1Row
            }
        });

        const hintStack = renderResult.getByLabelText('Hint stack');

        expect(hintStack).not.toBeEmptyDOMElement();

        const actualHintRow = renderResult.queryByLabelText('Hint 1');
        expect(actualHintRow).toBeInTheDocument();

        for (const letterHint of testHintRow1) {
            expect(renderResult.getAllByLabelText(`${letterHint.type} ${letterHint.char}`)[0]).toBeInTheDocument();
        }
    });
    it('should render multiple hint rows if multiple hint rows are in store', async () => {
        const hintsWith2Rows: Hint[] = [
            testHintRow1,
            testHintRow2
        ];

        const renderResult = renderWithProviders(<HintStack/>, {
            preloadedState: {
                currentHints: hintsWith2Rows
            }
        });

        const firstHintRow = renderResult.queryByLabelText('Hint 1');
        const secondHintRow = renderResult.queryByLabelText('Hint 2');
        expect(firstHintRow).toBeInTheDocument();
        expect(secondHintRow).toBeInTheDocument();

        for (const letterHint of testHintRow1) {
            expect(renderResult.getAllByLabelText(`${letterHint.type} ${letterHint.char}`)[0]).toBeInTheDocument();
        }
        for (const letterHint of testHintRow2) {
            expect(renderResult.getAllByLabelText(`${letterHint.type} ${letterHint.char}`)[0]).toBeInTheDocument();
        }
    });
});