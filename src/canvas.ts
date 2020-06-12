import { Vector } from './math/Vector'

let ctx: CanvasRenderingContext2D
let canvas: HTMLCanvasElement

const dpi = window.devicePixelRatio || 1
const width = window.innerWidth * dpi
const height = window.innerHeight * dpi

export function initCanvas() {
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  canvas.width = width
  canvas.height = height
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  return { canvas, ctx }
}

export function clear() {
  ctx.clearRect(0, 0, width, height)
}

export function drawDot(p: Vector, hue: number = 100) {
  ctx.fillStyle = `hsl(${(hue % 310) + 1}, 70%, 60%)`
  ctx.beginPath()
  ctx.arc(p.x * dpi, p.y * dpi, 20, 0, Math.PI * 2, true)
  ctx.fill()
}
