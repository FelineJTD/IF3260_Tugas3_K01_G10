import { Model } from '../types/Model'
import { TEXTURE } from '../types/Texture'

export const ArticulatedCube: Model = {
    num_components: 1,
    components: [
        {
            num_vertices: 8,
            vertices: [
                [100, 100, 100],
                [-100, 100, 100],
                [-100, -100, 100],
                [100, -100, 100],
                [100, 100, -100],
                [-100, 100, -100],
                [-100, -100, -100],
                [100, -100, -100],
            ],
            num_faces: 6,
            faces: [
                [0, 1, 2, 3],
                [5, 4, 7, 6],
                [4, 0, 3, 7],
                [1, 5, 6, 2],
                [0, 4, 5, 1],
                [2, 6, 7, 3],
            ],
            colors: [
                [255, 0, 0, 255],
                [255, 0, 0, 255],
                [255, 0, 0, 255],
                [255, 0, 0, 255],
                [255, 0, 0, 255],
                [255, 0, 0, 255],
            ],
        },
    ],
    name: 'Badan',
    texture: TEXTURE.NONE,
    translationObj: [0, 0, 0],
    rotationObj: [0, 0, 0],
    scaleObj: [1, 1, 0.6],
    translationChild: [0, 0, 0],
    rotationChild: [0, 0, 0],
    scaleChild: [1, 1, 1],
    children: [
        {
            num_components: 1,
            components: [
                {
                    num_vertices: 8,
                    vertices: [
                        [100, 100, 100],
                        [-100, 100, 100],
                        [-100, -100, 100],
                        [100, -100, 100],
                        [100, 100, -100],
                        [-100, 100, -100],
                        [-100, -100, -100],
                        [100, -100, -100],
                    ],
                    num_faces: 6,
                    faces: [
                        [0, 1, 2, 3],
                        [5, 4, 7, 6],
                        [4, 0, 3, 7],
                        [1, 5, 6, 2],
                        [0, 4, 5, 1],
                        [2, 6, 7, 3],
                    ],
                    colors: [
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                    ],
                },
            ],
            name: 'Pala',
            texture: TEXTURE.NONE,
            translationObj: [0, 0, 0],
            rotationObj: [0, 0, 0],
            scaleObj: [0.5, 0.5, 0.5],
            translationChild: [0, 125, 0],
            rotationChild: [0, 0, 0],
            scaleChild: [1, 1, 1],
            children: [],
        },
        {
            num_components: 1,
            components: [
                {
                    num_vertices: 8,
                    vertices: [
                        [100, 100, 100],
                        [-100, 100, 100],
                        [-100, -100, 100],
                        [100, -100, 100],
                        [100, 100, -100],
                        [-100, 100, -100],
                        [-100, -100, -100],
                        [100, -100, -100],
                    ],
                    num_faces: 6,
                    faces: [
                        [0, 1, 2, 3],
                        [5, 4, 7, 6],
                        [4, 0, 3, 7],
                        [1, 5, 6, 2],
                        [0, 4, 5, 1],
                        [2, 6, 7, 3],
                    ],
                    colors: [
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                    ],
                },
            ],
            name: 'Kanan Atas',
            texture: TEXTURE.NONE,
            translationObj: [0, 0, 0],
            rotationObj: [0, 0, 0],
            scaleObj: [0.3, 0.6, 0.3],
            translationChild: [130, 50, 0],
            rotationChild: [0, 0, 0],
            scaleChild: [1, 1, 1],
            children: [
                {
                    num_components: 1,
                    components: [
                        {
                            num_vertices: 8,
                            vertices: [
                                [100, 100, 100],
                                [-100, 100, 100],
                                [-100, -100, 100],
                                [100, -100, 100],
                                [100, 100, -100],
                                [-100, 100, -100],
                                [-100, -100, -100],
                                [100, -100, -100],
                            ],
                            num_faces: 6,
                            faces: [
                                [0, 1, 2, 3],
                                [5, 4, 7, 6],
                                [4, 0, 3, 7],
                                [1, 5, 6, 2],
                                [0, 4, 5, 1],
                                [2, 6, 7, 3],
                            ],
                            colors: [
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                            ],
                        },
                    ],
                    name: 'Kanan Bawah',
                    texture: TEXTURE.NONE,
                    translationObj: [0, 0, 0],
                    rotationObj: [0, 0, 0],
                    scaleObj: [0.2, 0.8, 0.2],
                    translationChild: [0, -130, 0],
                    rotationChild: [0, 0, 0],
                    scaleChild: [1, 1, 1],
                    children: [],
                },
            ],
        },
        {
            num_components: 1,
            components: [
                {
                    num_vertices: 8,
                    vertices: [
                        [100, 100, 100],
                        [-100, 100, 100],
                        [-100, -100, 100],
                        [100, -100, 100],
                        [100, 100, -100],
                        [-100, 100, -100],
                        [-100, -100, -100],
                        [100, -100, -100],
                    ],
                    num_faces: 6,
                    faces: [
                        [0, 1, 2, 3],
                        [5, 4, 7, 6],
                        [4, 0, 3, 7],
                        [1, 5, 6, 2],
                        [0, 4, 5, 1],
                        [2, 6, 7, 3],
                    ],
                    colors: [
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                    ],
                },
            ],
            name: 'Kiri Atas',
            texture: TEXTURE.NONE,
            translationObj: [0, 0, 0],
            rotationObj: [0, 0, 0],
            scaleObj: [0.3, 0.6, 0.3],
            translationChild: [-130, 50, 0],
            rotationChild: [0, 0, 0],
            scaleChild: [1, 1, 1],
            children: [
                {
                    num_components: 1,
                    components: [
                        {
                            num_vertices: 8,
                            vertices: [
                                [100, 100, 100],
                                [-100, 100, 100],
                                [-100, -100, 100],
                                [100, -100, 100],
                                [100, 100, -100],
                                [-100, 100, -100],
                                [-100, -100, -100],
                                [100, -100, -100],
                            ],
                            num_faces: 6,
                            faces: [
                                [0, 1, 2, 3],
                                [5, 4, 7, 6],
                                [4, 0, 3, 7],
                                [1, 5, 6, 2],
                                [0, 4, 5, 1],
                                [2, 6, 7, 3],
                            ],
                            colors: [
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                                [255, 0, 0, 255],
                            ],
                        },
                    ],
                    name: 'Kiri Bawah',
                    texture: TEXTURE.NONE,
                    translationObj: [0, 0, 0],
                    rotationObj: [0, 0, 0],
                    scaleObj: [0.2, 0.8, 0.2],
                    translationChild: [0, -130, 0],
                    rotationChild: [0, 0, 0],
                    scaleChild: [1, 1, 1],
                    children: [],
                },
            ],
        },
        {
            num_components: 1,
            components: [
                {
                    num_vertices: 8,
                    vertices: [
                        [100, 100, 100],
                        [-100, 100, 100],
                        [-100, -100, 100],
                        [100, -100, 100],
                        [100, 100, -100],
                        [-100, 100, -100],
                        [-100, -100, -100],
                        [100, -100, -100],
                    ],
                    num_faces: 6,
                    faces: [
                        [0, 1, 2, 3],
                        [5, 4, 7, 6],
                        [4, 0, 3, 7],
                        [1, 5, 6, 2],
                        [0, 4, 5, 1],
                        [2, 6, 7, 3],
                    ],
                    colors: [
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                    ],
                },
            ],
            name: 'Kaki kanan',
            texture: TEXTURE.NONE,
            translationObj: [0, 0, 0],
            rotationObj: [0, 0, 0],
            scaleObj: [0.4, 1, 0.4],
            translationChild: [50, -150, 0],
            rotationChild: [0, 0, 0],
            scaleChild: [1, 1, 1],
            children: [],
        },
        {
            num_components: 1,
            components: [
                {
                    num_vertices: 8,
                    vertices: [
                        [100, 100, 100],
                        [-100, 100, 100],
                        [-100, -100, 100],
                        [100, -100, 100],
                        [100, 100, -100],
                        [-100, 100, -100],
                        [-100, -100, -100],
                        [100, -100, -100],
                    ],
                    num_faces: 6,
                    faces: [
                        [0, 1, 2, 3],
                        [5, 4, 7, 6],
                        [4, 0, 3, 7],
                        [1, 5, 6, 2],
                        [0, 4, 5, 1],
                        [2, 6, 7, 3],
                    ],
                    colors: [
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                        [255, 0, 0, 255],
                    ],
                },
            ],
            name: 'Kaki kiri',
            texture: TEXTURE.NONE,
            translationObj: [0, 0, 0],
            rotationObj: [0, 0, 0],
            scaleObj: [0.4, 1, 0.4],
            translationChild: [-50, -150, 0],
            rotationChild: [0, 0, 0],
            scaleChild: [1, 1, 1],
            children: [],
        },
    ],
}
