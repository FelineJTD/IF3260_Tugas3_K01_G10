import { Cube } from '../ModelObjects/Cube'
import { PROJECTION } from '../types'
import { ProgramState } from '../types/ProgramState'
import { hexToRGBColor, rgbToHexColor } from '../utils'

export class ControllerUI {
    static state: ProgramState
    constructor(state: ProgramState) {
        ControllerUI.state = state
    }

    public static updateRotationUI(document: any) {
        document.getElementById('rotationX').value = Math.round(
            this.state.transform.rotation.x
        )
        document.getElementById('rotationX').nextElementSibling.value =
            Math.round(this.state.transform.rotation.x)
        document.getElementById('rotationY').value = Math.round(
            this.state.transform.rotation.y
        )
        document.getElementById('rotationY').nextElementSibling.value =
            Math.round(this.state.transform.rotation.y)
        document.getElementById('rotationZ').value = Math.round(
            this.state.transform.rotation.z
        )
        document.getElementById('rotationZ').nextElementSibling.value =
            Math.round(this.state.transform.rotation.z)
    }

    public static updateUI(document: any) {
        document.getElementById('cylinder').checked = this.state.models[0]
        document.getElementById('cube').checked = this.state.models[1]
        document.getElementById('triangles').checked = this.state.models[2]

        document.getElementById('color').value = rgbToHexColor(this.state.color)

        if (this.state.projection == PROJECTION.ORTHOGONAL)
            document.getElementById('orth').checked = true
        if (this.state.projection == PROJECTION.OBLIQUE)
            document.getElementById('obliq').checked = true
        if (this.state.projection == PROJECTION.PERSPECTIVE)
            document.getElementById('persp').checked = true

        this.updateRotationUI(document)

        document.getElementById('translationX').value =
            this.state.transform.translation.x
        document.getElementById('translationX').nextElementSibling.value =
            this.state.transform.translation.x
        document.getElementById('translationY').value =
            this.state.transform.translation.y
        document.getElementById('translationY').nextElementSibling.value =
            this.state.transform.translation.y
        document.getElementById('translationZ').value =
            this.state.transform.translation.z
        document.getElementById('translationZ').nextElementSibling.value =
            this.state.transform.translation.z

        document.getElementById('scalingX').value = this.state.transform.scale.x
        document.getElementById('scalingX').nextElementSibling.value =
            this.state.transform.scale.x
        document.getElementById('scalingY').value = this.state.transform.scale.y
        document.getElementById('scalingY').nextElementSibling.value =
            this.state.transform.scale.y
        document.getElementById('scalingZ').value = this.state.transform.scale.z
        document.getElementById('scalingZ').nextElementSibling.value =
            this.state.transform.scale.z

        document.getElementById('cameraRadius').value = this.state.view.radius
        document.getElementById('cameraRadius').nextElementSibling.innerHTML =
            this.state.view.radius.toFixed(3)

        document.getElementById('cameraAngle').value = this.state.view.rotation
        document.getElementById('cameraAngle').nextElementSibling.innerHTML =
            this.state.view.rotation.toFixed(3)

        document.getElementById('isShadingOn').checked = this.state.enableShader
        document.getElementById('isAnimationOn').checked =
            this.state.enableAnimation
    }

