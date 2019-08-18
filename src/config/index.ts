import { Signal } from "../types"
const signalsConfig: Signal[] = [
  /*{
    group: "alpha",
    prefix: [
      "cyan_blue",
      "dark_blue",
      "green",
      "grey",
      "light_blue",
      "lime_green",
      "orange",
      "pink",
      "red",
      "white",
      "yellow"
    ],
    types: {
      letters: true,
      numbers: {
        start: 0,
        quantity: 10
      }
    }
  },*/
  {
    group: "ore",
    prefix: [
      "iron_ore",
      "copper_ore",
      "oil"
    ],
    types: {
      letters: false,
      numbers: {
        start: 1,
        quantity: 20
      }
    },
    "additional-suffix": [
      "ammo",
      "repair"
    ]
  },
  {
    group: "ore",
    prefix: [
      "coal_ore",
      "uranium_ore"
    ],
    types: {
      letters: false,
      numbers: {
        start: 1,
        quantity: 10
      }
    },
    "additional-suffix": [
      "ammo",
      "repair"
    ]
  },
  {
    group: "ore",
    prefix: [
      "stone_ore"
    ],
    types: {
      letters: false,
      numbers: {
        start: 1,
        quantity: 5
      }
    },
    "additional-suffix": [
      "ammo",
      "repair"
    ]
  },
  {
    group: "other",
    prefix: [
      "ironplate",
      "copperplate",
      "steelplate"
    ],
    types: {
      letters: false,
      numbers: {
        start: 1,
        quantity: 10
      }
    },
    "additional-suffix": [
      "ammo",
      "repair"
    ]
  },
  {
    group: "other",
    prefix: [
      "greencircuit",
      "redcircuit",
      "bluecircuit"
    ],
    types: {
      letters: false,
      numbers: {
        start: 1,
        quantity: 10
      }
    },
    "additional-suffix": [
      "ammo",
      "repair"
    ]
  },
  {
    group: "other",
    prefix: [
      "ammo",
      "bot",
      "furnace",
      "modules",
      "nuclear_fuel"
    ],
    types: {
      letters: false,
      numbers: {
        start: 1,
        quantity: 10
      }
    },
    "additional-suffix": [
      "ammo",
      "repair"
    ]
  },
  {
    group: "other",
    prefix: [
      "repair"
    ],
    types: {
      letters: false,
      numbers: {
        start: 1,
        quantity: 15
      }
    }
  },
  {
    group: "other",
    prefix: [
      "misc"
    ],
    types: {
      letters: false,
      numbers: {
        start: 1,
        quantity: 20
      }
    },
    "additional-suffix": [
      "ammo",
      "repair"
    ]
  }
]

export const signalIconConfig = {
  cyan_blue: "cyan_blue",
  dark_blue: "dark_blue",
  green: "green",
  grey: "grey",
  light_blue: "light_blue",
  lime_green: "lime_green",
  orange: "orange",
  pink: "pink",
  red: "red",
  white: "white",
  yellow: "yellow",

  iron_ore: "cyan_blue",
  copper_ore: "orange",
  oil: "grey",

  coal_ore: "grey",
  uranium_ore: "lime_green",
  stone_ore: "white",

  ironplate: "cyan_blue",
  steelplate: "light_blue",
  copperplate: "orange",

  greencircuit: "green",
  redcircuit: "red",
  bluecircuit: "dark_blue",

  ammo: "pink",
  bot: "pink",
  furnace: "pink",
  modules: "pink",
  nuclear_fuel: "pink",
  repair: "pink",
  misc: "pink"
}

export const signals = signalsConfig
