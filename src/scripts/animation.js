// time in ms

const anim1 = [
    { 
        time: 0,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    },
    {
        time: 1000,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 10, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 10, z: 15 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 10, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    },
    {
        time: 2000,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    },
    {
        time: 3000,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: -10, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: -10, z: -15 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: -10, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    },
    {
        time: 4000,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    },
    {
        time: 4500,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 60, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 30, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    },
    {
        time: 5000,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    }, 
    {
        time: 6000,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 360, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 360, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 360, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    }, 
    {
        time: 7000,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    },
    {
        time: 8000,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: -20, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    },
    {
        time: 9000,
        animations: [{
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, { 
            node: 6,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    }
]

const anim2 = [
  {
    time: 0,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 5 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 5 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: -20, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 20, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
  {
    time: 1000,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: -5 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: -5 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: -10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
  {
    time: 2000,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 5 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 5 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: -20, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 20, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
  {
    time: 3000,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: -5 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: -5 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: -10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
  {
    time: 4000,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: -20, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
  {
    time: 5000,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
  {
    time: 6000,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 10, z: 15 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: -10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
  {
    time: 7000,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: -10, z: -15 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: -10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
  {
    time: 8000,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 5, z: 7.5 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: -10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
  {
    time: 8000,
    animations: [
      {
        node: 0,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 1,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 6,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: -10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
      {
        node: 8,
        transform: {
          translation: { x: 0, y: 0, z: 0 },
          rotation: { x: 10, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
        },
      },
    ],
  },
];

