import { Vector } from './Vector'
import { Population } from './Population'
import { drawDot, clear, width, height } from '../graphics/canvas'

export class State {
  population: Population
  mouse: Vector
  time: number

  constructor() {
    this.time = Date.now()
    this.mouse = new Vector(width / 2, height / 2)
    this.population = new Population(this)
  }

  update() {
    const nextTime = Date.now()
    const timeDiff = nextTime - this.time
    const timeCoeff = timeDiff * 0.03
    this.time = nextTime
    this.population.update(timeCoeff)
  }

  draw() {
    const { mouse } = this
    clear()
    drawDot(mouse, 200)
    this.population.draw()
  }
}
