let state;

function updateRotationUI() {
    document.getElementById("rotationX").value = Math.round(state.transform.rotation.x);
    document.getElementById("rotationX").nextElementSibling.value = Math.round(state.transform.rotation.x);
    document.getElementById("rotationY").value = Math.round(state.transform.rotation.y);
    document.getElementById("rotationY").nextElementSibling.value = Math.round(state.transform.rotation.y);
    document.getElementById("rotationZ").value = Math.round(state.transform.rotation.z);
    document.getElementById("rotationZ").nextElementSibling.value = Math.round(state.transform.rotation.z);
}

function updateUI() {
    document.getElementById("dog").checked = true;

    document.getElementById("color").value = rgbToHexColor(state.color);

    if (state.projection == "orth") document.getElementById("orth").checked = true;
    if (state.projection == "obliq") document.getElementById("obliq").checked = true;
    if (state.projection == "persp") document.getElementById("persp").checked = true;

    updateRotationUI();

    document.getElementById("translationX").value = state.transform.translation.x;
    document.getElementById("translationX").nextElementSibling.value = state.transform.translation.x;
    document.getElementById("translationY").value = state.transform.translation.y;
    document.getElementById("translationY").nextElementSibling.value = state.transform.translation.y;
    document.getElementById("translationZ").value = state.transform.translation.z;
    document.getElementById("translationZ").nextElementSibling.value = state.transform.translation.z;

    document.getElementById("scalingX").value = state.transform.scale.x;
    document.getElementById("scalingX").nextElementSibling.value = state.transform.scale.x;
    document.getElementById("scalingY").value = state.transform.scale.y;
    document.getElementById("scalingY").nextElementSibling.value = state.transform.scale.y;
    document.getElementById("scalingZ").value = state.transform.scale.z;
    document.getElementById("scalingZ").nextElementSibling.value = state.transform.scale.z;

    document.getElementById("cameraRadius").value = state.view.radius;
    document.getElementById("cameraRadius").nextElementSibling.innerHTML = state.view.radius.toFixed(3);

    document.getElementById("cameraAngle").value = state.view.rotation;
    document.getElementById("cameraAngle").nextElementSibling.innerHTML = state.view.rotation.toFixed(3);

    document.getElementById("isShadingOn").checked = state.enableShader;
    document.getElementById("isAnimationOn").checked = state.enableAnimation;

    updateComponentsUI();
}

function setDefaultState() {
    state = {
        model: Dog(),
        selectedNode: 0,
        mousedown: false,

        color: [1, 1, 1],

        projection: "orth",

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
        // enableAnimation: true,
    }

    // state.model.appendChild(Block("block 1", {r: 0.5, g: 1, b: 1}, 1, 1, 1, {x: 0, y: 0.2, z: 0}));
    // state.model.children[0].transform = 
    //     {
    //         scale: {
    //             x: 1,
    //             y: 1,
    //             z: 1
    //         },
    //         rotation: {
    //             x: 55,
    //             y: 23,
    //             z: 0
    //         },
    //         translation: {
    //             x: 0,
    //             y: 0,
    //             z: 0
    //         }
    //     }
    // state.model.appendChild(Block("block 2", {r: 1, g: 0.5, b: 1}, 1, 1, 0.5, {x: 0.1, y: 0.3, z: 0.1}));
    // state.model.children[0].appendChild(Block("block 3", {r: 1, g: 1, b: 0.5}, 1, 1, 3, {x: 0, y: 0.4, z: 0.1}));
    updateUI();
}

function addButton(innerHtml, model, indent, idx) {

    innerHtml += "<button class='component-button' style='margin-left: " + indent + "em' onclick='state.selectedNode = " + idx + "'>" + model.name + "</button>";
    console.log(idx);
    idx++;
    if (model.children) {
        model.children.forEach(child => {
            innerHtml += addButton("", child, indent + 1, idx);
        });
    }
    return innerHtml;
}

function updateComponentsUI() {
    const container = document.getElementById("components-container");
    container.innerHTML = "";
    // render button for each component and children recursively
    container.innerHTML += addButton(container.innerHTML, state.model, 0, 0);
}

