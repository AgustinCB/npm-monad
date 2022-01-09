"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option = /** @class */ (function () {
    function Option(content) {
        this.content = content;
    }
    Option.prototype.get = function () {
        return this.content;
    };
    Option.prototype.getOrElse = function (defaultValue) {
        return this.isDefined() ? this.content : defaultValue;
    };
    Option.prototype.isDefined = function () {
        return this.content !== null && this.content !== undefined;
    };
    Option.prototype.nonDefined = function () {
        return !this.isDefined();
    };
    Option.prototype.then = function (modifier) {
        if (this.nonDefined()) {
            return Option.none();
        }
        return modifier(this.content);
    };
    Option.prototype.map = function (modifier) {
        if (this.nonDefined()) {
            return Option.none();
        }
        return Option.unit(modifier(this.content));
    };
    Option.prototype.filter = function (check) {
        if (this.nonDefined() || !check(this.content)) {
            return Option.none();
        }
        return new Option(this.content);
    };
    Option.prototype.foreach = function (action) {
        if (this.isDefined()) {
            action(this.content);
        }
        return this;
    };
    Option.prototype.orElseDo = function (action) {
        if (this.nonDefined()) {
            action();
        }
        return this;
    };
    Option.unit = function (value) {
        return new Option(value);
    };
    Option.none = function () {
        return new Option(null);
    };
    Option.some = Option.unit;
    return Option;
}());
exports.default = Option;
//# sourceMappingURL=option.js.map