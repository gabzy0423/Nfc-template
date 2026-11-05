import assert from 'node:assert/strict'
import test from 'node:test'
import { readTheme, saveTheme } from '../src/theme.js'

test('theme preference defaults to light, persists, and tolerates blocked storage', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  let saved = null
  let blocked = false
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem(key) {
        assert.equal(key, 'profile-theme')
        if (blocked) throw new Error('Storage blocked')
        return saved
      },
      setItem(key, value) {
        assert.equal(key, 'profile-theme')
        if (blocked) throw new Error('Storage blocked')
        saved = value
      },
    },
  })
  try {
    assert.equal(readTheme(), 'light')
    saveTheme('dark')
    assert.equal(readTheme(), 'dark')
    saveTheme('light')
    assert.equal(readTheme(), 'light')
    saved = 'invalid'
    assert.equal(readTheme(), 'light')
    blocked = true
    assert.equal(readTheme(), 'light')
    assert.doesNotThrow(() => saveTheme('dark'))
  } finally {
    if (original) Object.defineProperty(globalThis, 'localStorage', original)
    else delete globalThis.localStorage
  }
})
