const fs = require("fs")
const path = require("path")
import config from "./config/"
import { BuiltSignal, Numbers, Signal, SignalOptions, Types } from "./types"

const builtSignals: BuiltSignal[] = []

function getChar (index) {
  if (typeof index !== "number") throw Error("Variable passed must be a number!")
  if (index < 0) throw Error("Index smaller than 0!")
  if (index > 36) throw Error("Index greater than 36!")

  return index.toString(36)
}

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

const alphaRange = "ABCDEFGHIJKLMNOPQRSTUVQXYZ".split("")

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

async function run () {
  const signalGroups = []

  // Config section
  let signalGroupIndex = 0
  for (const signalConfig of config) {

    // Main Signal Prefix
    let signalPrefixIndex = 0
    for (const signalPrefix of signalConfig.prefix) {

      // Alpha Variants
      let signalSuffixIndex = 0
      if (signalConfig.types.letters) {
        for (const alpha of alphaRange) {

          pushSignal(signalPrefix, alpha, {
            sort: `${[signalGroupIndex, signalPrefixIndex, signalSuffixIndex].map(getChar).join("-")}-${alpha}`,
            prefix: signalPrefix
          })
          signalSuffixIndex++
        }
      }

      const numbers = signalConfig.types.numbers
      signalGroups.push({
        name: `virtual-signal-${signalPrefix}`,
        order: `${[signalGroupIndex, signalPrefixIndex].map(getChar).join("-")}`
      })

      if (signalConfig["additional-suffix"]) {
        signalGroups.push(...signalConfig["additional-suffix"].map(suffix => ({
          name: `virtual-signal-${signalPrefix}-${suffix}`,
          order: `${[signalGroupIndex, signalPrefixIndex].map(getChar).join("-")}`
        })))
      }

      // Numeric Range
      if (numbers) {

        for (let index = numbers.start; index < (numbers.start + numbers.quantity); index++) {
          pushSignal(signalPrefix, index.toString(), {
            sort: `${[signalGroupIndex, signalSuffixIndex].map(getChar).join("-")}-${alphaRange[index]}`,
            prefix: signalPrefix
          })

          const suffixs = signalConfig["additional-suffix"]
          if (suffixs) {
            let additionalSuffixIndex = 0
            for (const suffix of suffixs) {
              pushSignal(signalPrefix, `${index}-${suffix}`, {
                sort: `${[signalGroupIndex, signalPrefixIndex].map(getChar).join("-")}-${suffix}-${alphaRange[index]}-${additionalSuffixIndex}`,
                prefix: signalPrefix
              })
              additionalSuffixIndex++
            }
          }
          signalSuffixIndex++
        }
      }
      signalPrefixIndex++
    }
    signalGroupIndex++
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
