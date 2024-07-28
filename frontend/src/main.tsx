import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {TestLayout} from "../testing/test-layout/TestLayout.tsx";
import './index.css';

function throwNoRoot(): never {
    throw new ReferenceError('Root element was not found in index.html!');
}

createRoot(document.getElementById('root') ?? throwNoRoot()).render(
    <StrictMode>
        <TestLayout/>
    </StrictMode>
);