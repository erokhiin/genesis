export function initCanvas() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement

  const dpi = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpi
  canvas.height = window.innerHeight * dpi
  const ctx = canvas.getContext('2d')

  return { canvas, ctx }
}
