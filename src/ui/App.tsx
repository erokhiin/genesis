import React, { useRef, useEffect, useCallback } from 'react'
import { css } from 'astroturf'
import Button from './Button'
import RangeField from './RangeField'
import { useSimpleReducer } from '../hooks/useSimpleReducer'

import { State, StateParams } from '../math/State'
import { Vector } from '../math/Vector'
import { initCanvas, width, height } from '../graphics/canvas'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) initCanvas(canvasRef.current)
  }, [canvasRef.current])

  const [params, setParams] = useSimpleReducer<StateParams>({
    isSelecting: true,
    guysCount: 500,
    timeScale: 1,
    epocheTime: 3000,
  })

  const stateRef = useRef<State | null>(null)
  if (!stateRef.current) {
    stateRef.current = new State(params)
    stateRef.current.startSimulation()
  }

  useEffect(() => {
    if (stateRef.current) stateRef.current.updateParams(params)
  }, [params])

  const handleToggleSelecting = useCallback(() => {
    const state = stateRef.current
    if (!state) return
    if (params.isSelecting) {
      state.population.endGeneration()
    } else {
      state.population.startGeneration()
      state.mouse = new Vector(width / 2, height / 2)
    }
    setParams({ isSelecting: !params.isSelecting })
  }, [setParams, params.isSelecting, stateRef.current])

  return (
    <>
      <canvas className={s.canvas} ref={canvasRef} />
      <div className={s.controls}>
        <Button
          children={params.isSelecting ? 'Disable' : 'Enable'}
          onClick={handleToggleSelecting}
          className={s.control}
        />
        <RangeField
          label="Time scale"
          min={1}
          max={10}
          value={params.timeScale}
          onChange={(timeScale) => setParams({ timeScale })}
          className={s.control}
        />
        <RangeField
          label="Epoche time"
          min={1000}
          max={20000}
          value={params.epocheTime}
          onChange={(epocheTime) => setParams({ epocheTime })}
          className={s.control}
        />
        <RangeField
          label="Guys count"
          min={300}
          max={1000}
          value={params.guysCount}
          onChange={(guysCount) => setParams({ guysCount })}
          className={s.control}
        />
      </div>
    </>
  )
}

export default App

const s = css`
  .canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  .controls {
    position: fixed;
    top: 20px;
    left: 20px;
  }
  .control {
    margin-bottom: 10px;
  }
`
