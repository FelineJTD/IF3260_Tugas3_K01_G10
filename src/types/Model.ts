// Texture mungkin bisa ditaruh sini
type Model = {
    name: string
    vertices: number[]
    colors: number[]
    normals: number[]
    childrens?: Model[]

}

export { Model }
