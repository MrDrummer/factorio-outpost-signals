const fs = require("fs")
import config from "./config/"
import { BuiltSignal, Numbers, Signal, SignalOptions, Types } from "./types"

function run () {
  const builtSignals: BuiltSignal[] = []
  function pushSignal (prefix: string, suffix: string, options: SignalOptions) {
    const signalName = [
      "signal"
    ]
    signalName.push(prefix)
    if (suffix) signalName.push(suffix)
    const builtSignal: BuiltSignal = {
      signalName: signalName.join("-"),
      sort: options.sort,
      prefix: options.prefix
    }
    builtSignals.push(builtSignal)
  }

  function alphaRange () {
    return "ABCDEFGHIJKLMNOPQRSTUVQXYZ".split("")
  }

  let signalGroupCount = 0
  for (const signalConfig of config) {
    let prefixCount = 0
    for (const signalPrefix of signalConfig.prefix) {
      if (signalConfig.types.letters) {
        for (const a of alphaRange()) {
          pushSignal(signalPrefix, a, {
            sort: `${signalGroupCount.toString(36)}-${prefixCount.toString(36)}-${a}`,
            prefix: signalPrefix
          })
        }
      }

      const numbers = signalConfig.types.numbers
      if (numbers) {
        for (let index = numbers.start; index < (numbers.start + numbers.quantity); index++) {
          pushSignal(signalPrefix, index.toString(), {
            sort: `${signalGroupCount.toString(36)}-${prefixCount.toString(36)}-${alphaRange()[index]}`,
            prefix: signalPrefix
          })

          const suffixs = signalConfig["additional-suffix"]
          if (suffixs) {
            for (const suffix of suffixs) {
              pushSignal(signalPrefix, `${index}-${suffix}`, {
                sort: `${signalGroupCount.toString(36)}-${prefixCount.toString(36)}-${suffix}-${alphaRange()[index]}`,
                prefix: signalPrefix
              })
            }
          }
        }
      }
      prefixCount++
    }
    signalGroupCount++
  }

  const sorted = builtSignals.sort((a, b) => {
    if (a.sort > b.sort) return 1
    if (a.sort < b.sort) return 1
    return 0
  })

  // console.log(builtSignals)
  fs.writeFileSync("./signals.json", JSON.stringify(builtSignals))
}

run()
