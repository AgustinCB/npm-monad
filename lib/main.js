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
            return new MonadicException(null, this.value.error);
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
class MonadicStatus extends Monad {
    constructor(value, status = null) {
        super({ status, value });
    }
    // This should actually be then<T1> (modifier: (a: V) => Monad<T1>): Monad<any>
    then(modifier) {
        const temp = modifier(this.value);
        console.log('then', temp, this, new MonadicStatus(this.value.value, temp.value.status));
        return new MonadicStatus(this.value.value, temp.value.status);
    }
    static tick(status) {
        return new MonadicStatus(null, status);
    }
    static unit(value) {
        return new MonadicStatus(value);
    }
}
exports.MonadicStatus = MonadicStatus;
class MonadicOutput extends Monad {
    constructor(value, output = []) {
        super({ output, value });
    }
    // This should actually be then<T1> (modifier: (a: V) => Monad<T1>): Monad<any>
    then(modifier) {
        const temp = modifier(this.value);
        return new MonadicOutput(temp.value.value, this.value.output.concat(temp.value.output));
    }
    static unit(value) {
        return new MonadicOutput(value);
    }
    static out(output) {
        return new MonadicOutput(null, [output]);
    }
}
exports.MonadicOutput = MonadicOutput;
//# sourceMappingURL=main.js.map