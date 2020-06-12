import * as tf from '@tensorflow/tfjs'
import { model } from './model'
import { Vector } from '../math/Vector'

const startPoint = new Vector(50, 50)

const inputs = tf.tensor1d([startPoint.x, startPoint.y])
// const outputs = model.predict(inputs)

// inputs.print()
// console.log(outputs.toString())

export async function train() {
  const { history } = await model.fit([], [], { epochs: 2 })
  console.log(history.loss)
}

// train()
