// Texture mungkin bisa ditaruh sini
type Model = {
    name: string
    vertices: number[]
    colors: number[]
    normals: number[]
    texture: WebGLTexture | null
    textureCoords: number[] | []
    textureImage: HTMLImageElement | null
    isTextureOn: boolean
    isShadingOn: boolean
    rotationAxis: string | null // x, y, z
    rotationCoordinate: number[] | []
    rotationAngle: number
    children: Model[] | []
    siblings: Model[] | []

}

export { Model }