    public static setDefaultState() {
        this.state = {
            mousedown: false,
            model: Cube,
            models: [false, true, false],

            color: [1, 1, 1],

            projection: PROJECTION.ORTHOGONAL,

            transform: {
                scale: {
                    x: 1,
                    y: 1,
                    z: 1,
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                translation: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            },

            view: {
                rotation: 180,
                radius: 0.5,
            },

            enableShader: true,
            enableAnimation: true,
        }

        this.updateUI(document)
    }

    public static setListeners(document: any) {
        document.getElementById('reset').addEventListener('click', () => {
            this.setDefaultState()
        })

        // document.getElementById("cylinder").oninput = () => {
        //     state.models[0] = document.getElementById("cylinder").checked;
        //     if (!state.models.includes(true)) {
        //         state.models[0] = true;
        //         document.getElementById("cylinder").checked = true;
        //     }
        //     updateModel();
        // };

        // document.getElementById("cube").oninput = () => {
        //     state.models[1] = document.getElementById("cube").checked;
        //     if (!state.models.includes(true)) {
        //         state.models[0] = true;
        //         document.getElementById("cylinder").checked = true;
        //     }
        //     updateModel();
        // };

        // document.getElementById("triangles").oninput = () => {
        //     state.models[2] = document.getElementById("triangles").checked;
        //     if (!state.models.includes(true)) {
        //         state.models[0] = true;
        //         document.getElementById("cylinder").checked = true;
        //     }
        //     updateModel();
        // };

        document.getElementById('orth').onclick = () => {
            this.state.projection = PROJECTION.ORTHOGONAL
        }

        document.getElementById('obliq').onclick = () => {
            this.state.projection = PROJECTION.OBLIQUE
        }

        document.getElementById('persp').onclick = () => {
            this.state.projection = PROJECTION.PERSPECTIVE
        }

        document
            .getElementById('rotationX')
            .addEventListener('input', (event: any) => {
                this.state.transform.rotation.x = Math.round(event.target.value)
            })

        document
            .getElementById('rotationY')
            .addEventListener('input', (event: any) => {
                this.state.transform.rotation.y = Math.round(event.target.value)
            })

        document
            .getElementById('rotationZ')
            .addEventListener('input', (event: any) => {
                this.state.transform.rotation.z = Math.round(event.target.value)
            })

        document
            .getElementById('translationX')
            .addEventListener('input', (event: any) => {
                this.state.transform.translation.x = event.target.value
            })

        document
            .getElementById('translationY')
            .addEventListener('input', (event: any) => {
                this.state.transform.translation.y = event.target.value
            })

        document
            .getElementById('translationZ')
            .addEventListener('input', (event: any) => {
                this.state.transform.translation.z = event.target.value
            })

        document
            .getElementById('scalingX')
            .addEventListener('input', (event: any) => {
                this.state.transform.scale.x = event.target.value
            })

        document
            .getElementById('scalingY')
            .addEventListener('input', (event: any) => {
                this.state.transform.scale.y = event.target.value
            })

        document
            .getElementById('scalingZ')
            .addEventListener('input', (event: any) => {
                this.state.transform.scale.z = event.target.value
            })

        document
            .getElementById('cameraRadius')
            .addEventListener('input', (event: any) => {
                this.state.view.radius = Number(event.target.value)
            })

        document
            .getElementById('cameraAngle')
            .addEventListener('input', (event: any) => {
                this.state.view.rotation = Number(event.target.value)
            })

        document
            .getElementById('isShadingOn')
            .addEventListener('change', (event: any) => {
                this.state.enableShader = event.target.checked
            })

        document
            .getElementById('isAnimationOn')
            .addEventListener('change', (event: any) => {
                this.state.enableAnimation = event.target.checked
            })

        document
            .getElementById('canvas')
            .addEventListener('wheel', (event: any) => {
                this.state.view.radius = Math.max(
                    0,
                    Math.min(1, this.state.view.radius + event.deltaY / 1000)
                )
                document.getElementById('cameraRadius').value =
                    this.state.view.radius
                document.getElementById(
                    'cameraRadius'
                ).nextElementSibling.innerHTML =
                    this.state.view.radius.toFixed(3)
            })

        document
            .getElementById('canvas')
            .addEventListener('mousedown', (event: any) => {
                this.state.mousedown = true
            })

        document
            .getElementById('canvas')
            .addEventListener('mouseup', (event: any) => {
                this.state.mousedown = false
            })

        document
            .getElementById('canvas')
            .addEventListener('mousemove', (event: any) => {
                if (this.state.mousedown) {
                    this.state.transform.rotation.x = Math.round(
                        this.state.transform.rotation.x - event.movementY
                    )
                    this.state.transform.rotation.y = Math.round(
                        this.state.transform.rotation.y - event.movementX
                    )
                    this.updateRotationUI(document)
                }
            })

        document.getElementById('color').oninput = (event: any) => {
            this.state.color = hexToRGBColor(event.target.value)
            // this.state.model.updateColor(this.state.color);
        }
    }

    public static startAnimation(
        document: any,
        time_difference: number,
        rot_x: number,
        rot_y: number,
        rot_z: number
    ) {
        this.state.transform.rotation.x =
            this.state.transform.rotation.x > 180
                ? -180 + time_difference * rot_x
                : this.state.transform.rotation.x + time_difference * rot_x
        this.state.transform.rotation.y =
            this.state.transform.rotation.y > 180
                ? -180 + time_difference * rot_y
                : this.state.transform.rotation.y + time_difference * rot_y
        this.state.transform.rotation.z =
            this.state.transform.rotation.z > 180
                ? -180 + time_difference * rot_z
                : this.state.transform.rotation.z + time_difference * rot_z

        document.getElementById('rotationX').nextElementSibling.value =
            Math.round(this.state.transform.rotation.x)
        document.getElementById('rotationY').nextElementSibling.value =
            Math.round(this.state.transform.rotation.y)
        document.getElementById('rotationZ').nextElementSibling.value =
            Math.round(this.state.transform.rotation.z)

        document.getElementById('rotationX').value = Math.round(
            this.state.transform.rotation.x
        )
        document.getElementById('rotationY').value = Math.round(
            this.state.transform.rotation.y
        )
        document.getElementById('rotationZ').value = Math.round(
            this.state.transform.rotation.z
        )
    }
}
