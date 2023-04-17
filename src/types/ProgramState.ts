import { Model } from './Model'

type ProgramState = {
    mousedown: boolean
    model: Model
    models: boolean[]

    color: number[]

    projection: string

    transform: {
        scale: {
            x: number
            y: number
            z: number
        }
        rotation: {
            x: number
            y: number
            z: number
        }
        translation: {
            x: number
            y: number
            z: number
        }
    }

    view: {
        rotation: number
        radius: number
    }

    enableShader: boolean
    enableAnimation: boolean
}

export { ProgramState }