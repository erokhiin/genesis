export const sqr = (x: number) => x * x

// export const minmax = (min: number, value: number, max: number) =>
//   Math.max(min, Math.min(max, value))

// export const normalize = (start: number, end: number, value: number) =>
//   (value - start) / (end - start)

// export const narrow = (start: number, end: number, value: number) =>
//   minmax(0, normalize(start, end, value), 1)

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min
