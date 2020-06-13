import { Vector } from '../math/Vector'

let ctx: CanvasRenderingContext2D
let canvas: HTMLCanvasElement

const dpi = window.devicePixelRatio || 1
export const width = window.innerWidth
export const height = window.innerHeight

export function initCanvas() {
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  canvas.width = width * dpi
  canvas.height = height * dpi
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  return { width, height, canvas, ctx }
}

export function clear() {
  ctx.clearRect(0, 0, width * dpi, height * dpi)
}

export function drawDot(p: Vector, hue: number = 100, size: number = 6) {
  ctx.fillStyle = `hsl(${(hue % 360) + 1}, 70%, 60%)`
  ctx.beginPath()
  ctx.arc(p.x * dpi, p.y * dpi, size, 0, Math.PI * 2, true)
  ctx.fill()
}

export function drawProgress(prog: number) {
  ctx.fillStyle = `#99f`
  ctx.beginPath()
  ctx.rect(0, 0, width * dpi * prog, 3 * dpi)
  ctx.fill()
}

export function drawZone(r: number) {
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'
  ctx.beginPath()
  ctx.arc((width * dpi) / 2, (height * dpi) / 2, r, 0, Math.PI * 2, true)
  ctx.stroke()
}
