const fs = require("fs")
const path = require("path")
import config from "./config/"
import { BuiltSignal, Numbers, Signal, SignalOptions, Types } from "./types"

function mapLua (signals) {
  return signals.map(signal => {
    const lua = []
    lua.push("  {")
    for (const key of Object.keys(signal)) {
      lua.push(`    ${key} = ${typeof signal[key] === "string" ? `"${signal[key]}"` : signal[key]},`)
    }
    lua.push("  },")
    return lua.join("\n")
  })
}

function alphaRange () {
  return "ABCDEFGHIJKLMNOPQRSTUVQXYZ".split("")
}

async function run () {
  const builtSignals: BuiltSignal[] = []
  const signalGroups = []
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
      signalGroups.push(`virtual-signal-${signalPrefix}`)
      if (signalConfig["additional-suffix"]) signalGroups.push(...signalConfig["additional-suffix"].map(suffix => `virtual-signal-${signalPrefix}-${suffix}`))

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
    if (a.sort < b.sort) return -1
    return 0
  })

  await fs.writeFileSync("./signals.json", JSON.stringify(builtSignals))

  // SIGNALS
  const signalsToFormat = []
  signalsToFormat.push(...sorted.map(signal => ({
    type: "virtual-signal",
    name: signal.signalName,
    icon: `__Outpost Signals__/graphics/${signal.signalName}.png`,
    icon_size: 32,
    subgroup: `virtual-signal-${signal.prefix}`,
    order: signal.sort
  })))

  const luaSignals = []
  luaSignals.push("data:extend({")
  luaSignals.push(...mapLua(signalsToFormat))
  luaSignals.push("})")

  const luaSignalsOut = luaSignals.join("\n")
  await fs.writeFileSync("../output/prototypes/outpost_signals.lua", luaSignalsOut)
  // END

  // SIGNAL GROUPS
  const groupSignalsToFormat = []
  groupSignalsToFormat.push({
    type: "item-group",
    name: "outpost-signals",
    order: "t",
    inventory_order: "z",
    icon: "__Outpost Signals__/graphics/signals.png",
    icon_size: "32"
  })

  groupSignalsToFormat.push(...signalGroups.map(signalConfig => ({
    type: "item-subgroup",
    name: `virtual-${signalConfig.signalName}`,
    group: "outpost-signals",
    order: signalConfig.sort
  })))
  // END

  const luaSignalGroups = []
  luaSignalGroups.push("data:extend({")
  luaSignalGroups.push(...mapLua(groupSignalsToFormat))
  luaSignalGroups.push("})")
  const luaSignalGroupsOut = luaSignalGroups.join("\n")

  await fs.writeFileSync("../output/prototypes/item-groups.lua", luaSignalGroupsOut)
}

// tslint:disable-next-line: no-floating-promises
run()
