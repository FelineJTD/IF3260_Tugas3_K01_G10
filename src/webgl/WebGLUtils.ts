import { WebGLLocations } from '../types/WebGLModel'

// This class is used to create WebGLRenderingContext and WebGLProgram and the properties
export class WebGLUtils {
    public static createArrayBuffer(gl: WebGLRenderingContext, array: any[]) {
        let arrayBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        return arrayBuffer
    }

    public static createUintArrayBuffer(
        gl: WebGLRenderingContext,
        array: any[]
    ) {
        let arrayBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(array), gl.STATIC_DRAW)
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
        let attribute = gl.getAttribLocation(program, attr)
        gl.enableVertexAttribArray(attribute)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
    }

    public static bindColorAttribute(
        gl: WebGLRenderingContext,
        program: WebGLProgram,
        buffer: WebGLBuffer,
        attr: string
    ) {
        let attribute = gl.getAttribLocation(program, attr)
        gl.enableVertexAttribArray(attribute)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.vertexAttribPointer(attribute, 3, gl.UNSIGNED_BYTE, true, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
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

    public static setLocation(
        gl: WebGLRenderingContext,
        program: WebGLProgram
    ): WebGLLocations {
        // Set the attribute location.
        let position = gl.getAttribLocation(program, 'a_position')
        let color = gl.getAttribLocation(program, 'a_color')
        let normal = gl.getAttribLocation(program, 'a_normal')
        let tangent = gl.getAttribLocation(program, 'a_tangent')
        let bitangent = gl.getAttribLocation(program, 'a_bitangent')
        let textureCoord = gl.getAttribLocation(program, 'a_textureCoord')

        // Set uniform location.
        let projectionMatrix = gl.getUniformLocation(
            program,
            'u_projectionMatrix'
        )
        let viewMatrix = gl.getUniformLocation(program, 'u_viewMatrix')
        let modelMatrix = gl.getUniformLocation(program, 'u_modelMatrix')
        let normalMatrix = gl.getUniformLocation(program, 'u_normalMatrix')
        let reverseLightDirection = gl.getUniformLocation(
            program,
            'u_reverseLightDirection'
        )
        let worldCameraPosition = gl.getUniformLocation(
            program,
            'u_worldCameraPosition'
        )
        let shadingOn = gl.getUniformLocation(program, 'u_shadingOn')
        let textureMode = gl.getUniformLocation(program, 'u_textureMode')

        // Texture uniform location.
        let textureImage = gl.getUniformLocation(program, 'u_texture_image')
        let textureEnvironment = gl.getUniformLocation(
            program,
            'u_texture_environment'
        )
        let textureBump = gl.getUniformLocation(program, 'u_texture_bump')

        if (
            !projectionMatrix ||
            !viewMatrix ||
            !modelMatrix ||
            !normalMatrix ||
            !reverseLightDirection ||
            !worldCameraPosition ||
            !shadingOn ||
            !textureMode ||
            !textureImage ||
            !textureEnvironment ||
            !textureBump
        ) {
            throw new Error(
                'Failed to get the storage location of uniform variable.'
            )
        }

        return {
            position,
            color,
            normal,
            tangent,
            bitangent,
            textureCoord,
            projectionMatrix,
            viewMatrix,
            modelMatrix,
            normalMatrix,
            reverseLightDirection,
            worldCameraPosition,
            shadingOn,
            textureMode,
            textureImage,
            textureEnvironment,
            textureBump,
        }
    }

    static resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
        const displayWidth  = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
      
          // Check if the canvas is not the same size.
          const needResize = (canvas.width != displayWidth || canvas.height != displayHeight);
      
          if (needResize) {
            // Make the canvas the same size
            canvas.width  = displayWidth;
            canvas.height = displayHeight;
          }
      
          return needResize;
      }
}
