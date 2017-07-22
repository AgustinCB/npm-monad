export interface Monad<T> {
    content: T;
    then<T1, M extends Monad<T1>>(modifier: (a: T) => M): M;
}
export default class BasicMonad<V> implements Monad<V> {
    content: V;
    constructor(content: V);
    then<V1>(modifier: (a: V) => BasicMonad<V1>): BasicMonad<V1>;
    static unit<V>(value: V): BasicMonad<V>;
}
export declare class MonadicStatus<V, S> implements Monad<V> {
    content: V;
    status: S;
    constructor(content: V, status?: S);
    statusOrElse(defaultStatus: S): S;
    getOrElse(defaultValue: V): V;
    then<V1>(modifier: (a: V, s: S) => MonadicStatus<V1, S>): MonadicStatus<V1, S>;
    static unit<V, S>(value: V, status?: S): MonadicStatus<V, S>;
}
export declare class MonadicOutput<V> implements Monad<V> {
    content: V;
    output: Array<String>;
    constructor(content: V, output?: Array<String>);
    then<V1>(modifier: (a: V) => MonadicOutput<V1>): MonadicOutput<V1>;
    static unit<V>(value: V): MonadicOutput<V>;
    static out(output: String): MonadicOutput<any>;
}
export { default as Option } from './option';
export { default as Either } from './either';
export { default as Try } from './try';
