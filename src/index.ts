import * as tf from '@tensorflow/tfjs'
import { initCanvas } from './canvas'

async function init() {
  const { canvas, ctx } = initCanvas()
  tf.tensor([0, 1, 2, 3]).print()
}

init()
