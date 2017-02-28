import test from 'ava'

import {default as Monad, MonadicException} from '../lib/main'

class Term {
  constructor(value) {
    this.value = value
  }
}

class Div {
  constructor(term1, term2) {
    this.term1 = term1
    this.term2 = term2
  }
}

test('basic evaluation', t => {
  const evaluate = (val) => {
    if (val.constructor !== Term) throw new Error('Unexpected argument')

    if (val.value.constructor === Number) return Monad.unit(val.value)

    if (val.value.constructor === Div) {
      return evaluate(val.value.term1).then(a =>
        evaluate(val.value.term2).then(b =>
          Monad.unit(a/b)
        )
      )
    }
  }

  const consResult = evaluate(new Term(42))
  t.is(consResult.constructor, Monad)
  t.is(consResult.value, 42)

  const divResult = evaluate(new Term(new Div(new Term(new Div(new Term(1972), new Term(2))), new Term(23))))
  t.is(consResult.constructor, Monad)
  t.is(consResult.value, 42)
})

test('basic evaluation with exception', t => {
  const evaluate = (val) => {
    if (val.constructor !== Term) throw new Error('Unexpected argument')

    if (val.value.constructor === Number) return MonadicException.unit(val.value)

    if (val.value.constructor === Div) {
      return evaluate(val.value.term1).then(a =>
        evaluate(val.value.term2).then(b =>
          (b === 0)
          ? MonadicException.raise('Division by zero')
          : MonadicException.unit(a/b)
        )
      )
    }
  }

  const consResult = evaluate(new Term(42))
  t.is(consResult.constructor, MonadicException)
  t.is(consResult.value.value, 42)

  const divResult = evaluate(new Term(new Div(new Term(new Div(new Term(1972), new Term(2))), new Term(23))))
  t.is(consResult.constructor, MonadicException)
  t.is(consResult.value.value, 42)

  const errorResult = evaluate(new Term(new Div(new Term(10), new Term(0))))
  t.is(errorResult.constructor, MonadicException)
  t.is(errorResult.value.value, null)
  t.is(errorResult.value.error, 'Division by zero')
})
