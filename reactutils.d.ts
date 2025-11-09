import { Fiber } from "react-reconciler";

export interface ReactUtils {
    get rootInstance(): any;

    /** Gets the internal react data of a specified node. */
    getInternalInstance(node: HTMLElement): Fiber | undefined;

    /**
     * Attempts to find the "owner" node to the current node.
     * This is generally a node with an instance of a class component as `stateNode`.
     */
    getOwnerInstance(
        node: HTMLElement,
        options?: GetOwnerInstanceOptions,
    ): React.Component<any, any> | null;

    /** Creates an unrendered react component that wraps dom elements. */
    wrapElement(element: HTMLElement): React.ComponentClass;

    /** Disables react's hooks for the duration of the function. */
    wrapInHooks<T>(fc: React.FC<T>, customHooks: Partial<PatchedReactHooks>): React.FC<T>
}

export interface GetOwnerInstanceOptions {
    include?: string[];
    exclude?: string[];
    filter?: (node: React.Component<any, any>) => boolean;
}

interface PatchedReactHooks {
    use<T>(usable: PromiseLike<T> | React.Context<T>): T;
    useMemo<T>(factory: () => T): T;
    useState<T>(initial: T | (() => T)): [T, () => void];
    useReducer<T>(reducer: (state: T, action: any) => T, initial: T): [T, () => void];
    useRef<T>(value?: T): {current: T | null;};
    useCallback<T extends (...args: any[]) => any>(callback: T): T;
    useContext<T>(context: React.Context<T>): T;
    readContext<T>(context: React.Context<T>): T;
    useEffect(): void;
    useLayoutEffect(): void;
    useImperativeHandle(): void;
    useTransition(): [boolean, (callback: () => void) => void];
    useActionState: typeof React["useActionState"];
    useFormState: typeof React["useActionState"];
    useInsertionEffect(): void;
    useDebugValue(): void;
    useDeferredValue<T>(value: T): T;
    useSyncExternalStore<T>(subscribe: () => void, getSnapshot: () => T): T;
    useId(): string;
    useOptimistic: typeof React["useOptimistic"];
}

type Partial<T> = {
    [P in keyof T]?: T[P];
};