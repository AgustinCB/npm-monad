"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Try = /** @class */ (function () {
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
    function Try(content, error) {
        if (error === void 0) { error = null; }
        this.content = content;
        this.error = error;
    }
    Try.prototype.isFailure = function () {
        return !this.isSuccess();
    };
    Try.prototype.isSuccess = function () {
        return this.error === undefined || this.error === null;
    };
    Try.prototype.then = function (modifier) {
        if (this.isFailure()) {
            console.log("FAILURE", this.content, this.error);
            return new Try(null, this.error);
        }
        return modifier(this.content);
    };
    Try.prototype.map = function (modifier) {
        return this.then(function (a) { return Try.unit(modifier(a)); });
    };
    Try.prototype.filterOrRaise = function (check, error) {
        if (this.isFailure() || !check(this.content)) {
            return Try.raise(this.error || error);
        }
        return Try.unit(this.content);
    };
    Try.prototype.get = function () {
        return this.content;
    };
    Try.prototype.getOrElse = function (defaultValue) {
        return this.content || defaultValue;
    };
    Try.prototype.recover = function (recoverException) {
        if (this.isFailure()) {
            return Try.unit(recoverException(this.error));
        }
        return Try.unit(this.content);
    };
    Try.prototype.handle = function (handleException) {
        if (this.isFailure()) {
            handleException(this.error);
        }
    };
    Try.unit = function (value) {
        return new Try(value);
    };
    Try.raise = function (exception) {
        return new Try(null, exception);
    };
    return Try;
}());
exports.default = Try;
//# sourceMappingURL=try.js.map