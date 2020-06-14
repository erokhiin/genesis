import { Vector } from './Vector'
import { Brain } from '../neural/Brain'
import { drawDot } from '../graphics/canvas'

export class Body {
  acceleration: Vector
  position: Vector
  velocity: Vector
  brain: Brain
  generation = 0

  positiveMemory: number = 0
  negativeMemory: number = 0
  rememberedRangeToTarget: number

  constructor({
    position,
    brain,
    target,
  }: {
    position: Vector
    brain?: Brain
    target?: Vector
  }) {
    this.position = position
    this.acceleration = new Vector(0, 0)
    this.velocity = new Vector(0, 0)
    this.brain = brain || new Brain()
    if (target) this.rememberRangeToTarget(target)
  }

  rememberRangeToTarget(target: Vector) {
    const nextRange = target.copy().sub(this.position).mag()
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

  makeChild(position: Vector, target: Vector) {
    const brain = this.brain.copy()
    const child = new Body({ position, brain, target })
    child.brain.mutate()
    child.generation = this.generation + 1
    return child
  }

  applyForce(f: Vector) {
    // Accomulate force to acceleration
    this.acceleration.add(
      f.copy(),
      // Applied force should be divided by mass of the object
      // .div(this.mass)
    )
  }

  update(timeCoeff: number) {
    this.velocity.add(this.acceleration.copy().mult(timeCoeff)).limit(3)
    this.position.add(this.velocity.copy().mult(timeCoeff))
    this.acceleration.setMag(0)
  }

  goTo(target: Vector) {
    const targetRelative = target.copy().sub(this.position)
    const force = this.brain.predict([
      targetRelative.toArr(),
      this.velocity.toArr(),
    ])
    this.applyForce(force)
  }

  edges(x: number, y: number) {
    const position = this.position
    const velocity = this.velocity
    if (position.x > x) {
      position.x = x
      velocity.x *= -1
    }

    if (position.x < 0) {
      position.x = 0
      velocity.x *= -1
    }

    if (position.y > y) {
      position.y = y
      velocity.y *= -1
    }

    if (position.y < 0) {
      position.y = 0
      velocity.y *= -1
    }
  }

  draw() {
    drawDot(this.position, this.generation * 10, this.generation + 1)
  }
}
