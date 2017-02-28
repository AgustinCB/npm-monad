// Identity Monad

export default class Monad<T> {
  value: T

  constructor (value: T) {
    this.value = value
  }

  then<T1> (modifier: (a: T) => Monad<T1>): Monad<T1> {
    return modifier(this.value)
  }

  public static unit<T> (value: T): Monad<T> {
    return new Monad(value)
  }

  public static then<T1, T2> (initial: Monad<T1>): (modifier: (a: T1) => Monad<T2>) => Monad<T2> {
    return initial.then
  }
}

export class MonadicException<V> extends Monad<{ error: String, value: V }> {
  constructor (value: V, exception: String = null) {
    super({
      error: exception,
      value: value
    })
  }

  // This should actually be then<T1> (modifier: (a: V) => Monad<T1>): Monad<any>
  then<T1> (modifier: (a: any) => Monad<T1>): Monad<any> {
    if (this.value.error) {
      return new Monad(this.value)
    }
    return modifier(this.value.value)
  }

  public static unit<V> (value: V): MonadicException<V> {
    return new MonadicException(value)
  }

  public static raise (exception: String): MonadicException<any> {
    return new MonadicException(null, exception)
  }
}
