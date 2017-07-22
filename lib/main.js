"use strict";
// Identity Monad
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
var option_1 = require("./option");
exports.Option = option_1.default;
var either_1 = require("./either");
exports.Either = either_1.default;
var try_1 = require("./try");
exports.Try = try_1.default;
//# sourceMappingURL=main.js.map