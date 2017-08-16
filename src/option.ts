import {Monad, Functor} from './main'

export default class Option<V> implements Monad<V>, Functor<V> {
  content: V

  constructor (content?: V) {
    this.content = content
  }

  get(): V {
    return this.content
  }

  getOrElse(defaultValue: V): V {
    return this.isDefined() ? this.content : defaultValue
  }

  isDefined(): boolean {
    return this.content !== null && this.content !== undefined
  }

  nonDefined(): boolean {
    return !this.isDefined()
  }

  then<V1> (modifier: (a: V) => Option<V1>): Option<V1> {
    if (this.nonDefined()) {
      return Option.none()
    }
    return modifier(this.content)
  }

  map<V1> (modifier: (a: V) => V1): Option<V1> {
    return this.then(a => Option.unit(modifier(a)))
  }

  filter (check: (a: V) => boolean): Option<V> {
    if (this.nonDefined() || !check(this.content)) {
      return Option.none()
    }
    return new Option(this.content)
  }

  foreach (action: (a: V) => void): Option<V> {
    if (this.isDefined()) {
      action(this.content)
    }
    return this
  }

  orElseDo (action: () => void): Option<V> {
    if (this.nonDefined()) {
      action()
    }
    return this
  }

  public static unit<V> (value?: V): Option<V> {
    return new Option(value)
  }

  public static none(): Option<any> {
    return new Option(null)
  }
}
