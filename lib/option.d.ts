import { Monad, Functor } from './main';
export default class Option<V> implements Monad<V>, Functor<V> {
    content: V;
    constructor(content?: V);
    get(): V;
    getOrElse(defaultValue: V): V;
    isDefined(): boolean;
    nonDefined(): boolean;
    then<V1>(modifier: (a: V) => Option<V1>): Option<V1>;
    map<V1>(modifier: (a: V) => V1): Option<V1>;
    filter(check: (a: V) => boolean): Option<V>;
    foreach(action: (a: V) => void): Option<V>;
    static unit<V>(value?: V): Option<V>;
    static none(): Option<any>;
}
