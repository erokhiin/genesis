import * as tf from '@tensorflow/tfjs'
import { initCanvas, drawDot, clear } from './canvas'
import { Body } from './math/Body'
import { Vector } from './math/Vector'
import './neural/learn'

const state = {
  guy: new Body(new Vector(50, 50)),
  mouse: new Vector(100, 100),
}

const gravityConst = new Vector(0, 0.98)

async function init() {
  const { width, height } = initCanvas()
  tf.tensor([0, 1, 2, 3]).print()

  window.addEventListener('mousemove', (e) => {
    state.mouse.x = e.clientX
    state.mouse.y = e.clientY
  })

  function loop() {
    window.requestAnimationFrame(loop)

    const { mouse, guy } = state

    // Calc acceleration
    const guyMouseForce = mouse.copy().sub(guy.pos).limit(0.3)
    guy.applyForce(guyMouseForce)
    guy.applyForce(gravityConst)
    // guy.edges(width, height)

    // Physics Updates
    guy.update()

    // Render
    clear()
    drawDot(state.guy.pos)
    drawDot(state.mouse, 200)
  }
  window.requestAnimationFrame(loop)
}

init()
