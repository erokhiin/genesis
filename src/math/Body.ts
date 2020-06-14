import { Vector } from './Vector'
import { Brain } from '../neural/Brain'
import { drawDot } from '../graphics/canvas'

export class Body {
  acc: Vector
  pos: Vector
  vel: Vector
  brain: Brain
  generation = 0

  positiveMemory: number = 0
  negativeMemory: number = 0
  rememberedRangeToTarget: number

  constructor({
    pos,
    brain,
    target,
  }: {
    pos: Vector
    brain?: Brain
    target?: Vector
  }) {
    this.pos = pos
    this.acc = new Vector(0, 0)
    this.vel = new Vector(0, 0)
    this.brain = brain || new Brain()
    if (target) this.rememberRangeToTarget(target)
  }

  rememberRangeToTarget(target: Vector) {
    const nextRange = target.copy().sub(this.pos).mag()
    if (this.rememberedRangeToTarget !== undefined) {
      const rangeDiff = nextRange - this.rememberedRangeToTarget
      if (rangeDiff < 0) {
        this.positiveMemory += Math.abs(rangeDiff)
      } else {
        this.negativeMemory += Math.abs(rangeDiff)
      }
    }
    this.rememberedRangeToTarget = nextRange
  }

  makeChild(pos: Vector, target: Vector) {
    const brain = this.brain.copy()
    const child = new Body({ pos, brain, target })
    child.brain.mutate()
    child.generation = this.generation + 1
    return child
  }

  applyForce(f: Vector) {
    // Accomulate force to acceleration
    this.acc.add(
      f.copy(),
      // Applied force should be divided by mass of the object
      // .div(this.mass)
    )
  }

  update(timeCoeff: number) {
    this.vel.add(this.acc.copy().mult(timeCoeff)).limit(3)
    this.pos.add(this.vel.copy().mult(timeCoeff))
    this.acc.setMag(0)
  }

  goTo(target: Vector) {
    const targetRelative = target.copy().sub(this.pos)
    const force = this.brain.predict([targetRelative.toArr(), this.vel.toArr()])
    this.applyForce(force)
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

  draw() {
    drawDot(this.pos, this.generation * 10, this.generation + 1)
  }
}
