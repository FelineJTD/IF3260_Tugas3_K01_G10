import {
    fragmentShaderFlat,
    fragmentShaderLight,
    vertexShaderFlat,
    vertexShaderLight,
    WebGLUtils,
} from './webgl'
import { ControllerUI } from './UI/ControllerUI'
import { PROJECTION } from './types'
import { ProgramState } from './types/ProgramState'
import { Mat4, degToRad, normalize } from './utils'
import { Model } from './types/Model'

let state: ProgramState // Ini adalah program state atau state yang mengatur keseluruhan

function setTransformMatrix() {
    let Tmatrix: Mat4 = new Mat4()

    Tmatrix = Tmatrix.scale(
        state.transform.scale.x,
        state.transform.scale.y,
        state.transform.scale.z
    )

    Tmatrix.rotate(
        (state.transform.rotation.x * Math.PI) / 180,
        (state.transform.rotation.y * Math.PI) / 180,
        (state.transform.rotation.z * Math.PI) / 180
    )

    Tmatrix.translate(
        state.transform.translation.x,
        state.transform.translation.y,
        state.transform.translation.z
    )

    return Tmatrix
}

function setViewMatrix() {
    let Vmatrix: Mat4 = new Mat4()

    Vmatrix.rotate(0, degToRad(state.view.rotation), 0)
    Vmatrix.translate(0, 0, state.view.radius)
    // Get the camera's position from the matrix we computed
    let cameraPosition = [
        Vmatrix.getAt(3, 0),
        Vmatrix.getAt(3, 1),
        Vmatrix.getAt(3, 2),
    ]
    let target = [0, 0, 0]
    let up = [0, 1, 0]

    // Compute the camera's matrix using look at.
    Vmatrix = Mat4.lookAt(cameraPosition, target, up)
    Vmatrix = Vmatrix.inverse()
    return Vmatrix
}

// Function used to rotate and do things to model
function computeObjMatrix(
    obj: Model,
    gl: WebGLRenderingContext,
    state: ProgramState,
    reverseLightDirectionLocation: WebGLUniformLocation | null,
    worldInverseTransposeLocation: WebGLUniformLocation,
    PmatrixLoc: WebGLUniformLocation,
    TmatrixLoc: WebGLUniformLocation
) {
    let proj_matrix: Mat4
    if (state.projection == PROJECTION.PERSPECTIVE) {
        proj_matrix = Mat4.perspective(
            45,
            gl.canvas?.width / gl.canvas?.height,
            0.1,
            100
        )
    } else if (state.projection == PROJECTION.ORTHOGONAL) {
        proj_matrix = Mat4.orthographic(gl.canvas.width / gl.canvas.height)
    } else {
        // use oblique projection
        proj_matrix = Mat4.oblique()
    }
    let transform_matrix = setTransformMatrix()
    let view_matrix = setViewMatrix()
    proj_matrix.multiply(view_matrix)

    // Set world and normal
    let worldInverseMatrix = transform_matrix.inverse()
    let worldInverseTransposeMatrix = worldInverseMatrix.transpose().get()
    if (reverseLightDirectionLocation) {
        gl.uniform3fv(
            reverseLightDirectionLocation,
            normalize([-0.9, 0.1, 0.5]) // ini kayanya perlu diganti
        )
    }
    gl.uniformMatrix4fv(
        worldInverseTransposeLocation,
        false,
        worldInverseTransposeMatrix
    )

    gl.uniformMatrix4fv(PmatrixLoc, false, proj_matrix.matrix)
    gl.uniformMatrix4fv(TmatrixLoc, false, transform_matrix.matrix)
}

// TODO: Buat rekursif yang bisa render semua objek
function drawGeometry(gl: WebGLRenderingContext, vertices: number[]) {
    // Draw the geometry.
    let primitiveType = gl.TRIANGLES
    let offset = 0
    let count = vertices.length / 3
    // console.log(count)
    gl.drawArrays(primitiveType, offset, count)
}

