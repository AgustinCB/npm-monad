export default class Monad<T> {
    value: T;
    constructor(value: T);
    then<T1>(modifier: (a: T) => Monad<T1>): Monad<T1>;
    static unit<T>(value: T): Monad<T>;
    static then<T1, T2>(initial: Monad<T1>): (modifier: (a: T1) => Monad<T2>) => Monad<T2>;
}
export declare class MonadicException<V> extends Monad<{
    error: String;
    value: V;
}> {
    constructor(value: V, exception?: String);
    then<T1>(modifier: (a: any) => MonadicException<T1>): MonadicException<any>;
    static unit<V>(value: V): MonadicException<V>;
    static raise(exception: String): MonadicException<any>;
}
export declare class MonadicStatus<V, S> extends Monad<{
    value: V;
    status: S;
}> {
    constructor(value: V, status?: S);
    then<T1>(modifier: (a: any) => MonadicStatus<T1, S>): MonadicStatus<any, S>;
    static tick<S>(status: S): MonadicStatus<any, S>;
    static unit<V>(value: V): MonadicStatus<V, any>;
}
export declare class MonadicOutput<V> extends Monad<{
    value: V;
    output: Array<String>;
}> {
    constructor(value: V, output?: Array<String>);
    then<T1>(modifier: (a: any) => MonadicOutput<T1>): MonadicOutput<any>;
    static unit<V>(value: V): MonadicOutput<V>;
    static out(output: String): MonadicOutput<any>;
}
