import fs from "fs"
import jimp from "jimp"
import { signalIconConfig, signals as config } from "./config/"
import { BuiltSignal, ImageMeta, SignalOptions } from "./types"

const builtSignals: BuiltSignal[] = []
const signalsImageMeta: ImageMeta[] = []
const localeNames = {}
const localeGroupNames = {}
const groupNameIcon = {}

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

function log (...args) {
  // console.log(...args)
}

function getChar (index) {
  if (typeof index !== "number") throw Error("Variable passed must be a number!")
  if (index < 0) throw Error("Index smaller than 0!")
  if (index > 36) throw Error("Index greater than 36!")

  return index.toString(36)
}

function objLua (signal, cfg = false) {
  const lua = []
  if (!cfg) lua.push("  {")
  for (const key of Object.keys(signal)) {
    lua.push((!cfg ? "    " : "") + `${ key }=${ typeof signal[key] === "string" && !cfg ? `"${ signal[key] }"` : signal[key] }${ !cfg ? "," : "" }`)
  }
  if (!cfg) lua.push("  },")
  return lua.join("\n")
}

function mapLua (signals) {
  return signals.map(sig => objLua(sig, false))
}

const alphaRange = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

function pushSignal (prefix: string, suffix: string, options: SignalOptions) {
  log(options.sort)
  const signalNameAssemble = []
  signalNameAssemble.push(prefix)
  if (suffix) signalNameAssemble.push(suffix)
  const signalName = "signal_" + signalNameAssemble.join("-")
  const name = prefix.split("_")
  name.push("Signal")
  name.push(...suffix.split("-"))
  localeNames[signalName] = name.map(capitalizeFirstLetter).join(" ")
  const builtSignal: BuiltSignal = {
    signalName,
    sort: options.sort,
    prefix: options.prefix
  }
  builtSignals.push(builtSignal)
  return builtSignal
}

