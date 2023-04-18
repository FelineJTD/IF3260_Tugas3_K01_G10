import { cross, normalize, subtractVectors } from "."

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
        this.matrix = Mat4.multiply(m, this)
    }

    // Inverse the matrix and return a new matrix
    public inverse(): Mat4 {
        let m00 = this.matrix[0 * 4 + 0];
        let m01 = this.matrix[0 * 4 + 1];
        let m02 = this.matrix[0 * 4 + 2];
        let m03 = this.matrix[0 * 4 + 3];
        let m10 = this.matrix[1 * 4 + 0];
        let m11 = this.matrix[1 * 4 + 1];
        let m12 = this.matrix[1 * 4 + 2];
        let m13 = this.matrix[1 * 4 + 3];
        let m20 = this.matrix[2 * 4 + 0];
        let m21 = this.matrix[2 * 4 + 1];
        let m22 = this.matrix[2 * 4 + 2];
        let m23 = this.matrix[2 * 4 + 3];
        let m30 = this.matrix[3 * 4 + 0];
        let m31 = this.matrix[3 * 4 + 1];
        let m32 = this.matrix[3 * 4 + 2];
        let m33 = this.matrix[3 * 4 + 3];
        let tmp_0  = m22 * m33;
        let tmp_1  = m32 * m23;
        let tmp_2  = m12 * m33;
        let tmp_3  = m32 * m13;
        let tmp_4  = m12 * m23;
        let tmp_5  = m22 * m13;
        let tmp_6  = m02 * m33;
        let tmp_7  = m32 * m03;
        let tmp_8  = m02 * m23;
        let tmp_9  = m22 * m03;
        let tmp_10 = m02 * m13;
        let tmp_11 = m12 * m03;
        let tmp_12 = m20 * m31;
        let tmp_13 = m30 * m21;
        let tmp_14 = m10 * m31;
        let tmp_15 = m30 * m11;
        let tmp_16 = m10 * m21;
        let tmp_17 = m20 * m11;
        let tmp_18 = m00 * m31;
        let tmp_19 = m30 * m01;
        let tmp_20 = m00 * m21;
        let tmp_21 = m20 * m01;
        let tmp_22 = m00 * m11;
        let tmp_23 = m10 * m01;

        let t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        let t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        let t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        let t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        let d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        this.set([
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
                    (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
            d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
                    (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
            d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
                    (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
            d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
                    (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
            d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
                    (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
            d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
                    (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
            d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
                    (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
            d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
                    (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
            d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
                    (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
            d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
                    (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
            d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
                    (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
            d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
                    (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
        ]);
        return this;

    }

    // Rotation, angle in radian
    private rotateXMatrix(angle: number): Mat4 {
        let c = Math.cos(angle)
        let s = Math.sin(angle)
        let matrix = new Mat4([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1])
        this.multiply(matrix)
        return this
    }

    private rotateYMatrix(angle: number): Mat4 {
        let c = Math.cos(angle)
        let s = Math.sin(angle)
        let matrix = new Mat4([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1])
        this.multiply(matrix)
        return this
    }

    private rotateZMatrix(angle: number): Mat4 {
        let c = Math.cos(angle)
        let s = Math.sin(angle)
        let matrix = new Mat4([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        this.multiply(matrix)
        return this
    }

    public rotate(angleX: number, angleY: number, angleZ: number): Mat4 {
        let matrix = new Mat4()
        matrix.rotateXMatrix(angleX)
        matrix.rotateYMatrix(angleY)
        matrix.rotateZMatrix(angleZ)
        
        this.multiply(matrix)
        return this
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

    public static lookAt(cameraPosition: number[], target: number[], up: number[]): Mat4 {
        let zAxis = normalize(
            subtractVectors(cameraPosition, target));
        let xAxis = normalize(cross(up, zAxis));
        let yAxis = normalize(cross(zAxis, xAxis));
    
        return new Mat4([
            xAxis[0], xAxis[1], xAxis[2], 0,
            yAxis[0], yAxis[1], yAxis[2], 0,
            zAxis[0], zAxis[1], zAxis[2], 0,
            cameraPosition[0],
            cameraPosition[1],
            cameraPosition[2],
            1,
          ])
    }

    public static projection(width: number, height: number, depth: number): Mat4 {
        return new Mat4([
            2 / width,
            0,
            0,
            0,
            0,
            -2 / height,
            0,
            0,
            0,
            0,
            2 / depth,
            0,
            -1,
            1,
            0,
            1,
        ])
    }
}
