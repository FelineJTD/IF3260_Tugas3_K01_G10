// This class is used to create WebGLRenderingContext and WebGLProgram and the properties
export class WebGLUtils {
    public static createArrayBuffer(gl: WebGLRenderingContext, array: any[]) {
        let arrayBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        return arrayBuffer
    }

    public static createElementBuffer(
        gl: WebGLRenderingContext,
        element: any[]
    ) {
        let elementBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer)
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(element),
            gl.STATIC_DRAW
        )
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
        return elementBuffer
    }

    public static bindAttribute(
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        buffer: WebGLBuffer,
        attr: string
    ) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        let attribute = gl.getAttribLocation(program, attr)
        gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        gl.enableVertexAttribArray(attribute)
    }

    public static enableDepth(gl: WebGLRenderingContext) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.clearDepth(1.0)
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
    }
    public static createShader(
        gl: WebGLRenderingContext,
        type: number,
        source: string
    ): WebGLShader | null {
        let shader = gl.createShader(type)
        if (shader) {
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
            if (success) {
                return shader
            }
            console.log(
                'Failed to create shader. Reason: ',
                gl.getShaderInfoLog(shader)
            )
        } else {
            console.log('Failed to create shader.')
        }

        gl.deleteShader(shader)
        return null
    }

    public static createProgram(
        gl: WebGLRenderingContext,
        vertexSource: string,
        fragmentSource: string
    ): WebGLProgram | null {
        const vertexShader = this.createShader(
            gl,
            gl.VERTEX_SHADER,
            vertexSource
        )
        const fragmentShader = this.createShader(
            gl,
            gl.FRAGMENT_SHADER,
            fragmentSource
        )
        let program = gl.createProgram()
        if (program && vertexShader && fragmentShader) {
            gl.attachShader(program, vertexShader)
            gl.attachShader(program, fragmentShader)
            gl.linkProgram(program)

            let success = gl.getProgramParameter(program, gl.LINK_STATUS)
            if (success) {
                return program
            }

            console.log(
                'Failed to create program. Reason: ',
                gl.getProgramInfoLog(program)
            )
        } else {
            console.log('Failed to create program.')
        }
        gl.deleteProgram(program)
        return null
    }
}
