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
  then<T1> (modifier: (a: any) => MonadicException<T1>): MonadicException<any> {
    if (this.value.error) {
      return new MonadicException(null, this.value.error)
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

export class MonadicStatus<V, S> extends Monad<{ value: V, status: S}> {
  constructor (value: V, status: S = null) {
    super({ status, value })
  }

  // This should actually be then<T1> (modifier: (a: V) => Monad<T1>): Monad<any>
  then<T1> (modifier: (a: any) => MonadicStatus<T1, S>): MonadicStatus<any, S> {
    return modifier(this.value)
  }

  public static unit<V, S> (value: V, status: S = null): MonadicStatus<V, S> {
    return new MonadicStatus(value, status)
  }
}

export class MonadicOutput<V> extends Monad<{ value: V, output: Array<String> }> {
  constructor (value: V, output: Array<String> = []) {
    super({ output, value })
  }

  // This should actually be then<T1> (modifier: (a: V) => Monad<T1>): Monad<any>
  then<T1> (modifier: (a: any) => MonadicOutput<T1>): MonadicOutput<any> {
    const temp = modifier(this.value)
    return new MonadicOutput(temp.value.value, this.value.output.concat(temp.value.output))
  }

  public static unit<V> (value: V): MonadicOutput<V> {
    return new MonadicOutput(value)
  }

  public static out (output: String): MonadicOutput<any> {
    return new MonadicOutput(null, [output])
  }
}
