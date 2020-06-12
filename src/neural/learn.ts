import * as tf from '@tensorflow/tfjs'
import { model } from './model'
import { Vector } from '../math/Vector'

const startPoint = new Vector(50, 50)
const inputs = tf.tensor1d([startPoint.x, startPoint.y])
const outputs = model.predict(inputs)
// outputs.print()
