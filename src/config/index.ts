import { Signal } from "../types"
const signals: Signal[] = [
  /*{
    group: "alpha",
    subgroup: "colours",
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
    subgroup: "ore",
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
  }
  /*,
  {
    group: "ore",
    subgroup: "ore",
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
    subgroup: "ore",
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
    subgroup: "metalplates",
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
    subgroup: "circuits",
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
    subgroup: "misc",
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
    subgroup: "repair",
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
    subgroup: "misc",
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
  */
]

export default signals
