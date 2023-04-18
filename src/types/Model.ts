import { TEXTURE_TYPE } from "./Texture"

// Texture mungkin bisa ditaruh sini
type Model = {
    num_components: number
    components: [
        {
            num_vertices: number
            vertices: number[][]
            num_faces: number
            faces: number[][]
            colors: number[][]
        }
    ]
    name: string
    texture: number

    translationObj: number[]
    rotationObj: number[]
    scaleObj: number[]
    translationChild: number[]
    rotationChild: number[]
    scaleChild: number[]

    children: Model[]
}

export { Model }
