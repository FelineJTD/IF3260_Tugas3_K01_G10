import { PROJECTION, ProgramState } from "../types";
import { hexToRGBColor, rgbToHexColor } from "../utils";

export class ControllerUI{
    static state: ProgramState
    static document: any;

    constructor(state: ProgramState, document: Document){
        ControllerUI.state = state
        ControllerUI.document = document
    }

    public static updateRotationUI() {
        this.document.getElementById("rotationX").value = Math.round(this.state.transform.rotation.x);
        this.document.getElementById("rotationX").nextElementSibling.value = Math.round(this.state.transform.rotation.x);
        this.document.getElementById("rotationY").value = Math.round(this.state.transform.rotation.y);
        this.document.getElementById("rotationY").nextElementSibling.value = Math.round(this.state.transform.rotation.y);
        this.document.getElementById("rotationZ").value = Math.round(this.state.transform.rotation.z);
        this.document.getElementById("rotationZ").nextElementSibling.value = Math.round(this.state.transform.rotation.z);
    }
    
    public static updateUI() {
        this.document.getElementById("cylinder").checked = this.state.models[0];
        this.document.getElementById("cube").checked = this.state.models[1];
        this.document.getElementById("triangles").checked = this.state.models[2];
    
        this.document.getElementById("color").value = rgbToHexColor(this.state.color);
    
        if (this.state.projection == PROJECTION.ORTHOGONAL) this.document.getElementById("orth").checked = true;
        if (this.state.projection == PROJECTION.OBLIQUE) this.document.getElementById("obliq").checked = true;
        if (this.state.projection == PROJECTION.PERSPECTIVE) this.document.getElementById("persp").checked = true;
    
        this.updateRotationUI();
    
        this.document.getElementById("translationX").value = this.state.transform.translation.x;
        this.document.getElementById("translationX").nextElementSibling.value = this.state.transform.translation.x;
        this.document.getElementById("translationY").value = this.state.transform.translation.y;
        this.document.getElementById("translationY").nextElementSibling.value = this.state.transform.translation.y;
        this.document.getElementById("translationZ").value = this.state.transform.translation.z;
        this.document.getElementById("translationZ").nextElementSibling.value = this.state.transform.translation.z;
    
        this.document.getElementById("scalingX").value = this.state.transform.scale.x;
        this.document.getElementById("scalingX").nextElementSibling.value = this.state.transform.scale.x;
        this.document.getElementById("scalingY").value = this.state.transform.scale.y;
        this.document.getElementById("scalingY").nextElementSibling.value = this.state.transform.scale.y;
        this.document.getElementById("scalingZ").value = this.state.transform.scale.z;
        this.document.getElementById("scalingZ").nextElementSibling.value = this.state.transform.scale.z;
    
        this.document.getElementById("cameraRadius").value = this.state.view.radius;
        this.document.getElementById("cameraRadius").nextElementSibling.innerHTML = this.state.view.radius.toFixed(3);
    
        this.document.getElementById("cameraAngle").value = this.state.view.rotation;
        this.document.getElementById("cameraAngle").nextElementSibling.innerHTML = this.state.view.rotation.toFixed(3);
    
        this.document.getElementById("isShadingOn").checked = this.state.enableShader;
        this.document.getElementById("isAnimationOn").checked = this.state.enableAnimation;
    }

    public static setDefaultState() {
        this.state = {
            mousedown: false,
            model: {},
            models: [false, true, false],
    
            color: [1, 1, 1],
    
            projection: PROJECTION.ORTHOGONAL,
    
            transform: {
                scale: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                translation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            },
    
            view: {
                rotation: 180,
                radius: 0.5
            },
    
            enableShader: true,
            enableAnimation: true,
        }
    
        this.updateUI();
    }

