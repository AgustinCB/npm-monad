import test from 'ava'

import {default as Monad, MonadicException, MonadicStatus, MonadicOutput} from '../lib/main'

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
          : MonadicException.unit(Math.floor(a/b))
        )
      )
    }
  }

  const consResult = evaluate(new Term(42))
  t.is(consResult.constructor, MonadicException)
  t.is(consResult.value.value, 42)

  const divResult = evaluate(new Term(new Div(new Term(new Div(new Term(1972), new Term(2))), new Term(23))))
  t.is(divResult.constructor, MonadicException)
  t.is(divResult.value.value, 42)

  const errorResult = evaluate(new Term(new Div(new Term(10), new Term(0))))
  t.is(errorResult.constructor, MonadicException)
  t.is(errorResult.value.value, null)
  t.is(errorResult.value.error, 'Division by zero')
})

test('basic evaluation with status', t => {
  const evaluate = (val) => {
    if (val.constructor !== Term) throw new Error('Unexpected argument')

    if (val.value.constructor === Number) {
      return MonadicStatus.tick(0).then(() =>
        MonadicStatus.unit(val.value))
    }

    if (val.value.constructor === Div) {
      return evaluate(val.value.term1).then(a =>
        evaluate(val.value.term2).then(b => {
          console.log(b, a)
          return MonadicStatus.tick(b.status + 1)
            .then(() => MonadicStatus.unit(Math.floor(a.value/b.value)))
        })
      )
    }
  }

  const consResult = evaluate(new Term(42))
  t.is(consResult.constructor, MonadicStatus)
  t.is(consResult.value.value, 42)
  t.deepEqual(consResult.value.status, 0)

  const divResult = evaluate(new Term(new Div(new Term(new Div(new Term(1972), new Term(2))), new Term(23))))
  t.is(divResult.constructor, MonadicStatus)
  t.is(divResult.value.value, 42)
  console.log(divResult)
  t.deepEqual(divResult.value.status, 2)
})

test('basic evaluation with output', t => {
  const evaluate = (val) => {
    if (val.constructor !== Term) throw new Error('Unexpected argument')

    if (val.value.constructor === Number) {
      return MonadicOutput.out(`Cons ${val.value}`).then(() =>
        MonadicOutput.unit(val.value))
    }

    if (val.value.constructor === Div) {
      return evaluate(val.value.term1).then(a =>
        evaluate(val.value.term2).then(b =>
          MonadicOutput.out(`${a.value} / ${b.value} = ${a.value/b.value}`)
            .then(() => MonadicOutput.unit(Math.floor(a.value/b.value)))
        )
      )
    }
  }

  const consResult = evaluate(new Term(42))
  t.is(consResult.constructor, MonadicOutput)
  t.is(consResult.value.value, 42)
  t.deepEqual(consResult.value.output, [ 'Cons 42' ])

  const divResult = evaluate(new Term(new Div(new Term(new Div(new Term(1972), new Term(2))), new Term(23))))
  t.is(divResult.constructor, MonadicOutput)
  t.is(divResult.value.value, 42)
  t.deepEqual(divResult.value.output, [ 
    'Cons 1972',
    'Cons 2',
    '1972 / 2 = 986',
    'Cons 23',
    '986 / 23 = 42.869565217391305'
  ])
})
