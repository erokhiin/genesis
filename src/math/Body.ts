import { Vector } from './Vector'

export class Body {
  acc: Vector
  pos: Vector
  vel: Vector

  constructor(pos: Vector) {
    this.pos = pos
    this.acc = new Vector(0, 0)
    this.vel = new Vector(0, 0)
  }

  applyForce(f: Vector) {
    // Accomulate force to acceleration
    this.acc.add(
      f.copy(),
      // Applied force should be divided by mass of the object
      // .div(this.mass)
    )
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc = new Vector(0, 0)
  }

  edges(x: number, y: number) {
    const pos = this.pos
    const vel = this.vel
    if (pos.x > x) {
      pos.x = x
      vel.x *= -1
    }

    if (pos.x < 0) {
      pos.x = 0
      vel.x *= -1
    }

    if (pos.y > y) {
      pos.y = y
      vel.y *= -1
    }

    if (pos.y < 0) {
      pos.y = 0
      vel.y *= -1
    }
  }
}
