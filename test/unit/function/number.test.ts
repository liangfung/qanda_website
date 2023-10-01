import { formatNumberUnit } from '@/utils'
import { describe, expect, test } from '@jest/globals'

describe('#formatNumberUnit', () => {
  test('format to unit `0`', () => {
    expect(formatNumberUnit(undefined)).toBe('0')
    expect(formatNumberUnit('')).toBe('0')
    expect(formatNumberUnit('0')).toBe('0')
  })

  test('format to unit `x`', () => {
    expect(formatNumberUnit('1')).toBe('1')
    expect(formatNumberUnit('999')).toBe('999')
    expect(formatNumberUnit(-999)).toBe('-999')
  })

  test('format to unit `xk`', () => {
    expect(formatNumberUnit('1000', 1)).toBe('1.0K')
    expect(formatNumberUnit('1000')).toBe('1K')
    expect(formatNumberUnit('9999')).toBe('10K')
    expect(formatNumberUnit('-8999', 1)).toBe('-9.0K')
  })

  test('format to unit `xm`', () => {
    expect(formatNumberUnit('1000000')).toBe('1M')
    expect(formatNumberUnit('3333333')).toBe('3M')
    expect(formatNumberUnit('3333333', 1)).toBe('3.3M')
    expect(formatNumberUnit('-3333333')).toBe('-3M')
    expect(formatNumberUnit('9999999')).toBe('10M')
  })
})