    public static setListeners() {
        this.document.getElementById("reset").addEventListener("click", () => {
            this.setDefaultState();
        });
    
        // this.document.getElementById("cylinder").oninput = () => {
        //     state.models[0] = this.document.getElementById("cylinder").checked;
        //     if (!state.models.includes(true)) {
        //         state.models[0] = true;
        //         this.document.getElementById("cylinder").checked = true;
        //     }
        //     updateModel();
        // };
    
        // this.document.getElementById("cube").oninput = () => {
        //     state.models[1] = this.document.getElementById("cube").checked;
        //     if (!state.models.includes(true)) {
        //         state.models[0] = true;
        //         this.document.getElementById("cylinder").checked = true;
        //     }
        //     updateModel();
        // };
    
        // this.document.getElementById("triangles").oninput = () => {
        //     state.models[2] = this.document.getElementById("triangles").checked;
        //     if (!state.models.includes(true)) {
        //         state.models[0] = true;
        //         this.document.getElementById("cylinder").checked = true;
        //     }
        //     updateModel();
        // };
    
        this.document.getElementById("orth").onclick = () => {
            this.state.projection = PROJECTION.ORTHOGONAL;
        };
    
        this.document.getElementById("obliq").onclick = () => {
            this.state.projection = PROJECTION.OBLIQUE;
        };
    
        this.document.getElementById("persp").onclick = () => {
            this.state.projection = PROJECTION.PERSPECTIVE;
        };
    
        this.document.getElementById("rotationX").addEventListener("input", (event: any) => {
            this.state.transform.rotation.x = Math.round(event.target.value);
        });
    
        this.document.getElementById("rotationY").addEventListener("input", (event: any) => {
            this.state.transform.rotation.y = Math.round(event.target.value);
        });
    
        this.document.getElementById("rotationZ").addEventListener("input", (event: any) => {
            this.state.transform.rotation.z = Math.round(event.target.value);
        });
    
        this.document.getElementById("translationX").addEventListener("input", (event: any) => {
            this.state.transform.translation.x = event.target.value;
        });
    
        this.document.getElementById("translationY").addEventListener("input", (event: any) => {
            this.state.transform.translation.y = event.target.value;
        });
    
        this.document.getElementById("translationZ").addEventListener("input", (event: any) => {
            this.state.transform.translation.z = event.target.value;
        });
    
        this.document.getElementById("scalingX").addEventListener("input", (event: any) => {
            this.state.transform.scale.x = event.target.value;
        });
    
        this.document.getElementById("scalingY").addEventListener("input", (event: any) => {
            this.state.transform.scale.y = event.target.value;
        });
    
        this.document.getElementById("scalingZ").addEventListener("input", (event: any) => {
            this.state.transform.scale.z = event.target.value;
        });
    
        this.document.getElementById("cameraRadius").addEventListener("input", (event: any) => {
            this.state.view.radius = Number(event.target.value);
        });
    
        this.document.getElementById("cameraAngle").addEventListener("input", (event: any) => {
            this.state.view.rotation = Number(event.target.value);
        });
    
        this.document.getElementById("isShadingOn").addEventListener("change", (event: any) => {
            this.state.enableShader = event.target.checked;
        });
    
        this.document.getElementById("isAnimationOn").addEventListener("change", (event: any) => {
            this.state.enableAnimation = event.target.checked;
        });
    
        this.document.getElementById("canvas").addEventListener("wheel", (event: any) => {
            this.state.view.radius = Math.max(0, Math.min(1, this.state.view.radius + event.deltaY / 1000));
            this.document.getElementById("cameraRadius").value = this.state.view.radius;
            this.document.getElementById("cameraRadius").nextElementSibling.innerHTML = this.state.view.radius.toFixed(3);
        });
    
        this.document.getElementById("canvas").addEventListener("mousedown", (event: any) => {
            this.state.mousedown = true;
        });
    
        this.document.getElementById("canvas").addEventListener("mouseup", (event: any) => {
            this.state.mousedown = false;
        });
    
        this.document.getElementById("canvas").addEventListener("mousemove", (event: any) => {
            if (this.state.mousedown) {
                this.state.transform.rotation.x = Math.round(this.state.transform.rotation.x - event.movementY);
                this.state.transform.rotation.y = Math.round(this.state.transform.rotation.y - event.movementX);
                this.updateRotationUI();
            }
        });
    
        this.document.getElementById("color").oninput = (event: any) => {
            this.state.color = hexToRGBColor(event.target.value);
            // this.state.model.updateColor(this.state.color);
        };
    }
}