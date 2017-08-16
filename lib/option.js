"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Option {
    constructor(content) {
        this.content = content;
    }
    get() {
        return this.content;
    }
    getOrElse(defaultValue) {
        return this.isDefined() ? this.content : defaultValue;
    }
    isDefined() {
        return this.content !== null && this.content !== undefined;
    }
    nonDefined() {
        return !this.isDefined();
    }
    then(modifier) {
        if (this.nonDefined()) {
            return Option.none();
        }
        return modifier(this.content);
    }
    map(modifier) {
        return this.then(a => Option.unit(modifier(a)));
    }
    filter(check) {
        if (this.nonDefined() || !check(this.content)) {
            return Option.none();
        }
        return new Option(this.content);
    }
    foreach(action) {
        if (this.isDefined()) {
            action(this.content);
        }
        return this;
    }
    orElseDo(action) {
        if (this.nonDefined()) {
            action();
        }
        return this;
    }
    static unit(value) {
        return new Option(value);
    }
    static none() {
        return new Option(null);
    }
}
exports.default = Option;
//# sourceMappingURL=option.js.map