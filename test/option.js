import test from 'ava'

import {default as Option} from '../lib/option'

function getValue(type) {
  switch (type) {
    case 'error!': return Option.none()
    case 'result!': return Option.some(type)
  }
}

test('evaluation with value', t => {
  const option = getValue('result!')
  t.is(option.isDefined(), true)
  t.is(option.nonDefined(), false)
  t.is(option.get(), 'result!')
  t.is(option.getOrElse(':('), 'result!')
  t.is(option.map(a => a+'42').getOrElse(':('), 'result!42')
  t.is(option.filter(a => a === 'result!').getOrElse(':('), 'result!')
  t.is(option.filter(a => a === 'result1!').getOrElse(':('), ':(')
  let total = ''
  option.foreach(a => total += a)
  t.is(total, 'result!')
})

test('evaluation without value', t => {
  const option = getValue('error!')
  t.is(option.isDefined(), false)
  t.is(option.nonDefined(), true)
  t.is(option.get(), null)
  t.is(option.getOrElse(':('), ':(')
  t.is(option.map(a => a+'42').getOrElse(':('), ':(')
  t.is(option.filter(a => a === 'result1!').getOrElse(':('), ':(')
  let total = ''
  option.foreach(a => total += a)
  t.is(total, '')
})
