import { createContext, PropsWithChildren, useContext } from 'react';

interface IndexState {
    readonly index: number;
}

export const IndexContext = createContext<IndexState | undefined>(undefined);

export function useIndexContext() {
    const context = useContext(IndexContext);

    if (!context)
        throw new ReferenceError(
            'Tried to use index context without a provider!'
        );

    return context;
}

interface IndexProviderProps {
    readonly index: number;
}

export function IndexProvider({
    index,
    children,
}: PropsWithChildren<IndexProviderProps>) {
    return (
        <IndexContext.Provider value={{ index: index }}>
            {children}
        </IndexContext.Provider>
    );
}
