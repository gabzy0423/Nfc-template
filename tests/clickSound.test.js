import assert from 'node:assert/strict'
import test from 'node:test'
import { playClickSound } from '../src/clickSound.js'

test('click audio is optional, reuses its context, and tolerates playback restrictions', async () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'AudioContext')
  let instances = 0
  let buffers = 0
  let starts = 0
  let disconnects = 0
  let audio
  const sources = []
  class FakeAudioContext {
    constructor() {
      instances++
      audio = this
      this.state = 'suspended'
      this.sampleRate = 48000
      this.currentTime = 0
      this.destination = {}
    }
    async resume() { this.state = 'running' }
    createBuffer(channels, length) {
      assert.equal(channels, 1)
      buffers++
      return { getChannelData: () => new Float32Array(length) }
    }
    createBufferSource() {
      const source = {
        connect() {},
        disconnect() { disconnects++ },
        start() { starts++ },
      }
      sources.push(source)
      return source
    }
    createGain() {
      return {
        gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
        connect() {},
        disconnect() { disconnects++ },
      }
    }
  }
  Object.defineProperty(globalThis, 'AudioContext', { configurable: true, writable: true, value: undefined })
  try {
    await assert.doesNotReject(playClickSound)
    globalThis.AudioContext = class { constructor() { throw new Error('Audio blocked') } }
    await assert.doesNotReject(playClickSound)
    globalThis.AudioContext = FakeAudioContext
    await playClickSound()
    await playClickSound()
    assert.equal(instances, 1)
    assert.equal(buffers, 1)
    assert.equal(starts, 2)
    assert.equal(sources[0].buffer, sources[1].buffer)
    sources[0].onended()
    assert.equal(disconnects, 2)
    audio.state = 'suspended'
    audio.resume = async () => { throw new Error('Playback blocked') }
    await assert.doesNotReject(playClickSound)
    assert.equal(starts, 2)
  } finally {
    if (original) Object.defineProperty(globalThis, 'AudioContext', original)
    else delete globalThis.AudioContext
  }
})
