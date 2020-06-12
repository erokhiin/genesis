import { Body } from './Body'
import { Vector } from './Vector'
import { drawDot, clear } from '../canvas'

export class State {
  guy: Body
  mouse: Vector

  constructor() {
    this.guy = new Body(new Vector(50, 50))
    this.mouse = new Vector(100, 100)
  }

  update() {
    const { mouse, guy } = this

    // Calc acceleration
    const guyMouseForce = mouse.copy().sub(guy.pos).limit(0.3)
    guy.applyForce(guyMouseForce)

    // Physics Updates
    guy.update()
  }

  draw() {
    const { mouse, guy } = this
    clear()
    drawDot(guy.pos)
    drawDot(mouse, 200)
  }
}