function setListeners() {
    document.getElementById("reset").addEventListener("click", () => {
        setDefaultState();
    });

    document.getElementById("dog").oninput = () => {
        state.model = Dog();
    };

    document.getElementById("orth").onclick = () => {
        state.projection = "orth";
    };

    document.getElementById("obliq").onclick = () => {
        state.projection = "obliq";
    };

    document.getElementById("persp").onclick = () => {
        state.projection = "persp";
    };

    document.getElementById("rotationX").addEventListener("input", (event) => {
        // state.transform.rotation.x = Math.round(event.target.value);
        console.log(state.model.getSelectedModel(state.selectedNode));
        rotateModelX(state.model.getSelectedModel(state.selectedNode), Math.round(event.target.value));
        // else
        // {
        //     state.model.children[state.selectedNode - 1].transform.rotation.x = Math.round(event.target.value);
        // }
    });

    document.getElementById("rotationY").addEventListener("input", (event) => {
        // state.transform.rotation.y = Math.round(event.target.value);
        rotateModelY(state.model.getSelectedModel(state.selectedNode), Math.round(event.target.value));
    });

    document.getElementById("rotationZ").addEventListener("input", (event) => {
        // state.transform.rotation.z = Math.round(event.target.value);
        rotateModelZ(state.model.getSelectedModel(state.selectedNode), Math.round(event.target.value));
    });

    document.getElementById("translationX").addEventListener("input", (event) => {
        // state.transform.translation.x = event.target.value;
        translateModelX(state.model.getSelectedModel(state.selectedNode), event.target.value);
    });

    document.getElementById("translationY").addEventListener("input", (event) => {
        translateModelY(state.model.getSelectedModel(state.selectedNode), event.target.value);
    });

    document.getElementById("translationZ").addEventListener("input", (event) => {
        translateModelZ(state.model.getSelectedModel(state.selectedNode), event.target.value);
    });

    document.getElementById("scalingX").addEventListener("input", (event) => {
        scaleModelX(state.model.getSelectedModel(state.selectedNode), event.target.value);
    });

    document.getElementById("scalingY").addEventListener("input", (event) => {
        scaleModelY(state.model.getSelectedModel(state.selectedNode), event.target.value);
    });

    document.getElementById("scalingZ").addEventListener("input", (event) => {
        scaleModelZ(state.model.getSelectedModel(state.selectedNode), event.target.value);
    });

    document.getElementById("cameraRadius").addEventListener("input", (event) => {
        state.view.radius = Number(event.target.value);
    });

    document.getElementById("cameraAngle").addEventListener("input", (event) => {
        state.view.rotation = Number(event.target.value);
    });

    document.getElementById("isShadingOn").addEventListener("change", (event) => {
        state.enableShader = event.target.checked;
    });

    document.getElementById("isAnimationOn").addEventListener("change", (event) => {
        state.enableAnimation = event.target.checked;
    });

    document.getElementById("canvas").addEventListener("wheel", (event) => {
        state.view.radius = Math.max(0, Math.min(1, state.view.radius + event.deltaY / 1000));
        document.getElementById("cameraRadius").value = state.view.radius;
        document.getElementById("cameraRadius").nextElementSibling.innerHTML = state.view.radius.toFixed(3);
    });

    // document.getElementById("canvas").addEventListener("mousedown", (event) => {
    //     state.mousedown = true;
    // });

    // document.getElementById("canvas").addEventListener("mouseup", (event) => {
    //     state.mousedown = false;
    // });

    // document.getElementById("canvas").addEventListener("mousemove", (event) => {
    //     if (state.mousedown) {
    //         state.model.transform.rotation.x = Math.round(state.transform.rotation.x - event.movementY);
    //         state.model.transform.rotation.y = Math.round(state.transform.rotation.y - event.movementX);
    //         updateRotationUI();
    //     }
    // });

    document.getElementById("save").addEventListener("click", () => {
        save();
    });

    document.getElementById("load").oninput = (event) => {
        load(event.target.files[0]);
    };

    document.getElementById("color").oninput = (event) => {
        state.color = hexToRGBColor(event.target.value);
        state.model.updateColor(state.color);
    };
}

