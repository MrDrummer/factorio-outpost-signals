import { Signal } from "../types"
const signals: Signal[] = [
  {
    name: "colours",
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
    name: "ore",
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
    name: "ore2",
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
    name: "ore3",
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
    name: "metalplates",
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
    name: "circuits",
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
    name: "misc",
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
    name: "repair",
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
    name: "outposts",
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
