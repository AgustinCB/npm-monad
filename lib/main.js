"use strict";
// Identity Monad
Object.defineProperty(exports, "__esModule", { value: true });
var BasicMonad = (function () {
    function BasicMonad(content) {
        this.content = content;
    }
    BasicMonad.prototype.then = function (modifier) {
        return modifier(this.content);
    };
    BasicMonad.unit = function (value) {
        return new BasicMonad(value);
    };
    return BasicMonad;
}());
exports.default = BasicMonad;
var MonadicStatus = (function () {
    function MonadicStatus(content, status) {
        if (status === void 0) { status = null; }
        this.content = content;
        this.status = status;
    }
    MonadicStatus.prototype.statusOrElse = function (defaultStatus) {
        return this.status || defaultStatus;
    };
    MonadicStatus.prototype.getOrElse = function (defaultValue) {
        return this.content || defaultValue;
    };
    MonadicStatus.prototype.then = function (modifier) {
        return modifier(this.content, this.status);
    };
    MonadicStatus.unit = function (value, status) {
        if (status === void 0) { status = null; }
        return new MonadicStatus(value, status);
    };
    return MonadicStatus;
}());
exports.MonadicStatus = MonadicStatus;
var MonadicOutput = (function () {
    function MonadicOutput(content, output) {
        if (output === void 0) { output = []; }
        this.content = content;
        this.output = output;
    }
    MonadicOutput.prototype.then = function (modifier) {
        var temp = modifier(this.content);
        return new MonadicOutput(temp.content, this.output.concat(temp.output));
    };
    MonadicOutput.unit = function (value) {
        return new MonadicOutput(value);
    };
    MonadicOutput.out = function (output) {
        return new MonadicOutput(null, [output]);
    };
    return MonadicOutput;
}());
exports.MonadicOutput = MonadicOutput;
var option_1 = require("./option");
exports.Option = option_1.default;
var either_1 = require("./either");
exports.Either = either_1.default;
var try_1 = require("./try");
exports.Try = try_1.default;
//# sourceMappingURL=main.js.map