import {Monad} from './main'

interface ContentProvider<V> {
  func: () => V
}

export class MonadicException<V> implements Monad<V> {
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
    return this.error === undefined || this.error === null
  }

  isSuccess(): boolean {
    return !this.isFailure()
  }

  then<V1> (modifier: (a: V) => MonadicException<V1>): MonadicException<V1> {
    if (this.isFailure()) {
      return new MonadicException(null, this.error)
    }
    return modifier(this.content)
  }

  map<V1> (modifier: (a: V) => V1): MonadicException<V1> {
    return this.then(a => MonadicException.unit(modifier(a)))
  }

  filterOrRaise (check: (a: V) => boolean, error: String): MonadicException<V> {
    if (this.isFailure() || !check(this.content)) {
      return MonadicException.raise(this.error || error)
    }
    return MonadicException.unit(this.content)
  }

  get(): V {
    return this.content
  }

  getOrElse(defaultValue: V): V {
    return this.content || defaultValue
  }

  recover (recoverException: (e: String) => V): MonadicException<V> {
    if (this.isFailure()) {
      return MonadicException.unit(recoverException(this.error))
    }
    return MonadicException.unit(this.content)
  }

  handle (handleException: (e: String) => void) {
    if (this.isFailure()) {
      handleException(this.error)
    }
  }

  public static unit<V> (value: V): MonadicException<V> {
    return new MonadicException(value)
  }

  public static raise (exception: String): MonadicException<any> {
    return new MonadicException(null, exception)
  }
}
