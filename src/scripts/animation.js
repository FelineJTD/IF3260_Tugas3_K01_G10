// time in ms

const dogAnimation = [
    { 
        time: 0,
        node: 1,
        transform: {
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 }
        }
    },
    { 
        time: 1000,
        node: 1,
        transform: {
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 60 },
            scale: { x: 1, y: 1, z: 1 }
        }
    },
    { 
        time: 2000,
        node: 1,
        transform: {
            translation: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: -60 },
            scale: { x: 1, y: 1, z: 1 }
        }
    },
]