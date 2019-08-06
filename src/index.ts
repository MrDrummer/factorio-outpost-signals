const fs = require("fs")
import config from "./config/"
import { BuiltSignal, Numbers, Signal, Types } from "./types"

function run () {
  const builtSignals: BuiltSignal[] = []
  function pushSignal (prefix, suffix) {
    const signalName = [
      "signal"
    ]
    signalName.push(prefix)
    if (suffix.toString()) signalName.push(suffix)

    builtSignals.push({
      signalName: signalName.join("-"),
      sort: ""
    })
  }

  function alphaRange () {
    return "ABCDEFGHIJKLMNOPQRSTUVQXYZ".split("")
  }

  for (const signalConfig of config) {
    for (const signalPrefix of signalConfig.prefix) {
      if (signalConfig.types.letters) {
        for (const a of alphaRange()) {
          pushSignal(signalPrefix, a)
        }
      }

      const numbers = signalConfig.types.numbers
      if (numbers) {
        for (let index = numbers.start; index < (numbers.start + numbers.quantity); index++) {
          pushSignal(signalPrefix, index)

          const suffixs = signalConfig["additional-suffix"]
          if (suffixs) {
            for (const suffix of suffixs) {
              pushSignal(signalPrefix, suffix)
            }
          }
        }
      }
    }
  }

  // console.log(builtSignals)
  fs.writeFileSync("./signals.json", JSON.stringify(builtSignals))
}

run()
