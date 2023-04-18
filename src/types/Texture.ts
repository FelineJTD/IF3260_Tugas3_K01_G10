import { isPowerOf2 } from '../utils'

export type TEXTURE_TYPE = {
    NONE: number
    IMAGE: number
    ENV: number
    BUMP: number
}

export const TEXTURE: TEXTURE_TYPE = {
    NONE: 0,
    IMAGE: 1,
    ENV: 2,
    BUMP: 3,
}

// TODO: Ganti asset texture
export class TEXTURE_MAPPING {
    public static environment(gl: WebGLRenderingContext): WebGLTexture {
        // Create the texture.
        let texture = gl.createTexture()

        // Bind the texture.
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture)

        const faceInfos = [
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                url: '../assets/pos-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                url: '../assets/neg-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                url: '../assets/pos-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                url: '../assets/neg-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                url: '../assets/pos-z.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                url: '../assets/neg-z.jpg',
            },
        ]
        faceInfos.forEach((faceInfo) => {
            const { target, url } = faceInfo

            // Upload the canvas to the cubemap face.
            const level = 0
            const internalFormat = gl.RGBA
            const width = 512
            const height = 512
            const format = gl.RGBA
            const type = gl.UNSIGNED_BYTE

            // setup each face so it's immediately renderable
            gl.texImage2D(
                target,
                level,
                internalFormat,
                width,
                height,
                0,
                format,
                type,
                null
            )

            // Asynchronously load an image
            const image = new Image()
            image.src = url
            image.crossOrigin = '' // ask for CORS permission
            image.addEventListener('load', function () {
                // Now that the image has loaded make copy it to the texture.
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture)
                gl.texImage2D(
                    target,
                    level,
                    internalFormat,
                    format,
                    type,
                    image
                )
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
            })
        })
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
        gl.texParameteri(
            gl.TEXTURE_CUBE_MAP,
            gl.TEXTURE_MIN_FILTER,
            gl.LINEAR_MIPMAP_LINEAR
        )

        if (!texture) {
            throw new Error('Failed to create the texture object')
        }

        return texture
    }

    public static image(gl: WebGLRenderingContext): WebGLTexture {
        const url = '../assets/sun.jpg'

        return TEXTURE_MAPPING.loadTexture2D(gl, url)
    }

    public static bump(gl: WebGLRenderingContext): WebGLTexture {
        const url = '../assets/bump.png'
        return TEXTURE_MAPPING.loadTexture2D(gl, url)
    }

    public static loadTexture2D(
        gl: WebGLRenderingContext,
        url: string
    ): WebGLTexture {
        // Create a texture.
        let texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)

        // Fill the texture with a 1x1 blue pixel.
        const level = 0
        const internalFormat = gl.RGBA
        const width = 1
        const height = 1
        const border = 0
        const srcFormat = gl.RGBA
        const srcType = gl.UNSIGNED_BYTE
        const pixel = new Uint8Array([0, 0, 0, 255])
        gl.texImage2D(
            gl.TEXTURE_2D,
            level,
            internalFormat,
            width,
            height,
            border,
            srcFormat,
            srcType,
            pixel
        )

        // Asynchronously load an image
        let image = new Image()
        image.src = url
        image.crossOrigin = '' // ask for CORS permission
        image.addEventListener('load', function () {
            // Now that the image has loaded make copy it to the texture.
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                image
            )

            // Check if the image is a power of 2 in both dimensions.
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D)
            } else {
                gl.texParameteri(
                    gl.TEXTURE_2D,
                    gl.TEXTURE_WRAP_S,
                    gl.CLAMP_TO_EDGE
                )
                gl.texParameteri(
                    gl.TEXTURE_2D,
                    gl.TEXTURE_WRAP_T,
                    gl.CLAMP_TO_EDGE
                )
                gl.texParameteri(
                    gl.TEXTURE_2D,
                    gl.TEXTURE_MIN_FILTER,
                    gl.LINEAR
                )
            }
        })

        if (!texture) {
            throw new Error('Failed to create the texture object')
        }

        return texture
    }
}
