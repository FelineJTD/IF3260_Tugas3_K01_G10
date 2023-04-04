export class Mat4 {
    row: number = 4
    col: number = 4
    public matrix: number[] = []

    // Create identity matrix if no data is provided
    constructor(data?: number[]) {
        if (data && data.length === this.row * this.col) {
            this.matrix = data
        } else {
            this.matrix = new Array(this.row * this.col).fill(0)
            this.matrix[0] = 1
            this.matrix[5] = 1
            this.matrix[10] = 1
            this.matrix[15] = 1
        }
    }

    // set the matrix with the given array
    set(data: number[]) {
        if (data.length === this.row * this.col) {
            this.matrix = data
        } else {
            console.error('The length of the array is not correct.')
        }
    }

    // get the matrix
    get() {
        return this.matrix
    }

    // get the value of the matrix at the given row and column
    getAt(row: number, col: number) {
        return this.matrix[row * this.col + col]
    }

    // Transpose the matrix and return a new matrix
    transpose() {
        const matrix = new Mat4()
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                matrix.matrix[j * this.col + i] = this.matrix[i * this.col + j]
            }
        }
        return matrix
    }

    // Create an identity matrix
    public static identity(): Mat4 {
        const matrix = new Mat4()
        matrix.matrix[0] = 1
        matrix.matrix[5] = 1
        matrix.matrix[10] = 1
        matrix.matrix[15] = 1
        return matrix
    }

    // Create a matrix based on the result of the multiplication of two matrices, b x a
    public static multiply(b: Mat4, a: Mat4) {
        let a00 = a.get()[0 * 4 + 0]
        let a01 = a.get()[0 * 4 + 1]
        let a02 = a.get()[0 * 4 + 2]
        let a03 = a.get()[0 * 4 + 3]
        let a10 = a.get()[1 * 4 + 0]
        let a11 = a.get()[1 * 4 + 1]
        let a12 = a.get()[1 * 4 + 2]
        let a13 = a.get()[1 * 4 + 3]
        let a20 = a.get()[2 * 4 + 0]
        let a21 = a.get()[2 * 4 + 1]
        let a22 = a.get()[2 * 4 + 2]
        let a23 = a.get()[2 * 4 + 3]
        let a30 = a.get()[3 * 4 + 0]
        let a31 = a.get()[3 * 4 + 1]
        let a32 = a.get()[3 * 4 + 2]
        let a33 = a.get()[3 * 4 + 3]
        let b00 = b.get()[0 * 4 + 0]
        let b01 = b.get()[0 * 4 + 1]
        let b02 = b.get()[0 * 4 + 2]
        let b03 = b.get()[0 * 4 + 3]
        let b10 = b.get()[1 * 4 + 0]
        let b11 = b.get()[1 * 4 + 1]
        let b12 = b.get()[1 * 4 + 2]
        let b13 = b.get()[1 * 4 + 3]
        let b20 = b.get()[2 * 4 + 0]
        let b21 = b.get()[2 * 4 + 1]
        let b22 = b.get()[2 * 4 + 2]
        let b23 = b.get()[2 * 4 + 3]
        let b30 = b.get()[3 * 4 + 0]
        let b31 = b.get()[3 * 4 + 1]
        let b32 = b.get()[3 * 4 + 2]
        let b33 = b.get()[3 * 4 + 3]
        return [
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ]
    }

    // Multiply the matrix with matrix m
    public multiply(m: Mat4) {
        this.matrix = Mat4.multiply(this, m)
    }

    // Inverse the matrix and return a new matrix
    public inverse(): Mat4 {
        let a00 = this.get()[0 * 4 + 0]
        let a01 = this.get()[0 * 4 + 1]
        let a02 = this.get()[0 * 4 + 2]
        let a03 = this.get()[0 * 4 + 3]
        let a10 = this.get()[1 * 4 + 0]
        let a11 = this.get()[1 * 4 + 1]
        let a12 = this.get()[1 * 4 + 2]
        let a13 = this.get()[1 * 4 + 3]
        let a20 = this.get()[2 * 4 + 0]
        let a21 = this.get()[2 * 4 + 1]
        let a22 = this.get()[2 * 4 + 2]
        let a23 = this.get()[2 * 4 + 3]
        let a30 = this.get()[3 * 4 + 0]
        let a31 = this.get()[3 * 4 + 1]
        let a32 = this.get()[3 * 4 + 2]
        let a33 = this.get()[3 * 4 + 3]
        let b00 = a00 * a11 - a01 * a10
        let b01 = a00 * a12 - a02 * a10
        let b02 = a00 * a13 - a03 * a10
        let b03 = a01 * a12 - a02 * a11
        let b04 = a01 * a13 - a03 * a11
        let b05 = a02 * a13 - a03 * a12
        let b06 = a20 * a31 - a21 * a30
        let b07 = a20 * a32 - a22 * a30
        let b08 = a20 * a33 - a23 * a30
        let b09 = a21 * a32 - a22 * a31
        let b10 = a21 * a33 - a23 * a31
        let b11 = a22 * a33 - a23 * a32
        // Calculate the determinant
        let det =
            b00 * b11 -
            b01 * b10 +
            b02 * b09 +
            b03 * b08 -
            b04 * b07 +
            b05 * b06
        if (det === 0) {
            return new Mat4()
        }
        det = 1.0 / det
        return new Mat4([
            (a11 * b11 - a12 * b10 + a13 * b09) * det,
            (a02 * b10 - a01 * b11 - a03 * b09) * det,
            (a31 * b05 - a32 * b04 + a33 * b03) * det,
            (a22 * b04 - a21 * b05 - a23 * b03) * det,
            (a12 * b08 - a10 * b11 - a13 * b07) * det,
            (a00 * b11 - a02 * b08 + a03 * b07) * det,
            (a32 * b02 - a30 * b05 - a33 * b01) * det,
            (a20 * b05 - a22 * b02 + a23 * b01) * det,
            (a10 * b10 - a11 * b08 + a13 * b06) * det,
            (a01 * b08 - a00 * b10 - a03 * b06) * det,
            (a30 * b04 - a31 * b02 + a33 * b00) * det,
            (a21 * b02 - a20 * b04 - a23 * b00) * det,
            (a11 * b07 - a10 * b09 - a12 * b06) * det,
            (a00 * b09 - a01 * b07 + a02 * b06) * det,
            (a31 * b01 - a30 * b03 - a32 * b00) * det,
            (a20 * b03 - a21 * b01 + a22 * b00) * det,
        ])
    }

    // Rotation, angle in radian
    private rotateXMatrix(angle: number): Mat4 {
        let c = Math.cos(angle)
        let s = Math.sin(angle)
        return new Mat4([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1])
    }

    private rotateYMatrix(angle: number): Mat4 {
        let c = Math.cos(angle)
        let s = Math.sin(angle)
        return new Mat4([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1])
    }

    private rotateZMatrix(angle: number): Mat4 {
        let c = Math.cos(angle)
        let s = Math.sin(angle)
        return new Mat4([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    }

    public rotate(angleX: number, angleY: number, angleZ: number): Mat4 {
        let rx = this.rotateXMatrix(angleX)
        let ry = this.rotateYMatrix(angleY)
        let rz = this.rotateZMatrix(angleZ)
        ry.multiply(rz)
        rx.multiply(ry)
        this.matrix = rx.matrix
        return rx
    }

    // Translate
    public translate(tx: number, ty: number, tz: number): Mat4 {
        let matrix = new Mat4([
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            tx,
            ty,
            tz,
            1,
        ])
        this.multiply(matrix)
        return this
    }

    // Scale
    public scale(sx: number, sy: number, sz: number): Mat4 {
        let matrix = new Mat4([
            sx,
            0,
            0,
            0,
            0,
            sy,
            0,
            0,
            0,
            0,
            sz,
            0,
            0,
            0,
            0,
            1,
        ])
        this.multiply(matrix)
        return this
    }

    // Perspective
    public static perspective(
        angle: number,
        a: number,
        zMin: number,
        zMax: number
    ): Mat4 {
        let ang = Math.tan((angle * 0.5 * Math.PI) / 180)
        return new Mat4([
            0.5 / ang,
            0,
            0,
            0,
            0,
            (0.5 * a) / ang,
            0,
            0,
            0,
            0,
            -(zMax + zMin) / (zMax - zMin),
            -1,
            0,
            0,
            (-2 * zMax * zMin) / (zMax - zMin),
            0,
        ])
    }

    // Oblique
    public static oblique(): Mat4 {
        return new Mat4([
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            Math.cos((64 / 180) * Math.PI) / 2,
            Math.cos((64 / 180) * Math.PI) / 2,
            1,
            0,
            0,
            0,
            0,
            1,
        ])
    }

    // Orthographic
    public static orthographic(aspectRatio: number) {
        const far = 100
        const near = -far
        const top = aspectRatio
        const right = aspectRatio
        const left = -right
        const bottom = -top

        const orthMatrix = [
            2 / (right - left),
            0,
            0,
            0,
            0,
            2 / (top - bottom),
            0,
            0,
            0,
            0,
            -2 / (far - near),
            0,
            0,
            0,
            0,
            1,
        ]

        return new Mat4(orthMatrix)
    }
}
