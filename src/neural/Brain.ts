import * as tf from '@tensorflow/tfjs'
import { Vector } from '../math/Vector'
import { random } from '../utils'

tf.setBackend('cpu')

const MUTATION_RATE = 0.1

export class Brain {
  model: tf.Sequential

  constructor({ model }: { model?: tf.Sequential } = {}) {
    this.model = model || this.createModel()
  }

  createModel() {
    const model = tf.sequential()
    const hidden = tf.layers.dense({
      units: 4,
      inputShape: [2],
      activation: 'sigmoid',
    })
    model.add(hidden)
    const output = tf.layers.dense({
      units: 4,
      activation: 'sigmoid',
    })
    model.add(output)
    // model.compile({
    //   optimizer: tf.train.sgd(0.1),
    //   loss: tf.losses.meanSquaredError,
    // })
    return model
  }

  dispose() {
    this.model.dispose()
  }

  predict(inputs: [[number, number], [number, number]]) {
    // predict(inputs: [number, number]) {
    const data = tf.tidy(() => {
      const inputTensor = tf.tensor2d(inputs)
      const output = this.model.predict(inputTensor) as tf.Tensor
      return output.dataSync()
    })
    const [xVal, xDir, yVal, yDir] = data
    const xDirDoubled = (xDir - 0.5) / Math.abs(xDir - 0.5)
    const yDirDoubled = (yDir - 0.5) / Math.abs(yDir - 0.5)

    const x = xVal * xDirDoubled
    const y = yVal * yDirDoubled
    return new Vector(x, y)
  }

  copy() {
    const modelCopy = this.createModel()
    tf.tidy(() => {
      const weights = this.model.getWeights()
      const weightCopies = []
      let i = -1
      const maxI = weights.length
      while (++i < maxI) {
        weightCopies[i] = weights[i].clone()
      }
      weightCopies
      modelCopy.setWeights(weightCopies)
    })
    return new Brain({ model: modelCopy })
  }

  mutate() {
    tf.tidy(() => {
      const weights = this.model.getWeights()
      const mutatedWeights = []
      let i = -1
      const maxI = weights.length
      while (++i < maxI) {
        const tensor = weights[i]
        const shape = tensor.shape
        const values = tensor.dataSync().slice()
        let j = -1
        const maxJ = weights.length
        while (++j < maxJ) {
          if (random(0, 1) < MUTATION_RATE) {
            let w = values[j]
            values[j] = w + random(0, 0.1)
          }
        }
        const newTensor = tf.tensor(values, shape)
        mutatedWeights[i] = newTensor
      }
      this.model.setWeights(mutatedWeights)
    })
  }
}

// const startPoint = new Vector(50, 50)

// const inputs = tf.tensor2d([[startPoint.x, startPoint.y]])
// const outputs = model.predict(inputs)

// // inputs.print()
// // console.log(outputs.toString())

// export async function train() {
//   const { history } = await model.fit([], [], { epochs: 2 })
//   console.log(history.loss)
// }

// train()
