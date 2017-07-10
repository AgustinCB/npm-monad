"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MonadEitherType {
    then(modifier) {
        if (this.isLeft)
            return Left.unit(this.getLeft()).then(modifier);
        return Right.unit(this.get()).then(modifier);
    }
    map(modifier) {
        if (this.isLeft)
            return Left.unit(this.getLeft());
        return this.then((a) => Right.unit(modifier(a)));
    }
    filterOrElse(check, defaultValue) {
        if (this.isLeft || !check(this.get()))
            return Left.unit(defaultValue);
        return Right.unit(this.get());
    }
    foreach(action) {
        if (this.isRight)
            action(this.get());
    }
    get() {
        if (this.isRight)
            return this.content;
        return null;
    }
    getLeft() {
        if (this.isLeft)
            return this.content;
        return null;
    }
    getOrElse(defaultValue) {
        return this.get() || defaultValue;
    }
}
exports.MonadEitherType = MonadEitherType;
class Left extends MonadEitherType {
    constructor(content) {
        super();
        this.content = content;
        this.isLeft = true;
        this.isRight = false;
    }
    then(modifier) {
        return modifier(this.content);
    }
    static unit(value) {
        return new Left(value);
    }
}
exports.Left = Left;
class Right extends MonadEitherType {
    constructor(content) {
        super();
        this.content = content;
        this.isRight = true;
        this.isLeft = false;
    }
    then(modifier) {
        return modifier(this.content);
    }
    static unit(value) {
        return new Right(value);
    }
}
exports.Right = Right;
//# sourceMappingURL=left.js.map