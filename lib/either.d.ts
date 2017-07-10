import { Monad } from './main';
export default class Either<T, T1> {
    content: T | T1;
    isLeft: boolean;
    isRight: boolean;
    map<T2>(modifier: (a: T1) => T2): Either<T, T2>;
    filterOrElse(check: (a: T1) => boolean, defaultValue: T): Either<T, T1>;
    foreach(action: (a: T1) => void): void;
    get(): T1;
    getLeft(): T;
    getOrElse(defaultValue: T1): T1;
}
export declare class Left<V> extends Either<V, any> implements Monad<V> {
    content: V;
    isLeft: boolean;
    isRight: boolean;
    constructor(content: V);
    then<V1>(modifier: (a: V) => Left<V1>): Left<V1>;
    static unit<V>(value: V): Left<V>;
}
export declare class Right<V> extends Either<any, V> implements Monad<V> {
    content: V;
    isRight: boolean;
    isLeft: boolean;
    constructor(content: V);
    then<V1>(modifier: (a: V) => Right<V1>): Right<V1>;
    static unit<V>(value: V): Right<V>;
}
