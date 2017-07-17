"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Try {
    /*
    content: V
    error: String
  
    constructor (content: V | ContentProvider<V>, error: String = null) {
      if (content.constructor === Function) {
        try {
          this.content = content()
        } catch (e) {
          this.content = null
          this.error = e.toString()
        }
      } else {
        this.content = content
      }
  
      this.error = error
    }
    */
    constructor(content, error = null) {
        this.content = content;
        this.error = error;
    }
    isFailure() {
        return !this.isSuccess();
    }
    isSuccess() {
        return this.error === undefined || this.error === null;
    }
    then(modifier) {
        if (this.isFailure()) {
            console.log("FAILURE", this.content, this.error);
            return new Try(null, this.error);
        }
        return modifier(this.content);
    }
    map(modifier) {
        return this.then(a => Try.unit(modifier(a)));
    }
    filterOrRaise(check, error) {
        if (this.isFailure() || !check(this.content)) {
            return Try.raise(this.error || error);
        }
        return Try.unit(this.content);
    }
    get() {
        return this.content;
    }
    getOrElse(defaultValue) {
        return this.content || defaultValue;
    }
    recover(recoverException) {
        if (this.isFailure()) {
            return Try.unit(recoverException(this.error));
        }
        return Try.unit(this.content);
    }
    handle(handleException) {
        if (this.isFailure()) {
            handleException(this.error);
        }
    }
    static unit(value) {
        return new Try(value);
    }
    static raise(exception) {
        return new Try(null, exception);
    }
}
exports.default = Try;
//# sourceMappingURL=try.js.map