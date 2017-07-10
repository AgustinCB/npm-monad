import {Monad} from './main'


export class MonadEitherType<T, T1> implements Monad<T | T1> {
  content: T | T1
  isLeft: boolean
  isRight: boolean

  then<V> (modifier: (a: T | T1) => MonadEitherType<T | V, T1 | V>): MonadEitherType<T | V, T1 | V> {
    if (this.isLeft) return Left.unit(this.getLeft()).then(modifier)
    return Right.unit(this.get()).then(modifier)
  }

  map<T2>(modifier: (a: T1) => T2): MonadEitherType<T, T2> {
    if (this.isLeft) return Left.unit(this.getLeft())
    return this.then((a: T1) => Right.unit(modifier(a)))
  }

  filterOrElse(check: (a: T1) => boolean, defaultValue: T): MonadEitherType<T, T1> {
    if (this.isLeft || !check(this.get())) return Left.unit(defaultValue)
    return Right.unit(this.get())
  }

  foreach(action: (a: T1) => void) {
    if (this.isRight) action(this.get())
  }

  get(): T1 {
    if (this.isRight) return <T1> this.content
    return null
  }

  getLeft(): T {
    if (this.isLeft) return <T> this.content
    return null
  }

  getOrElse(defaultValue: T1): T1 {
    return this.get() || defaultValue
  }
}

export class Left<V> extends MonadEitherType<V, any> {
  isLeft: boolean = true
  isRight: boolean = false

  constructor(public content: V) {
    super()
  }

  then<V1> (modifier: (a: V) => Left<V1>): Left<V1> {
    return modifier(this.content)
  }

  public static unit<V>(value: V): Left<V> {
    return new Left(value)
  }
}

export class Right<V> extends MonadEitherType<any, V> {
  isRight: boolean = true
  isLeft: boolean = false

  constructor(public content: V) {
    super()
  }

  then<V1> (modifier: (a: V) => Right<V1>): Right<V1> {
    return modifier(this.content)
  }

  public static unit<V>(value: V): Right<V> {
    return new Right(value)
  }
}
