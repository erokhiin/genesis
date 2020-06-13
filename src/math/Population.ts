import * as tf from '@tensorflow/tfjs'
import { Body } from './Body'
import { Vector } from './Vector'
import { drawProgress, width, height } from '../graphics/canvas'
import type { State } from './State'
import { random } from '../utils'

const getRandomPos = () =>
  new Vector(random(100, width - 100), random(100, height - 100))

export class Population {
  state: State

  GUYS_COUNT = 500
  EPOCHE_TIME = 5000

  isSelecting = true
  guys: Body[] = []
  epocheStart: number

  constructor(state: State) {
    this.state = state
    this.populate()
    this.epocheStart = this.state.time

    const btn = document.getElementById('toggle')
    if (btn) {
      btn.addEventListener('click', (e) => {
        this.isSelecting = !this.isSelecting
        btn.innerText = this.isSelecting ? 'Disable' : 'Enable'
        this.endGeneration()
        if (this.isSelecting) {
          this.populate()
          this.epocheStart = this.state.time
        }
      })
    }
  }

  brandNewGuy() {
    const guy = new Body({ pos: getRandomPos(), target: this.state.mouse })
    return guy
  }

  populate() {
    while (this.guys.length < this.GUYS_COUNT) {
      this.guys.push(this.brandNewGuy())
    }
  }

  endGeneration() {
    const { guys } = this
    const { mouse } = this.state

    const smartGuys: Body[] = []
    let i = -1
    const maxI = guys.length
    while (++i < maxI) {
      const guy = guys[i]
      const wentPath = guy.pos.copy().sub(mouse).mag()
      const wentCoeff = wentPath / guy.rememberedTargetRange
      if (wentCoeff < 1.2) {
        const child = guy.makeChild(getRandomPos(), mouse)
        smartGuys.push(child)
      }
      guy.brain.dispose()
    }

    this.guys = smartGuys
  }

  update(timeCoeff: number) {
    const { guys, epocheStart } = this
    const { time, mouse } = this.state

    let i = -1
    const maxI = guys.length
    while (++i < maxI) {
      guys[i].goTo(mouse)
      guys[i].update(timeCoeff)
    }

    if (this.isSelecting && time - epocheStart >= this.EPOCHE_TIME) {
      this.perfReport()
      this.endGeneration()
      this.populate()
      this.epocheStart = this.state.time
    }
  }

  draw() {
    const { guys, epocheStart } = this
    const { time } = this.state
    let i = -1
    const maxI = guys.length
    while (++i < maxI) {
      guys[i].draw()
    }
    drawProgress((time - epocheStart) / this.EPOCHE_TIME)
  }

  perfReport() {
    console.group('TF Performance Report')
    console.info('Memo: ', tf.memory().numBytes / 1024)
    console.info('Tensors: ', tf.memory().numTensors)
    console.groupEnd()
  }
}
