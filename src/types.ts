export interface Numbers {
  start: number
  quantity: number
}
export interface Types {
  letters: boolean
  numbers: false | Numbers
}

export interface Signal {
  group: string
  prefix: string[]
  types: Types
  "additional-suffix"?: string[]
}

export interface SignalOptions {
  sort: string
  prefix: string
}

export interface BuiltSignal extends SignalOptions {
  signalName: string
}

export interface ImageMeta {
  name: string
  prefix: string
  suffix: string | number
  additionalSuffix: string | false
}
