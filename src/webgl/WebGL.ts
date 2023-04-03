// This class is used to create WebGLRenderingContext and WebGLProgram and the properties
export class WebGL {
    public gl: WebGLRenderingContext
    public program: WebGLProgram
    constructor(gl: WebGLRenderingContext, program: WebGLProgram) {
        this.gl = gl
        this.program = program
    }

    public createArrayBuffer(array: any[]) {
        let arrayBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, arrayBuffer)
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(array),
            this.gl.STATIC_DRAW
        )
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
        return arrayBuffer
    }

    public createElementBuffer(element: any[]) {
        let elementBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, elementBuffer)
        this.gl.bufferData(
            this.gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(element),
            this.gl.STATIC_DRAW
        )
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null)
        return elementBuffer
    }

    public bindAttribute(buffer: any[], attr: string) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
        let attribute = this.gl.getAttribLocation(this.program, attr)
        this.gl.vertexAttribPointer(attribute, 3, this.gl.FLOAT, false, 0, 0)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
        this.gl.enableVertexAttribArray(attribute)
    }

    public enableDepth() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
        this.gl.clearDepth(1.0)
        this.gl.enable(this.gl.DEPTH_TEST)
        this.gl.depthFunc(this.gl.LEQUAL)
    }

    public createShader(type: number, source: string) {
        let shader = this.gl.createShader(type)
        if (shader) {
            this.gl.shaderSource(shader, source)
            this.gl.compileShader(shader)
            let success = this.gl.getShaderParameter(
                shader,
                this.gl.COMPILE_STATUS
            )
            if (success) {
                return shader
            }
            console.log(
                'Failed to create shader. Reason: ',
                this.gl.getShaderInfoLog(shader)
            )
        } else {
            console.log('Failed to create shader.')
        }

        this.gl.deleteShader(shader)
    }

    public createProgram(vertexSource: string, fragmentSource: string) {
        const vertexShader = this.createShader(
            this.gl.VERTEX_SHADER,
            vertexSource
        )
        const fragmentShader = this.createShader(
            this.gl.FRAGMENT_SHADER,
            fragmentSource
        )
        let program = this.gl.createProgram()
        if (program && vertexShader && fragmentShader) {
            this.gl.attachShader(program, vertexShader)
            this.gl.attachShader(program, fragmentShader)
            this.gl.linkProgram(program)

            let success = this.gl.getProgramParameter(
                program,
                this.gl.LINK_STATUS
            )
            if (success) {
                return program
            }

            console.log(
                'Failed to create program. Reason: ',
                this.gl.getProgramInfoLog(program)
            )
        } else {
            console.log('Failed to create program.')
        }
        this.gl.deleteProgram(program)
    }
}
