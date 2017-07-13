"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MonadicException {
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
        return this.error === undefined || this.error === null;
    }
    isSuccess() {
        return !this.isFailure();
    }
    then(modifier) {
        if (this.isFailure()) {
            return new MonadicException(null, this.error);
        }
        return modifier(this.content);
    }
    map(modifier) {
        return this.then(a => MonadicException.unit(modifier(a)));
    }
    filterOrRaise(check, error) {
        if (this.isFailure() || !check(this.content)) {
            return MonadicException.raise(this.error || error);
        }
        return MonadicException.unit(this.content);
    }
    getOrElse(defaultValue) {
        return this.content || defaultValue;
    }
    recover(recoverException) {
        if (this.isFailure()) {
            return MonadicException.unit(recoverException(this.error));
        }
        return MonadicException.unit(this.content);
    }
    handle(handleException) {
        if (this.isFailure()) {
            handleException(this.error);
        }
    }
    static unit(value) {
        return new MonadicException(value);
    }
    static raise(exception) {
        return new MonadicException(null, exception);
    }
}
exports.MonadicException = MonadicException;
//# sourceMappingURL=try.js.map