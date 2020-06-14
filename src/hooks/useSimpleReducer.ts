import { useReducer } from 'react'

export function useSimpleReducer<State>(initialState: State) {
  return useReducer(
    (prev: State, next: Partial<State>) => ({ ...prev, ...next }),
    initialState,
  )
}
