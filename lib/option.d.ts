import { Monad } from './main';
export declare class MonadicOption<V> implements Monad<V> {
    content: V;
    constructor(content?: V);
    get(): V;
    getOrElse(defaultValue: V): V;
    isDefined(): boolean;
    nonDefined(): boolean;
    then<V1>(modifier: (a: V) => MonadicOption<V1>): MonadicOption<V1>;
    map<V1>(modifier: (a: V) => V1): MonadicOption<V1>;
    filter(check: (a: V) => boolean): MonadicOption<V>;
    forEach(action: (a: V) => void): MonadicOption<V>;
    static unit<V>(value?: V): MonadicOption<V>;
}
