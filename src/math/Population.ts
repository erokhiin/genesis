import * as tf from '@tensorflow/tfjs'
import { Body } from './Body'
import { Vector } from './Vector'
import { drawProgress, drawZone, width, height } from '../graphics/canvas'
import type { State } from './State'
import { random } from '../utils'

const getRandomPosition = () =>
  new Vector(random(100, width - 100), random(100, height - 100))

const diagonale = new Vector(width, height)
const safeZone = diagonale.mag() * 0.15

export class Population {
  state: State
  guys: Body[] = []
  epocheStart: number

  constructor(state: State) {
    this.state = state
    this.startGeneration()
    // this.populate()
    // this.epocheStart = this.state.time
  }

  get isSelecting() {
    return this.state.params.isSelecting
  }

  get scaledEpocheTime() {
    return this.state.params.epocheTime / this.state.params.timeScale
  }

  brandNewGuy() {
    const guy = new Body({
      position: getRandomPosition(),
      target: this.state.mouse,
    })
    return guy
  }

  populate() {
    const { guysCount } = this.state.params
    while (this.guys.length < guysCount) {
      this.guys.push(this.brandNewGuy())
    }
  }

  startGeneration() {
    this.populate()
    this.epocheStart = this.state.time
  }

  endGeneration() {
    const { guys } = this
    const { mouse } = this.state

    const smartGuys: Body[] = []
    let i = -1
    const maxI = guys.length
    while (++i < maxI) {
      const guy = guys[i]
      const rangeToTarget = guy.position.copy().sub(mouse).mag()
      if (guy.positiveMemory > guy.negativeMemory || rangeToTarget < safeZone) {
        const child = guy.makeChild(getRandomPosition(), mouse)
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
      guys[i].rememberRangeToTarget(mouse)
    }

    if (this.isSelecting && time - epocheStart >= this.scaledEpocheTime) {
      this.perfReport()
      this.endGeneration()
      this.populate()
      this.epocheStart = this.state.time
    }
  }

  draw() {
    const { guys, epocheStart } = this
    const { time, mouse } = this.state
    let i = -1
    const maxI = guys.length
    while (++i < maxI) {
      guys[i].draw()
    }
    drawProgress((time - epocheStart) / this.scaledEpocheTime)
    drawZone(mouse, safeZone)
  }

  perfReport() {
    console.group('TF Performance Report')
    console.info('Memo: ', tf.memory().numBytes / 1024)
    console.info('Tensors: ', tf.memory().numTensors)
    console.groupEnd()
  }
}
