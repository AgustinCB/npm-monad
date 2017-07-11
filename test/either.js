import test from 'ava'

import {default as Either, Left, Right} from '../lib/either'

function getValue(type) {
  switch (type) {
    case 'error!': return Left.unit(type)
    case 'result!': return Right.unit(type)
  }
}

test('evaluation with right', t => {
  const either = getValue('result!')
  t.is(either.isRight, true)
  t.is(either.isLeft, false)
  t.is(either.get(), 'result!')
  t.is(either.getOrElse(':('), 'result!')
  t.is(either.map(a => a+'42').getOrElse(':('), 'result!42')
  t.is(either.filterOrElse(a => a === 'result!', ':(').getOrElse(':(('), 'result!')
  t.is(either.filterOrElse(a => a === 'result1!', ':(').getLeft(), ':(')
  let total = ''
  either.foreach(a => total += a)
  t.is(total, 'result!')
})

test('evaluation with left', t => {
  const either = getValue('error!')
  t.is(either.isRight, false)
  t.is(either.isLeft, true)
  t.is(either.get(), null)
  t.is(either.getLeft(), 'error!')
  t.is(either.getOrElse(':)'), ':)')
  t.is(either.map(a => a+'42').getOrElse(':)'), ':)')
  t.is(either.filterOrElse(a => a === 'result!', ':)').getLeft(), ':)')
  t.is(either.filterOrElse(a => a === 'result1!', ':)').getLeft(), ':)')
  let total = ''
  either.foreach(a => total += a)
  t.is(total, '')
})
