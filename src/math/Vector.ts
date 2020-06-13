import { sqr } from '../utils'

export class Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(b: Vector) {
    this.x += b.x
    this.y += b.y
    return this
  }

  sub(b: Vector) {
    this.x -= b.x
    this.y -= b.y
    return this
  }

  mult(val: number) {
    this.x *= val
    this.y *= val
    return this
  }

  div(val: number) {
    this.x /= val
    this.y /= val
    return this
  }

  copy() {
    return new Vector(this.x, this.y)
  }

  mag() {
    return Math.sqrt(sqr(this.x) + sqr(this.y))
  }

  norm() {
    if (this.mag() !== 0) this.div(this.mag())
    return this
  }

  setMag(mag: number) {
    this.norm()
    this.mult(mag)
    return this
  }

  limit(val: number) {
    if (this.mag() > val) this.setMag(val)
    return this
  }

  toArr(): [number, number] {
    return [this.x, this.y]
  }
}
