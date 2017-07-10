import {Monad} from './main'

export class MonadicOption<V> implements Monad<V> {
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

  then<V1> (modifier: (a: V) => MonadicOption<V1>): MonadicOption<V1> {
    if (this.nonDefined()) {
      return new MonadicOption(null)
    }
    return modifier(this.content)
  }

  map<V1> (modifier: (a: V) => V1): MonadicOption<V1> {
    return this.then(a => MonadicOption.unit(modifier(a)))
  }

  filter (check: (a: V) => boolean): MonadicOption<V> {
    if (this.nonDefined() || !check(this.content)) {
      return new MonadicOption(null)
    }
    return new MonadicOption(this.content)
  }

  forEach (action: (a: V) => void): MonadicOption<V> {
    if (this.isDefined()) {
      action(this.content)
    }
    return this
  }

  public static unit<V> (value?: V): MonadicOption<V> {
    return new MonadicOption(value)
  }
}
