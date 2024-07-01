import {PropsWithChildren, ReactElement} from "react";
import {render, RenderOptions} from "@testing-library/react";
import {AppStore, RootState, setupStore} from "../src/app/store";
import {Provider} from "react-redux";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    store?: AppStore,
    preloadedState?: Partial<RootState>
}

export function renderWithProviders(
    ui: ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {},
) {
    const {
        store = setupStore(),
        ...renderOptions
    } = extendedRenderOptions;

    const Wrapper = ({children}: PropsWithChildren) => (
        <Provider store={store}>{children}</Provider>
    );

    return {
        store,
        ...render(ui, {wrapper: Wrapper, ...renderOptions})
    };
}