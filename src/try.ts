import {Monad} from './main'

interface ContentProvider<V> {
  func: () => V
}

export default class Try<V> implements Monad<V> {
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
  constructor (public content: V, public error: String = null) {
  }
  
  isFailure(): boolean {
    return !this.isSuccess()
  }

  isSuccess(): boolean {
    return this.error === undefined || this.error === null
  }

  then<V1> (modifier: (a: V) => Try<V1>): Try<V1> {
    if (this.isFailure()) {
      console.log("FAILURE", this.content, this.error)
      return new Try(null, this.error)
    }
    return modifier(this.content)
  }

  map<V1> (modifier: (a: V) => V1): Try<V1> {
    return this.then(a => Try.unit(modifier(a)))
  }

  filterOrRaise (check: (a: V) => boolean, error: String): Try<V> {
    if (this.isFailure() || !check(this.content)) {
      return Try.raise(this.error || error)
    }
    return Try.unit(this.content)
  }

  get(): V {
    return this.content
  }

  getOrElse(defaultValue: V): V {
    return this.content || defaultValue
  }

  recover (recoverException: (e: String) => V): Try<V> {
    if (this.isFailure()) {
      return Try.unit(recoverException(this.error))
    }
    return Try.unit(this.content)
  }

  handle (handleException: (e: String) => void) {
    if (this.isFailure()) {
      handleException(this.error)
    }
  }

  public static unit<V> (value: V): Try<V> {
    return new Try(value)
  }

  public static raise (exception: String): Try<any> {
    return new Try(null, exception)
  }
}
