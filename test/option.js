import test from 'ava'

import {default as Option} from '../lib/option'

function getValue(type) {
  switch (type) {
    case 'error!': return Option.none()
    case 'result!': return Option.unit(type)
  }
}

test('evaluation with value', t => {
  const either = getValue('result!')
  t.is(either.isDefined(), true)
  t.is(either.nonDefined(), false)
  t.is(either.get(), 'result!')
  t.is(either.getOrElse(':('), 'result!')
  t.is(either.map(a => a+'42').getOrElse(':('), 'result!42')
  t.is(either.filter(a => a === 'result!').getOrElse(':('), 'result!')
  t.is(either.filter(a => a === 'result1!').getOrElse(':('), ':(')
  let total = ''
  either.foreach(a => total += a)
  t.is(total, 'result!')
})

test('evaluation without value', t => {
  const either = getValue('error!')
  t.is(either.isDefined(), false)
  t.is(either.nonDefined(), true)
  t.is(either.get(), null)
  t.is(either.getOrElse(':('), ':(')
  t.is(either.map(a => a+'42').getOrElse(':('), ':(')
  t.is(either.filter(a => a === 'result1!').getOrElse(':('), ':(')
  let total = ''
  either.foreach(a => total += a)
  t.is(total, '')
})
