// Identity Monad

export interface Monad<T> {
  content: T

  then<T1, M extends Monad<T1>> (modifier: (a: T) => M): M
}

export default class BasicMonad<V> implements Monad<V> {
  constructor(public content: V) {
  }

  then<V1> (modifier: (a: V) => BasicMonad<V1>): BasicMonad<V1> {
    return modifier(this.content)
  }

  public static unit<V>(value: V): BasicMonad<V> {
    return new BasicMonad(value)
  }
}

export class MonadicStatus<V, S> implements Monad<V> {
  constructor (public content: V, public status: S = null) {
  }

  statusOrElse(defaultStatus: S): S {
    return this.status || defaultStatus
  }

  getOrElse(defaultValue: V): V {
    return this.content || defaultValue
  }

  then<V1> (modifier: (a: V, s: S) => MonadicStatus<V1, S>): MonadicStatus<V1, S> {
    return modifier(this.content, this.status)
  }

  public static unit<V, S> (value: V, status: S = null): MonadicStatus<V, S> {
    return new MonadicStatus(value, status)
  }
}

export class MonadicOutput<V> implements Monad<V> {
  constructor (public content: V, public output: Array<String> = []) {
  }

  then<V1> (modifier: (a: V) => MonadicOutput<V1>): MonadicOutput<V1> {
    const temp = modifier(this.content)
    return new MonadicOutput(temp.content, this.output.concat(temp.output))
  }

  public static unit<V> (value: V): MonadicOutput<V> {
    return new MonadicOutput(value)
  }

  public static out (output: String): MonadicOutput<any> {
    return new MonadicOutput(null, [output])
  }
}

export {default as Option} from './option'
export {default as Either} from './either'
export {default as Try} from './try'
