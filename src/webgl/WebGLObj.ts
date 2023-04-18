import { PROJECTION } from '../types'
import { ProjectionType } from '../types/Projection'
import WebGLModel from '../types/WebGLModel'
import { Mat4, degToRad } from '../utils'
import { WebGLUtils } from './WebGLUtils'

export class WebGLObj {
    // CLASS PROPERTIES

    // The object to be drawn.
    public object: WebGLModel | null = null

    // The camera angle value
    public cameraAngle: number = degToRad(0)
    // The camera radius value
    public cameraRadius: number = 500
    // The shading mode value
    public shadingMode: boolean = false

    // WebGL Context.
    private _gl: WebGLRenderingContext
    public get gl(): WebGLRenderingContext {
        return this._gl
    }

    // WebGL Shader Program.
    private _program: WebGLProgram
    public get program(): WebGLProgram {
        return this._program
    }

    // Projection matrix.
    private projectionMatrix: Mat4 = Mat4.identity()

    // Animation properties.
    private then = 0

    // CLASS METHODS

    /**
     * Construct the renderer.
     *
     * @param gl - The WebGL context.
     */
    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        this._gl = gl
        this._program = program

        // Default projection.
        this.setProjection(PROJECTION.ORTHOGONAL)
    }

    /**
     * Set the object to be drawn.
     *
     * @param object - The object to be drawn.
     */
    setObject(object: WebGLModel) {
        this.object = object
        // Set the default transformation.
        this.setDefaultTransformation()
    }

    /**
     * Set the default transformation.
     */
    setDefaultTransformation() {
        //this.object.translation = [50, 0, 0];
        //this.object.rotation = [degToRad(60), degToRad(60), degToRad(60)];
        //this.object.scale = [1, 1, 1];
        this.cameraAngle = degToRad(0)
        this.cameraRadius = 500
        this.shadingMode = false
    }

    /**
     * Set the projection used in this object.
     * @param projection
     */
    setProjection(projection: string) {
        // Perspective projection parameters.
        const fov = degToRad(60)
        const aspect =
            (this._gl.canvas as HTMLCanvasElement).clientWidth /
            (this._gl.canvas as HTMLCanvasElement).clientHeight
        const zNear = 0.1
        const zFar = 2000

        switch (projection) {
            case PROJECTION.ORTHOGONAL:
                this.projectionMatrix = Mat4.orthographic(
                    (this._gl.canvas as HTMLCanvasElement).clientWidth /
                        (this._gl.canvas as HTMLCanvasElement).clientHeight
                )
                break
            case PROJECTION.PERSPECTIVE:
                this.projectionMatrix = Mat4.perspective(
                    fov,
                    aspect,
                    zNear,
                    zFar
                )
                break
            default:
                const oblique = Mat4.oblique()
                this.projectionMatrix = oblique
                break
        }
    }

    /**
     * Draw the scene.
     */
    drawScene(now: number) {
        // Convert to seconds
        now *= 0.001
        // Subtract the previous time from the current time
        var deltaTime = now - this.then
        // Remember the current time for the next frame.
        this.then = now

        // Resize the canvas to fit the window.
        WebGLUtils.resizeCanvasToDisplaySize(
            this._gl.canvas as HTMLCanvasElement
        )

        // Tell WebGL how to convert from clip space to pixels
        this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height)

        // Clear the canvas.
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT)

        // Turn on culling. By default backfacing triangles
        // will be culled.
        this._gl.enable(this._gl.CULL_FACE)

        // Enable the depth buffer
        this._gl.enable(this._gl.DEPTH_TEST)

        // Check if the object is defined.
        if (!this.object) {
            return
        }

        // Get the projection matrix.
        const projectionMatrix = this.projectionMatrix.clone()

        // Use matrix math to compute a position on a circle where the camera is
        let cameraMatrix = Mat4.identity()
        cameraMatrix.rotate(0, degToRad(this.cameraAngle), 0)
        cameraMatrix.translate(0, 0, this.cameraRadius)

        // Get the camera's position from the matrix we computed
        var cameraPosition = [
            cameraMatrix.getAt(3, 0),
            cameraMatrix.getAt(3, 1),
            cameraMatrix.getAt(3, 2),
        ]
        var target = [0, 0, 0]
        var up = [0, 1, 0]

        // Compute the camera's matrix using look at.
        cameraMatrix = Mat4.lookAt(cameraPosition, target, up)

        // Make a view matrix from the camera matrix
        const viewMatrix = cameraMatrix.clone().inverse()

        // Draw the object.
        this.object.draw(
            projectionMatrix,
            viewMatrix,
            Mat4.identity(),
            cameraPosition,
            this.shadingMode
        )

        // Call drawScene again next frame
        requestAnimationFrame(this.drawScene.bind(this))
    }

    clear() {
        // Clear the objects.
        this.object = null
    }

    reset(object: any) {
        // Reset the objects to default.
        this.object = object
    }
}

export default WebGLObj
