import { initCanvas, drawDot, clear } from './canvas'
import { State } from './math/State'
import './neural/learn'

async function init() {
  const { width, height } = initCanvas()
  const state = new State()

  window.addEventListener('mousemove', (e) => {
    state.mouse.x = e.clientX
    state.mouse.y = e.clientY
  })

  function loop() {
    window.requestAnimationFrame(loop)
    state.update()
    state.draw()
  }
  window.requestAnimationFrame(loop)
}

init()
