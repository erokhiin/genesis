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

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
  }
}
