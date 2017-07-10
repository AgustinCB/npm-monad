"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MonadicOption {
    constructor(content) {
        this.content = content;
    }
    get() {
        return this.content;
    }
    getOrElse(defaultValue) {
        return this.content || defaultValue;
    }
    isDefined() {
        return !!this.content;
    }
    nonDefined() {
        return !this.nonDefined();
    }
    then(modifier) {
        if (this.nonDefined()) {
            return new MonadicOption(null);
        }
        return modifier(this.content);
    }
    map(modifier) {
        return this.then(a => MonadicOption.unit(modifier(a)));
    }
    filter(check) {
        if (this.nonDefined() || !check(this.content)) {
            return new MonadicOption(null);
        }
        return new MonadicOption(this.content);
    }
    forEach(action) {
        if (this.isDefined()) {
            action(this.content);
        }
        return this;
    }
    static unit(value) {
        return new MonadicOption(value);
    }
}
exports.MonadicOption = MonadicOption;
//# sourceMappingURL=option.js.map