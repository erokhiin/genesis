import { Vector } from './Vector'
import { Population } from './Population'
import { drawDot, clear, width, height } from '../graphics/canvas'

export type StateParams = {
  isSelecting: boolean
  guysCount: number
  timeScale: number
  epocheTime: number
}

export class State {
  population: Population
  mouse: Vector
  nextMouse?: Vector
  time: number
  params: StateParams

  constructor(params: StateParams) {
    this.params = params
    this.time = Date.now()
    this.mouse = new Vector(width / 2, height / 2)
    this.population = new Population(this)
    window.addEventListener('mousemove', (e) => {
      if (this.population.isSelecting) return
      this.nextMouse = new Vector(e.clientX, e.clientY)
    })
  }

  updateParams(params: StateParams) {
    this.params = params
  }

  update() {
    const nextTime = Date.now()
    const timeDiff = nextTime - this.time
    const timeCoeff = timeDiff * 0.05 * this.params.timeScale
    this.time = nextTime
    this.population.update(timeCoeff)
    if (this.nextMouse) {
      this.mouse = this.nextMouse
      this.nextMouse = undefined
    }
  }

  draw() {
    const { mouse } = this
    clear()
    drawDot(mouse, 200)
    this.population.draw()
  }

  startSimulation() {
    const loop = () => {
      window.requestAnimationFrame(loop)
      this.update()
      this.draw()
    }
    window.requestAnimationFrame(loop)
  }
}
