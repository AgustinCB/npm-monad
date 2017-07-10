import { Monad } from './main';
export declare class MonadEitherType<T, T1> implements Monad<T | T1> {
    content: T | T1;
    isLeft: boolean;
    isRight: boolean;
    then<V>(modifier: (a: T | T1) => MonadEitherType<T | V, T1 | V>): MonadEitherType<T | V, T1 | V>;
    map<T2>(modifier: (a: T1) => T2): MonadEitherType<T, T2>;
    filterOrElse(check: (a: T1) => boolean, defaultValue: T): MonadEitherType<T, T1>;
    foreach(action: (a: T1) => void): void;
    get(): T1;
    getLeft(): T;
    getOrElse(defaultValue: T1): T1;
}
export declare class Left<V> extends MonadEitherType<V, any> {
    content: V;
    isLeft: boolean;
    isRight: boolean;
    constructor(content: V);
    then<V1>(modifier: (a: V) => Left<V1>): Left<V1>;
    static unit<V>(value: V): Left<V>;
}
export declare class Right<V> extends MonadEitherType<any, V> {
    content: V;
    isRight: boolean;
    isLeft: boolean;
    constructor(content: V);
    then<V1>(modifier: (a: V) => Right<V1>): Right<V1>;
    static unit<V>(value: V): Right<V>;
}
