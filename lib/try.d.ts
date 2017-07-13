import { Monad } from './main';
export declare class MonadicException<V> implements Monad<V> {
    content: V;
    error: String;
    constructor(content: V, error?: String);
    isFailure(): boolean;
    isSuccess(): boolean;
    then<V1>(modifier: (a: V) => MonadicException<V1>): MonadicException<V1>;
    map<V1>(modifier: (a: V) => V1): MonadicException<V1>;
    filterOrRaise(check: (a: V) => boolean, error: String): MonadicException<V>;
    getOrElse(defaultValue: V): V;
    recover(recoverException: (e: String) => V): MonadicException<V>;
    handle(handleException: (e: String) => void): void;
    static unit<V>(value: V): MonadicException<V>;
    static raise(exception: String): MonadicException<any>;
}
