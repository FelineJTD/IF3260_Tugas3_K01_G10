function hexToRGBColor(hex) {
    var bigint = parseInt(hex.replace("#", ""), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return {r: r / 255, g: g / 255, b: b / 255};
}

function rgbToHexColor(rgb) {
    var r = Math.floor(rgb[0] * 255);
    var g = Math.floor(rgb[1] * 255);
    var b = Math.floor(rgb[2] * 255);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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