let context
let clickBuffer

export async function playClickSound() {
  try {
    const AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext
    if (!AudioContext) return
    context ??= new AudioContext()
    if (context.state === 'suspended') await context.resume()
    if (context.state !== 'running') return

    if (!clickBuffer) {
      clickBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.04), context.sampleRate)
      const samples = clickBuffer.getChannelData(0)
      for (let i = 0; i < samples.length; i++) {
        const body = Math.sin(2 * Math.PI * 180 * i / context.sampleRate)
        samples[i] = (Math.random() * 2 - 1) * 0.6 + body * 0.4
      }
    }

    const source = context.createBufferSource()
    const gain = context.createGain()
    source.buffer = clickBuffer
    gain.gain.setValueAtTime(0.08, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.04)
    source.connect(gain)
    gain.connect(context.destination)
    source.onended = () => {
      source.disconnect()
      gain.disconnect()
    }
    source.start()
  } catch {
    // Audio restrictions must not interrupt the clicked control's action.
  }
}