function load(file) {
    console.log("load");
    const reader = new FileReader();
    reader.readAsText(file,'UTF-8');
    reader.onload = readerEvent => {
        const content = readerEvent.target.result;
        const save = JSON.parse(content);
        state = save;
        state.model = new Model(state.model.name, state.model.vertices, state.model.indices, state.model.colors);
        updateUI();
    }
}

function save() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "save.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function setTransformMatrix(modelNode) {
    let Tmatrix;
    Tmatrix = scaleMatrix(
        modelNode.transform.scale.x, 
        modelNode.transform.scale.y, 
        modelNode.transform.scale.z);
    Tmatrix = multiply(rotateMatrix(
        modelNode.transform.rotation.x * Math.PI / 180, 
        modelNode.transform.rotation.y * Math.PI / 180, 
        modelNode.transform.rotation.z * Math.PI / 180),
        Tmatrix);
    Tmatrix = multiply(translationMatrix(
        modelNode.transform.translation.x, 
        modelNode.transform.translation.y, 
        modelNode.transform.translation.z),
        Tmatrix);

    return Tmatrix;
}

function setViewMatrix() {
    let Vmatrix;

    Vmatrix = rotateMatrix(0, state.view.rotation * Math.PI / 180, 0);
    Vmatrix = multiply(Vmatrix, translationMatrix(0, 0, state.view.radius));

    // change the zoom level
    if (state.projection == "orth") {
        Vmatrix[14] = Vmatrix[14] + 0.5;
    } else if (state.projection == "persp"){
        Vmatrix[14] = Vmatrix[14] - 1.375;
    } else {
        Vmatrix[14] = Vmatrix[14] - 1;
    }
    return Vmatrix;
}

function rotateModelX(model, rotate){
    model.transform.rotation.x = rotate;
    // if model.transform.rotation.x != 0 then model.transform.rotation.x += rotate
    if (model.transform.rotation.x != 0) {
        model.transform.rotation.x += rotate;
    }
    else {
        model.transform.rotation.x = rotate;
    }
    if (model.children){
        model.children.forEach(child => {
            rotateModelX(child, rotate);
        });
    }
}

function rotateModelY(model, rotate){
    model.transform.rotation.y = rotate;
    if (model.children){
        model.children.forEach(child => {
            rotateModelY(child, rotate);
        });
    }
}

function rotateModelZ(model, rotate){
    model.transform.rotation.z = rotate;
    if (model.children){
        model.children.forEach(child => {
            rotateModelZ(child, rotate);
        });
    }
}

function translateModelX(model, translate){
    model.transform.translation.x = translate;
    if (model.children){
        model.children.forEach(child => {
            translateModelX(child, translate);
        });
    }
}

function translateModelY(model, translate){
    model.transform.translation.y = translate;
    if (model.children){
        model.children.forEach(child => {
            translateModelY(child, translate);
        });
    }
}

function translateModelZ(model, translate){
    model.transform.translation.z = translate;
    if (model.children){
        model.children.forEach(child => {
            translateModelZ(child, translate);
        });
    }
}

function scaleModelX(model, scale){
    model.transform.scale.x = scale;
    if (model.children){
        model.children.forEach(child => {
            scaleModelX(child, scale);
        });
    }
}

function scaleModelY(model, scale){
    model.transform.scale.y = scale;
    if (model.children){
        model.children.forEach(child => {
            scaleModelY(child, scale);
        });
    }
}

function scaleModelZ(model, scale){
    model.transform.scale.z = scale;
    if (model.children){
        model.children.forEach(child => {
            scaleModelZ(child, scale);
        });
    }
}


