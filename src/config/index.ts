import { Signal } from "../types"
const signals: Signal[] = [
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

export default signals