async function run () {
  const signalGroups = []

  // Config section
  let signalGroupIndex = 0
  for (const signalConfig of config) {
    log("=========================================")
    log("signalConfig:", signalConfig)

    // Main Signal Prefix
    let signalPrefixIndex = 0
    for (const signalPrefix of signalConfig.prefix) {
      log("signalPrefix:", signalPrefix)

      // Alpha Variants
      let signalSuffixIndex = 0
      if (signalConfig.types.letters) {
        for (const alpha of alphaRange) {
          log("alpha:", alpha)

          const signalNameFull = pushSignal(signalPrefix, alpha, {
            sort: `${ [signalSuffixIndex].map(getChar).join("-") }`,
            prefix: signalPrefix
          })
          signalsImageMeta.push({
            name: signalNameFull.signalName,
            prefix: signalPrefix,
            suffix: alpha,
            icon: signalConfig.icon,
            additionalSuffix: false
          })

          signalSuffixIndex++
        }
      }

      const localeGroupName = `outpost-signals-${ signalConfig.group }`
      localeGroupNames[localeGroupName] = `Outpost Signals ${ capitalizeFirstLetter(signalConfig.group) }`
      groupNameIcon[localeGroupName] = signalConfig.group
      const numbers = signalConfig.types.numbers
      signalGroups.push({
        name: `virtual-signal-${ signalPrefix }`,
        order: `${ [signalGroupIndex, signalPrefixIndex].map(getChar).join("-") }`,
        group: localeGroupName
      })

      if (signalConfig["additional-suffix"]) {
        signalGroups.push(...signalConfig["additional-suffix"].map((suffix, index) => {
          return {
            name: `virtual-signal-${ signalPrefix }-${ suffix }`,
            order: `${ [signalGroupIndex, signalPrefixIndex, index].map(getChar).join("-") }`,
            group: localeGroupName
          }
        }))
      }

      // Numeric Range
      if (numbers) {

        for (let index = numbers.start; index < (numbers.start + numbers.quantity); index++) {
          log("number index:", index)

          const signalNameFull = pushSignal(signalPrefix, `${ index }`, {
            sort: `${ [signalSuffixIndex].map(getChar).join("-") }-${ alphaRange[index] }`,
            prefix: signalPrefix
          })
          signalsImageMeta.push({
            name: signalNameFull.signalName,
            prefix: signalPrefix,
            suffix: index,
            icon: signalConfig.icon,
            additionalSuffix: false
          })

          const suffixs = signalConfig["additional-suffix"]
          if (suffixs) {
            let additionalSuffixIndex = 0

            // Number additional suffix
            for (const suffix of suffixs) {
              log("number index suffix:", suffix)

              const signalNameFull2 = pushSignal(signalPrefix, `${ index }-${ suffix }`, {
                sort: `${ [signalSuffixIndex, index].map(getChar).join("-") }-${ additionalSuffixIndex }`,
                prefix: signalPrefix
              })
              signalsImageMeta.push({
                name: signalNameFull2.signalName,
                prefix: signalPrefix,
                suffix: index,
                icon: signalConfig.icon,
                additionalSuffix: suffix
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

  fs.writeFileSync("./signals.json", JSON.stringify(builtSignals))

  // SIGNALS
  const signalsToFormat = []
  signalsToFormat.push(...sorted.map(signal => ({
    type: "virtual-signal",
    name: signal.signalName,
    icon: `__Outpost Signals__/graphics/${ signal.signalName }.png`,
    icon_size: 32,
    subgroup: `virtual-signal-${ signal.prefix }`,
    order: signal.sort
  })))

  const luaSignals = []
  luaSignals.push("data:extend({")
  luaSignals.push(...mapLua(signalsToFormat))
  luaSignals.push("})")

  const luaSignalsOut = luaSignals.join("\n")
  fs.writeFileSync("../output/prototypes/outpost_signals.lua", luaSignalsOut)
  // END

  // SIGNAL GROUPS

  console.log("localeGroupNames", localeGroupNames)

  const groupSignalsToFormat = []
  const groupNames = Object.keys(localeGroupNames)

  for (const name of groupNames) {
    groupSignalsToFormat.push({
      type: "item-group",
      name,
      order: "t",
      inventory_order: "z",
      icon: `__Outpost Signals__/graphics/group-${ groupNameIcon[name]}.png`,
      // icon: `__Outpost Signals__/graphics/signals.png`,
      icon_size: 64
    })
  }


  groupSignalsToFormat.push(...signalGroups.map(signalConfig => ({
    type: "item-subgroup",
    name: signalConfig.name,
    group: signalConfig.group,
    order: signalConfig.order
  })))
  // END

  const luaSignalGroups = []
  luaSignalGroups.push("data:extend({")
  luaSignalGroups.push(...mapLua(groupSignalsToFormat))
  luaSignalGroups.push("})")
  const luaSignalGroupsOut = luaSignalGroups.join("\n")

  fs.writeFileSync("../output/prototypes/item-groups.lua", luaSignalGroupsOut)

  const cfg = []
  cfg.push("[virtual-signal-name]")
  cfg.push(objLua(localeNames, true))
  cfg.push("[item-group-name]")
  cfg.push(objLua(localeGroupNames, true))

  fs.writeFileSync("../output/locale/en/locale.cfg", cfg.join("\n"))

  console.log("signalsImageMeta", signalsImageMeta)

  const imgPromises = []
  for (const imgMeta of signalsImageMeta) {
    imgPromises.push(generateImage(imgMeta).catch(e => console.error(e)))
  }

  for (const group of Object.values(groupNameIcon)) {
    imgPromises.push(jimp.read("../graphics_base/signals.png").then(async signal => {
      const overlay = (await jimp.read(`../graphics_base/${ group }.png`)).resize(24, 24)
      signal.composite(overlay, 64 - 24 - 4, 64 - 24 - 4)
      return signal
    }).then(signal => signal.write(`../output/graphics/group-${ group }.png`)))
  }

  await Promise.all(imgPromises)
}

async function generateImage (imgMeta: ImageMeta) {
  const buildGraphic = await jimp.read(`../graphics_base/${ signalIconConfig[imgMeta.prefix] }.png`)

  if (imgMeta.suffix.toString()) {
    await jimp.loadFont(imgMeta.icon ? jimp.FONT_SANS_10_BLACK : jimp.FONT_SANS_16_BLACK).then(font => {
      const textWidth = jimp.measureText(font, imgMeta.suffix.toString())
      const textHeight = jimp.measureTextHeight(font, imgMeta.suffix.toString(), 100)

      const location = imgMeta.icon ? [16 - textWidth / 2, 2] : [16 - textWidth / 2, 16 - textHeight / 2]
      // console.log("width", textWidth, "height", textHeight)
      buildGraphic.print(font, location[0] , location[1], imgMeta.suffix.toString())
    })
  }

  if (imgMeta.icon) {
    await jimp.read(`../graphics_base/${ imgMeta.prefix }.png`)
      .then(prefix => prefix.resize(10, 10))
      .then(prefix => buildGraphic.composite(prefix, 11, 14))
  }

  if (imgMeta.additionalSuffix) {
    await jimp.read(`../graphics_base/${ imgMeta.additionalSuffix }.png`)
      .then(prefix => prefix.resize(8, 8))
      .then(prefix => buildGraphic.composite(prefix, 4, 32 - 8 - 4))
  }

  return buildGraphic.write(`../output/graphics/${ imgMeta.name }.png`)
}

// tslint:disable-next-line: no-floating-promises
run()
