export interface Numbers {
  start: number
  quantity: number
}
export interface Types {
  letters: boolean
  numbers: false | Numbers
}

export interface Signal {
  name: string
  prefix: string[]
  types: Types
  "additional-suffix"?: string[]
}

export interface BuiltSignal {
  signalName: string
  sort: string
}