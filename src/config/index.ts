import { Signal } from "../types"
const signalsConfig: Signal[] = [
  {
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
    icon: false,
    types: {
      letters: true,
      numbers: {
        start: 0,
        quantity: 10
      }
    }
  },
  {
    group: "ore",
    prefix: [
      "ironore",
      "copperore",
      "oil"
    ],
    icon: true,
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
      "coalore",
      "uraniumore"
    ],
    icon: true,
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
      "stoneore"
    ],
    icon: true,
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
    icon: true,
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
    icon: true,
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
      "bot",
      "furnace",
      "modules",
      "nuclear_fuel"
    ],
    icon: true,
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
      "repair"
    ],
    icon: true,
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
    icon: true,
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

  ironore: "cyan_blue",
  copperore: "orange",
  oil: "white",

  coalore: "grey",
  uraniumore: "lime_green",
  stoneore: "white",

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
