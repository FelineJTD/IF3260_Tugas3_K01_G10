// time in ms

const dogAnimation = [
    { 
        time: 0,
        animations: [{ 
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 0,
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
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 30 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 0,
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
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 0,
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
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: -30 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 0,
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
            node: 1,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }, {
            node: 0,
            transform: {
                translation: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
        }]
    },
    // { 
    //     time: 1000,
    //     node: 1,
    //     transform: {
    //         translation: { x: 0, y: 0, z: 0 },
    //         rotation: { x: 0, y: 0, z: 30 },
    //         scale: { x: 1, y: 1, z: 1 }
    //     }
    // },
    // { 
    //     time: 2000,
    //     node: 1,
    //     transform: {
    //         translation: { x: 0, y: 0, z: 0 },
    //         rotation: { x: 0, y: 0, z: 0 },
    //         scale: { x: 1, y: 1, z: 1 }
    //     }
    // },
    // { 
    //     time: 3000,
    //     node: 1,
    //     transform: {
    //         translation: { x: 0, y: 0, z: 0 },
    //         rotation: { x: 0, y: 0, z: -30 },
    //         scale: { x: 1, y: 1, z: 1 }
    //     }
    // },
    // { 
    //     time: 4000,
    //     node: 1,
    //     transform: {
    //         translation: { x: 0, y: 0, z: 0 },
    //         rotation: { x: 0, y: 0, z: 0 },
    //         scale: { x: 1, y: 1, z: 1 }
    //     }
    // },
]