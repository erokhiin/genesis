import * as tf from '@tensorflow/tfjs'

export const model = tf.sequential()

const hidden = tf.layers.dense({
  units: 6,
  inputShape: [1],
  activation: 'sigmoid',
})
model.add(hidden)

const output = tf.layers.dense({
  units: 1,
  activation: 'sigmoid',
})
model.add(output)

model.compile({
  optimizer: tf.train.sgd(0.1),
  loss: tf.losses.meanSquaredError,
})
