// Identity Monad
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Monad {
    constructor(value) {
        this.value = value;
    }
    then(modifier) {
        return modifier(this.value);
    }
    static unit(value) {
        return new Monad(value);
    }
    static then(initial) {
        return initial.then;
    }
}
exports.default = Monad;
class MonadicException extends Monad {
    constructor(value, exception = null) {
        super({
            error: exception,
            value: value
        });
    }
    // This should actually be then<T1> (modifier: (a: V) => Monad<T1>): Monad<any>
    then(modifier) {
        if (this.value.error) {
            return new Monad(this.value);
        }
        return modifier(this.value.value);
    }
    static unit(value) {
        return new MonadicException(value);
    }
    static raise(exception) {
        return new MonadicException(null, exception);
    }
}
exports.MonadicException = MonadicException;
//# sourceMappingURL=main.js.map