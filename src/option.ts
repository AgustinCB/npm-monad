import {Monad} from './main'

export default class Option<V> implements Monad<V> {
  content: V

  constructor (content?: V) {
    this.content = content
  }

  get(): V {
    return this.content
  }

  getOrElse(defaultValue: V): V {
    return this.content || defaultValue
  }

  isDefined(): boolean {
    return !!this.content
  }

  nonDefined(): boolean {
    return !this.nonDefined()
  }

  then<V1> (modifier: (a: V) => Option<V1>): Option<V1> {
    if (this.nonDefined()) {
      return new Option(null)
    }
    return modifier(this.content)
  }

  map<V1> (modifier: (a: V) => V1): Option<V1> {
    return this.then(a => Option.unit(modifier(a)))
  }

  filter (check: (a: V) => boolean): Option<V> {
    if (this.nonDefined() || !check(this.content)) {
      return new Option(null)
    }
    return new Option(this.content)
  }

  forEach (action: (a: V) => void): Option<V> {
    if (this.isDefined()) {
      action(this.content)
    }
    return this
  }

  public static unit<V> (value?: V): Option<V> {
    return new Option(value)
  }
}
