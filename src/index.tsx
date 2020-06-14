import React from 'react'
import ReactDOM from 'react-dom'
import App from './ui/App'

import * as tf from '@tensorflow/tfjs'
;(window as any).tf = tf

ReactDOM.render(<App />, document.getElementById('root'))
