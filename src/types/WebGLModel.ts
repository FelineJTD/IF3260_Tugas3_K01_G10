import { Mat4, getAllVectors, normalize } from '../utils'
import { WebGLUtils } from '../webgl'
import { Model } from './Model'
import { TEXTURE_MAPPING, TEXTURE_TYPE } from './Texture'

export type WebGLLocations = {
    position: number
    color: number
    normal: number
    tangent: number
    bitangent: number
    textureCoord: number
    projectionMatrix: WebGLUniformLocation
    viewMatrix: WebGLUniformLocation
    modelMatrix: WebGLUniformLocation
    normalMatrix: WebGLUniformLocation
    reverseLightDirection: WebGLUniformLocation
    worldCameraPosition: WebGLUniformLocation
    shadingOn: WebGLUniformLocation
    textureMode: WebGLUniformLocation
    textureImage: WebGLUniformLocation
    textureEnvironment: WebGLUniformLocation
    textureBump: WebGLUniformLocation
}

export default class WebGLModel {
    // PROPERTIES.
    public model: Model

    // WebGL Context.
    private gl: WebGLRenderingContext
    // WebGL Shader Program.
    private program: WebGLProgram
    // Shader locations.
    private location: WebGLLocations

    // BUFFERS PROPERTIES.
    // Position and color buffer.
    private positionBuffer: WebGLBuffer
    private colorBuffer: WebGLBuffer
    // Vector buffer.
    private normalBuffer: WebGLBuffer
    private tangentBuffer: WebGLBuffer
    private bitangentBuffer: WebGLBuffer
    // Texture coordinates buffer.
    private textureCoordBuffer: WebGLBuffer

    // OBJECT PROPERTIES.
    // Position and color of the object.
    public numVertices: number
    public position: number[]
    public color: number[]
    // Vector properties.
    public normal: number[]
    public tangent: number[]
    public bitangent: number[]
    // Texture properties.
    public textures: WebGLTexture[]
    public textureCoord: number[]

    private children: WebGLModel[] = []

    // The texture mode.
    // -1 : No texture.
    // 0 : Image texture.
    // 1 : Environment texture.
    // 2 : Bump texture.
    public textureMode: number = -1

    // TRANSFORMATION PROPERTIES
    // The translation values.
    public translation: number[] = [0, 0, 0]
    // The rotation values.
    public rotation: number[] = [0, 0, 0]
    // The scale values.
    public scale: number[] = [1, 1, 1]

    constructor(
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        model: Model
    ) {
        // Set the WebGL context and shader program.
        this.gl = gl
        this.program = program

        // Set model.
        this.model = model

        // Create the buffers.
        this.positionBuffer = this.gl.createBuffer()!!
        this.colorBuffer = this.gl.createBuffer()!!
        this.textureCoordBuffer = this.gl.createBuffer()!!
        this.normalBuffer = this.gl.createBuffer()!!
        this.tangentBuffer = this.gl.createBuffer()!!
        this.bitangentBuffer = this.gl.createBuffer()!!

        this.children = model.children.map(
            (child) => new WebGLModel(this.gl, this.program, child)
        )

        // Set shader locations.
        this.location = WebGLUtils.setLocation(this.gl, this.program)

        // Generate the properties.
        this.generateProperties()
    }

    private generateProperties() {
        let vertexPositions: any[] = []
        let vertexColors: any[] = []
        let vertexTextureCoordinates: any[] = []

        // For each part of the model.
        for (let i = 0; i < this.model.num_components; i++) {
            // The component in this models.
            let component = this.model.components[i]

            // List of vertices in the component.
            let vertices = component.vertices

            // Position and color of each vertex.
            let positions: any[] = []
            let colors: any[] = []
            let textureCoordinates: any[] = []

            // Mapping each vertex in a face to a position and color.
            for (let j = 0; j < component.num_faces; j++) {
                let face = component.faces[j]

                // Set each vertex position.
                positions = positions.concat(vertices[face[1]])
                positions = positions.concat(vertices[face[2]])
                positions = positions.concat(vertices[face[3]])
                positions = positions.concat(vertices[face[0]])
                positions = positions.concat(vertices[face[1]])
                positions = positions.concat(vertices[face[3]])

                // Set each vertex color.
                let color_idx = j % component.colors.length
                for (let k = 0; k < 6; k++) {
                    colors = colors.concat(component.colors[color_idx])
                }

                // Set each vertex texture coordinate.
                textureCoordinates = textureCoordinates.concat([
                    0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                ])
            }

            vertexPositions = vertexPositions.concat(positions)
            vertexColors = vertexColors.concat(colors)
            vertexTextureCoordinates =
                vertexTextureCoordinates.concat(textureCoordinates)
        }

        // Get the number of vertices.
        let numVertices = vertexPositions.length / 3

        // Get the vector.
        let vector = getAllVectors(vertexPositions)

        // Set the properties of the object.
        this.setProperties(
            numVertices,
            vertexPositions,
            vertexColors,
            vector.normals,
            vector.tangents,
            vector.bitangents,
            vertexTextureCoordinates
        )
    }