function startAnimation(time_difference, rot_x, rot_y, rot_z) {
    state.transform.rotation.x = state.transform.rotation.x > 180? -180 + time_difference * rot_x : state.transform.rotation.x + time_difference * rot_x;
    state.transform.rotation.y = state.transform.rotation.y > 180? -180 + time_difference * rot_y : state.transform.rotation.y + time_difference * rot_y;
    state.transform.rotation.z = state.transform.rotation.z > 180? -180 + time_difference * rot_z : state.transform.rotation.z + time_difference * rot_z;

    document.getElementById("rotationX").nextElementSibling.value = Math.round(state.transform.rotation.x);
    document.getElementById("rotationY").nextElementSibling.value = Math.round(state.transform.rotation.y);
    document.getElementById("rotationZ").nextElementSibling.value = Math.round(state.transform.rotation.z);

    document.getElementById("rotationX").value = Math.round(state.transform.rotation.x);
    document.getElementById("rotationY").value = Math.round(state.transform.rotation.y);
    document.getElementById("rotationZ").value = Math.round(state.transform.rotation.z);
}

function main() {
    setListeners();
    document.getElementById("reset").click();

    let canvas = document.getElementById("canvas");
    let gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("No rendering context for WebGL");
        return;
    } else {
        console.log("Rendering context for WebGL is obtained");
    }
    
    const flatShaderProgram = createProgram(gl, vertexShaderFlat, fragmentShaderFlat);
    const lightShaderProgram = createProgram(gl, vertexShaderLight, fragmentShaderLight);
    
    let old_time = 0;
    console.log(state.model)
    function render(new_time) {
        let time_difference = new_time - old_time;

        if (state.enableAnimation) {
            startAnimation(time_difference, 0.05, 0.02, 0.03);
            old_time = new_time;
        }
        
        let shaderProgram;
        if (state.enableShader) {
            shaderProgram = lightShaderProgram;
        } else {
            shaderProgram = flatShaderProgram;
        }

        let Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
        let Tmatrix = gl.getUniformLocation(shaderProgram, "Tmatrix");

        gl.useProgram(shaderProgram);
        enableDepth(gl);
        
        let proj_matrix;
        if (state.projection == "persp") {
            proj_matrix = getPerspectiveProjection(45, canvas.width / canvas.height, 0.1, 100);
        } else if (state.projection == "orth") {
            proj_matrix = getOrthographicProjection(canvas.width / canvas.height);
        } else { // use oblique projection
            proj_matrix = getObliqueProjection(canvas.width / canvas.height);
        }
        let view_matrix = setViewMatrix();
        proj_matrix = multiply(proj_matrix, view_matrix);

        gl.viewport(0.0, 0.0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
        
        // console.log("render");
        // console.log(state.model);
        
        // state.model.appendChild(test_model);
        // state.model.children[0].appendChild(test_model2);
        
        // recursively renders children
        function renderChildren(node) {
            if (node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    renderChildren(node.children[i]);
                }
            }
            if (node.vertices) {
                const vertexBuffer = createArrayBuffer(gl, node.exportVertexBuffer());
                const colorBuffer = createArrayBuffer(gl, node.exportColorBuffer());
                const indexBuffer = createElementBuffer(gl, node.exportIndexBuffer());
                
                bindAttribute(gl, shaderProgram, vertexBuffer, "position");
                bindAttribute(gl, shaderProgram, colorBuffer, "color");
                // if (node.name === "block root") {
                //     // console.log("masuk sini", node.name);
                //     node.transform = {scale: {
                //         x: 1,
                //         y: 1,
                //         z: 1
                //     },
                //     rotation: {
                //         x: 0,
                //         y: 56,
                //         z: 88
                //     },
                //     translation: {
                //         x: 0,
                //         y: 0,
                //         z: 0
                //     }}
                // }
                // console.log(node.transform)
                let transform_matrix = setTransformMatrix(node);
                gl.uniformMatrix4fv(Tmatrix, false, transform_matrix);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
                gl.drawElements(gl.TRIANGLES, node.exportIndexBuffer().length, gl.UNSIGNED_SHORT, 0);
            }
        }
        renderChildren(state.model);
        
        window.requestAnimationFrame(render);
    }
    render(0);
}

main();