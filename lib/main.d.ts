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
    then<T1>(modifier: (a: any) => Monad<T1>): Monad<any>;
    static unit<V>(value: V): MonadicException<V>;
    static raise(exception: String): MonadicException<any>;
}
