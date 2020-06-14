import { Vector } from './Vector'
import { Population } from './Population'
import { drawDot, clear, width, height } from '../graphics/canvas'

export class State {
  population: Population
  mouse: Vector
  time: number
  timeScale: number = 1

  constructor() {
    this.time = Date.now()
    this.mouse = new Vector(width / 2, height / 2)
    this.population = new Population(this)

    const timeScaleInput = document.getElementById(
      'time-scale',
    ) as HTMLInputElement
    const timeScaleText = document.getElementsByClassName(
      'time-scale-text',
    )[0] as HTMLDivElement
    timeScaleInput.addEventListener('change', (e) => {
      this.timeScale = Number(timeScaleInput.value)
      timeScaleText.innerText = String(this.timeScale)
    })
  }

  update() {
    const nextTime = Date.now()
    const timeDiff = nextTime - this.time
    const timeCoeff = timeDiff * 0.05 * this.timeScale
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
