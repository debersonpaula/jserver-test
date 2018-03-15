export declare class TJNode<T> {
    protected parent?: TJNode<T>;
    object: T;
    nodes: {
        [s: string]: TJNode<T>;
    };
    constructor(object?: any, parent?: TJNode<T>);
    add(key: string, object: any): TJNode<T>;
    toJSON(): any;
}
