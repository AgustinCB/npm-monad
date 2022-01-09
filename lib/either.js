"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Either = /** @class */ (function () {
    function Either() {
    }
    Either.prototype.map = function (modifier) {
        if (this.isLeft)
            return Left.unit(this.getLeft());
        return Right.unit(modifier(this.get()));
    };
    Either.prototype.filterOrElse = function (check, defaultValue) {
        if (this.isLeft || !check(this.get()))
            return Left.unit(defaultValue);
        return Right.unit(this.get());
    };
    Either.prototype.foreach = function (action) {
        if (this.isRight)
            action(this.get());
    };
    Either.prototype.get = function () {
        if (this.isRight)
            return this.content;
        return null;
    };
    Either.prototype.getLeft = function () {
        if (this.isLeft)
            return this.content;
        return null;
    };
    Either.prototype.getOrElse = function (defaultValue) {
        return this.get() || defaultValue;
    };
    return Either;
}());
exports.default = Either;
var Left = /** @class */ (function (_super) {
    __extends(Left, _super);
    function Left(content) {
        var _this = _super.call(this) || this;
        _this.content = content;
        _this.isLeft = true;
        _this.isRight = false;
        return _this;
    }
    Left.prototype.then = function (modifier) {
        return modifier(this.content);
    };
    Left.unit = function (value) {
        return new Left(value);
    };
    return Left;
}(Either));
exports.Left = Left;
var Right = /** @class */ (function (_super) {
    __extends(Right, _super);
    function Right(content) {
        var _this = _super.call(this) || this;
        _this.content = content;
        _this.isRight = true;
        _this.isLeft = false;
        return _this;
    }
    Right.prototype.then = function (modifier) {
        return modifier(this.content);
    };
    Right.unit = function (value) {
        return new Right(value);
    };
    return Right;
}(Either));
exports.Right = Right;
//# sourceMappingURL=either.js.map