    setProperties(
        numVertices: number,
        geometry: number[],
        color: number[],
        normal: number[],
        tangent: number[],
        bitangent: number[],
        textureCoord: number[]
    ) {
        this.numVertices = numVertices
        this.position = geometry
        this.color = color
        this.normal = normal
        this.tangent = tangent
        this.bitangent = bitangent
        this.textureCoord = textureCoord

        // Create texture.
        let imageTexture = TEXTURE_MAPPING.image(this.gl)
        let environmentTexture = TEXTURE_MAPPING.environment(this.gl)
        let bumpTexture = TEXTURE_MAPPING.bump(this.gl)

        this.textures = [imageTexture, environmentTexture, bumpTexture]
    }

    setTexture(texture: number) {
        this.textureMode = texture
    }

    /**
     * Binds the geometry and color to the buffers.
     */
    protected bind() {
        const gl = this.gl

        // Start binding the position buffers.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
        // Set the position.
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.position),
            gl.STATIC_DRAW
        )

        // Start binding the color buffers.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        // Set the colors.
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Uint8Array(this.color),
            gl.STATIC_DRAW
        )

        // Start binding the normal buffers.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer)
        // Set the normal.
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.normal),
            gl.STATIC_DRAW
        )

        // Start binding the tangent buffers.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tangentBuffer)
        // Set the tangent.
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.tangent),
            gl.STATIC_DRAW
        )

        // Start binding the bitangent buffers.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bitangentBuffer)
        // Set the bitangent.
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.bitangent),
            gl.STATIC_DRAW
        )

        // Start binding the texture coordinates buffers.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer)
        // Set the texture coordinates.
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.textureCoord),
            gl.STATIC_DRAW
        )
    }

    private setBuffers() {
        const gl = this.gl

        // POSITION.
        // Turn on the attribute.
        gl.enableVertexAttribArray(this.location.position)

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        let size: number = 3 // 3 components per iteration
        let type = gl.FLOAT // the data is 32bit floats
        let normalize = false // don't normalize the data
        let stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0 // start at the beginning of the buffer
        gl.vertexAttribPointer(
            this.location.position,
            size,
            type,
            normalize,
            stride,
            offset
        )

        // COLOR.
        // Turn on the color attribute
        gl.enableVertexAttribArray(this.location.color)

        // Bind the color buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)

        // Tell the color attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        size = 4 // 3 components per iteration
        let typeColor = gl.UNSIGNED_BYTE // the data is 8bit unsigned bytes
        normalize = true // normalize the data
        gl.vertexAttribPointer(
            this.location.color,
            size,
            typeColor,
            normalize,
            stride,
            offset
        )

        // NORMAL.
        // Turn on the normal attribute
        gl.enableVertexAttribArray(this.location.normal)

        // Bind the normal buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer)

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        size = 3 // 3 components per iteration
        type = gl.FLOAT // the data is 32bit floats
        normalize = false // don't normalize the data
        stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
        offset = 0 // start at the beginning of the buffer
        gl.vertexAttribPointer(
            this.location.normal,
            size,
            type,
            normalize,
            stride,
            offset
        )

        // TANGENT.
        // Turn on the tangent attribute
        gl.enableVertexAttribArray(this.location.tangent)

        // Bind the tangent buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tangentBuffer)

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        size = 3 // 3 components per iteration
        type = gl.FLOAT // the data is 32bit floats
        normalize = false // don't normalize the data
        gl.vertexAttribPointer(
            this.location.tangent,
            size,
            type,
            normalize,
            stride,
            offset
        )

        // BITANGENT.
        // Turn on the bitangent attribute
        gl.enableVertexAttribArray(this.location.bitangent)

        // Bind the bitangent buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bitangentBuffer)

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        size = 3 // 3 components per iteration
        type = gl.FLOAT // the data is 32bit floats
        normalize = false // don't normalize the data
        gl.vertexAttribPointer(
            this.location.bitangent,
            size,
            type,
            normalize,
            stride,
            offset
        )

        // TEXTURE COORDINATES.
        // Turn on the texcoord attribute
        gl.enableVertexAttribArray(this.location.textureCoord)

        // bind the texcoord buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer)

        // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
        size = 2 // 2 components per iteration
        type = gl.FLOAT // the data is 32bit floats
        normalize = false // don't normalize the data
        gl.vertexAttribPointer(
            this.location.textureCoord,
            size,
            type,
            normalize,
            stride,
            offset
        )
    }

    private setUniforms(
        projection: Mat4,
        view: Mat4,
        model: Mat4,
        cameraPosition: number[],
        shadingMode: boolean
    ) {
        // Set projection matrix.
        this.gl.uniformMatrix4fv(
            this.location.projectionMatrix,
            false,
            projection.matrix
        )
        // Set the view matrix.
        this.gl.uniformMatrix4fv(this.location.viewMatrix, false, view.matrix)
        // Set the world matrix.
        this.gl.uniformMatrix4fv(this.location.modelMatrix, false, model.matrix)
        // Set the light direction.
        this.gl.uniform3fv(
            this.location.reverseLightDirection,
            normalize([0.2, 0.4, 1])
        )

        // Normal matrix.
        let viewModelMatrix = Mat4.multiply(view, model)
        let normalMatrix = new Mat4(viewModelMatrix).inverse().transpose()
        this.gl.uniformMatrix4fv(
            this.location.normalMatrix,
            false,
            normalMatrix.matrix
        )

        // Camera position.
        this.gl.uniform3fv(this.location.worldCameraPosition, cameraPosition)

        // Set the shading mode.
        this.gl.uniform1i(this.location.shadingOn, Number(shadingMode))
        // Set the texture on or off.
        this.gl.uniform1i(this.location.textureMode, Number(this.textureMode))

        // Set each texture unit to use a particular texture.
        // Texture image.
        this.gl.uniform1i(this.location.textureImage, 0)
        this.gl.activeTexture(this.gl.TEXTURE0)
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0])
        // Texture environment.
        this.gl.uniform1i(this.location.textureEnvironment, 1)
        this.gl.activeTexture(this.gl.TEXTURE1)
        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.textures[1])
        // Texture bump.
        this.gl.uniform1i(this.location.textureBump, 2)
        this.gl.activeTexture(this.gl.TEXTURE2)
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[2])
    }

    drawObject(
        projection: Mat4,
        view: Mat4,
        model: Mat4,
        cameraPosition: number[],
        shadingMode: boolean
    ) {
        //Hitung model untuk anak2nya
        let newModel = model.clone()
        newModel.translate(
            this.translation[0],
            this.translation[1],
            this.translation[2]
        )
        newModel.rotate(this.rotation[0], this.rotation[1], this.rotation[2])
        newModel.scale(this.scale[0], this.scale[1], this.scale[2])

        //Gambar object
        this.draw(projection, view, newModel, cameraPosition, shadingMode)

        // Draw rekursif
        for (const child of this.children) {
            child.draw(
                projection,
                view,
                newModel,
                cameraPosition,
                shadingMode
            )
        }
    }

    draw(
        projection: Mat4,
        view: Mat4,
        model: Mat4,
        cameraPosition: number[],
        shadingMode: boolean
    ) {
        this.gl.useProgram(this.program)

        // Bind the buffers.
        this.bind()
        this.setBuffers()

        let newModel = model.clone()
        newModel.translate(
            this.translation[0],
            this.translation[1],
            this.translation[2]
        )
        newModel.rotate(this.rotation[0], this.rotation[1], this.rotation[2])
        newModel.scale(this.scale[0], this.scale[1], this.scale[2])

        this.setUniforms(
            projection,
            view,
            newModel,
            cameraPosition,
            shadingMode
        )

        // Draw the geometry and colors.
        let primitiveType = this.gl.TRIANGLES
        let offset = 0
        let count = this.numVertices
        this.gl.drawArrays(primitiveType, offset, count)
    }
}

