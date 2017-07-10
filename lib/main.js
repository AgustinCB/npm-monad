// Identity Monad
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicMonad {
    constructor(content) {
        this.content = content;
    }
    then(modifier) {
        return modifier(this.content);
    }
    static unit(value) {
        return new BasicMonad(value);
    }
}
exports.default = BasicMonad;
class MonadicException {
    constructor(content, error = null) {
        this.content = content;
        this.error = error;
    }
    then(modifier) {
        if (this.error) {
            return new MonadicException(null, this.error);
        }
        return modifier(this.content);
    }
    getOrElse(defaultValue) {
        return this.content || defaultValue;
    }
    static unit(value) {
        return new MonadicException(value);
    }
    static raise(exception) {
        return new MonadicException(null, exception);
    }
}
exports.MonadicException = MonadicException;
class MonadicStatus {
    constructor(content, status = null) {
        this.content = content;
        this.status = status;
    }
    statusOrElse(defaultStatus) {
        return this.status || defaultStatus;
    }
    getOrElse(defaultValue) {
        return this.content || defaultValue;
    }
    then(modifier) {
        return modifier(this.content, this.status);
    }
    static unit(value, status = null) {
        return new MonadicStatus(value, status);
    }
}
exports.MonadicStatus = MonadicStatus;
class MonadicOutput {
    constructor(content, output = []) {
        this.content = content;
        this.output = output;
    }
    then(modifier) {
        const temp = modifier(this.content);
        return new MonadicOutput(temp.content, this.output.concat(temp.output));
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