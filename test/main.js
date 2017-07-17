import test from 'ava'

import {default as BasicMonad, MonadicStatus, MonadicOutput} from '../lib/main'
import Try from '../lib/try'

class Term {
  constructor(value) {
    this.content = value
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

    if (val.content.constructor === Number) return BasicMonad.unit(val.content)

    if (val.content.constructor === Div) {
      return evaluate(val.content.term1).then(a =>
        evaluate(val.content.term2).then(b =>
          BasicMonad.unit(a/b)
        )
      )
    }
  }

  const consResult = evaluate(new Term(42))
  t.is(consResult.constructor, BasicMonad)
  t.is(consResult.content, 42)

  const divResult = evaluate(new Term(new Div(new Term(new Div(new Term(1972), new Term(2))), new Term(23))))
  t.is(consResult.constructor, BasicMonad)
  t.is(consResult.content, 42)
})

test('basic evaluation with exception', t => {
  const evaluate = (val) => {
    if (val.constructor !== Term) throw new Error('Unexpected argument')

    if (val.content.constructor === Number) return Try.unit(val.content)

    if (val.content.constructor === Div) {
      return evaluate(val.content.term1).then(a =>
        evaluate(val.content.term2).then(b =>
          (b === 0)
          ? Try.raise('Division by zero')
          : Try.unit(Math.floor(a/b))
        )
      )
    }
  }

  const consResult = evaluate(new Term(42))
  t.is(consResult.constructor, Try)
  t.is(consResult.getOrElse(':('), 42)

  const divResult = evaluate(new Term(new Div(new Term(new Div(new Term(1972), new Term(2))), new Term(23))))
  t.is(divResult.constructor, Try)
  t.is(divResult.getOrElse(':('), 42)

  const errorResult = evaluate(new Term(new Div(new Term(10), new Term(0))))
  t.is(errorResult.constructor, Try)
  t.is(errorResult.getOrElse(':('), ':(')
  t.is(errorResult.error, 'Division by zero')
})

test('basic evaluation with status', t => {
  const evaluate = (val) => {
    if (val.constructor !== Term) throw new Error('Unexpected argument')

    if (val.content.constructor === Number) {
      return MonadicStatus.unit(val.content, 0)
    }

    if (val.content.constructor === Div) {
      return evaluate(val.content.term1).then((a, s1) =>
        evaluate(val.content.term2).then((b, s2) => {
          return MonadicStatus.unit(Math.floor(a/b), s1 + s2 + 1)
        })
      )
    }
  }

  const consResult = evaluate(new Term(42))
  t.is(consResult.constructor, MonadicStatus)
  t.is(consResult.content, 42)
  t.deepEqual(consResult.status, 0)

  const divResult = evaluate(new Term(new Div(new Term(new Div(new Term(1972), new Term(2))), new Term(23))))
  t.is(divResult.constructor, MonadicStatus)
  t.is(divResult.content, 42)
  t.deepEqual(divResult.status, 2)
})

test('basic evaluation with output', t => {
  const evaluate = (val) => {
    if (val.constructor !== Term) throw new Error('Unexpected argument')

    if (val.content.constructor === Number) {
      return MonadicOutput.out(`Cons ${val.content}`).then(() =>
        MonadicOutput.unit(val.content))
    }

    if (val.content.constructor === Div) {
      return evaluate(val.content.term1).then(a =>
        evaluate(val.content.term2).then(b =>
          MonadicOutput.out(`${a} / ${b} = ${Math.floor(a/b)}`)
            .then(() => MonadicOutput.unit(Math.floor(a/b)))
        )
      )
    }
  }

  const consResult = evaluate(new Term(42))
  t.is(consResult.constructor, MonadicOutput)
  t.is(consResult.content, 42)
  t.deepEqual(consResult.output, [ 'Cons 42' ])

  const divResult = evaluate(new Term(new Div(new Term(new Div(new Term(1972), new Term(2))), new Term(23))))
  t.is(divResult.constructor, MonadicOutput)
  t.is(divResult.content, 42)
  t.deepEqual(divResult.output, [ 
    'Cons 1972',
    'Cons 2',
    '1972 / 2 = 986',
    'Cons 23',
    '986 / 23 = 42'
  ])
})