function drawObject(
    obj: Model,
    gl: WebGLRenderingContext,
    shaderProgram: WebGLProgram,
    isShadingOn: boolean
) {
    console.log("Drawing: " + obj.name);
    // Bind all buffers
    let vertexBuffer = WebGLUtils.createArrayBuffer(gl, obj.normals)
    let colorBuffer = WebGLUtils.createUintArrayBuffer(gl, obj.colors)
    let normalBuffer = WebGLUtils.createArrayBuffer(gl, obj.normals)

    if (!vertexBuffer || !colorBuffer || !normalBuffer) return
    // Turn the position and color on
    WebGLUtils.bindAttribute(gl, shaderProgram, vertexBuffer, 'position')
    WebGLUtils.bindColorAttribute(gl, shaderProgram, colorBuffer, 'color')
    WebGLUtils.bindAttribute(gl, shaderProgram, normalBuffer, 'a_normal')

    // if (isShadingOn) turnShadingOn(obj);
    let PmatrixLoc = gl.getUniformLocation(shaderProgram, 'Pmatrix')
    let TmatrixLoc = gl.getUniformLocation(shaderProgram, 'Tmatrix')
    let worldInverseTransposeLocation = gl.getUniformLocation(
        shaderProgram,
        'u_worldInverseTranspose'
    )
    let reverseLightDirectionLocation = gl.getUniformLocation(
        shaderProgram,
        'u_reverseLightDirection'
    )

    if (!PmatrixLoc || !TmatrixLoc || !worldInverseTransposeLocation) {
        console.log('Failed to get uniform locations')
        return
    }

    computeObjMatrix(
        obj,
        gl,
        state,
        reverseLightDirectionLocation,
        worldInverseTransposeLocation,
        PmatrixLoc,
        TmatrixLoc
    )

    drawGeometry(gl, obj.vertices)

    // recursively draw siblings and children
    for (const sibling of obj.siblings)
        drawObject(sibling, gl, shaderProgram, isShadingOn)
    for (const child of obj.children)
        drawObject(child, gl, shaderProgram, isShadingOn)
}

function main() {
    ControllerUI.setDefaultState()
    state = ControllerUI.state
    ControllerUI.setListeners(document)

    let canvas = document.getElementById('canvas') as HTMLCanvasElement
    let gl = canvas?.getContext('webgl')
    if (!gl) {
        console.log('No rendering context for WebGL')
        return
    } else {
        console.log('Rendering context for WebGL is obtained')
    }

    const flatShaderProgram = WebGLUtils.createProgram(
        gl,
        vertexShaderFlat,
        fragmentShaderFlat
    )
    const lightShaderProgram = WebGLUtils.createProgram(
        gl,
        vertexShaderLight,
        fragmentShaderLight
    )

    let old_time = 0
    function render(new_time: number) {
        if (!gl) {
            return
        }
        if (!flatShaderProgram || !lightShaderProgram) {
            console.log('Failed to create shader program')
            return
        }
        let time_difference = new_time - old_time

        if (state.enableAnimation) {
            ControllerUI.startAnimation(
                document,
                time_difference,
                0.05,
                0.02,
                0.03
            )
            old_time = new_time
        }

        // Setup shader
        let shaderProgram: WebGLProgram
        if (state.enableShader) {
            shaderProgram = lightShaderProgram
        } else {
            shaderProgram = flatShaderProgram
        }

        gl.viewport(0.0, 0.0, gl.canvas.width, gl.canvas.height)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        // Turn on culling. By default backfacing triangles
        // will be culled.
        gl.enable(gl.CULL_FACE)

        // Enable the depth buffer
        gl.enable(gl.DEPTH_TEST)
        gl.useProgram(shaderProgram)

        drawObject(state.model, gl, shaderProgram, state.enableShader)

        window.requestAnimationFrame(render)
    }
    render(0)
}
main()
