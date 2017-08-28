import {Monad} from './main'


export default class Either<T, T1> {
  content: T | T1
  isLeft: boolean
  isRight: boolean

  map<T2>(modifier: (a: T1) => T2): Either<T, T2> {
    if (this.isLeft) return Left.unit(this.getLeft())
    return Right.unit(modifier(this.get()))
  }

  filterOrElse(check: (a: T1) => boolean, defaultValue: T): Either<T, T1> {
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

export class Left<V> extends Either<V, any> implements Monad<V> {
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

export class Right<V> extends Either<any, V> implements Monad<V> {
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
