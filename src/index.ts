import * as tf from '@tensorflow/tfjs'
import { initCanvas } from './graphics/canvas'
import { State } from './math/State'
import './neural/brain'
;(window as any).tf = tf

async function init() {
  initCanvas()
  const state = new State()
  window.addEventListener('mousemove', (e) => {
    if (state.population.isSelecting) return
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
