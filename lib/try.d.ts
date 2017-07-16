import { Monad } from './main';
export default class Try<V> implements Monad<V> {
    content: V;
    error: String;
    constructor(content: V, error?: String);
    isFailure(): boolean;
    isSuccess(): boolean;
    then<V1>(modifier: (a: V) => Try<V1>): Try<V1>;
    map<V1>(modifier: (a: V) => V1): Try<V1>;
    filterOrRaise(check: (a: V) => boolean, error: String): Try<V>;
    get(): V;
    getOrElse(defaultValue: V): V;
    recover(recoverException: (e: String) => V): Try<V>;
    handle(handleException: (e: String) => void): void;
    static unit<V>(value: V): Try<V>;
    static raise(exception: String): Try<any>;
}
