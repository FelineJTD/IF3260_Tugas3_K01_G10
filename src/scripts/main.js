let state;

function setDefaultState() {
  state = {
    model: Dog(),
    animation: null,
    selectedNode: 0,
    mousedown: false,

    color: [1, 1, 1],

    projection: "orth",

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
    // enableAnimation: true,
    textureType: 0, // 0 is None, 1 is image, 2 is Env, 3 is bump
  };
  updateUI();
}

function load(file) {
  console.log("load");
  const reader = new FileReader();

  reader.onload = function() {
    const jsonString = reader.result;
    const save = JSON.parse(jsonString);
    const model = save.model;
    state = save;
    console.log("save", save);
    state.model = new Model(
      model.name,
      model.vertices,
      model.indices,
      model.color,
      model.offset,
      model.transform
    );
    // recursively create children objects
    function createChildren(model, children) {
      if (children) {
        children.forEach((child) => {
          const newModel = new Model(
            child.name,
            child.vertices,
            child.indices,
            child.color,
            child.offset,
            child.transform
          );
          model.appendChild(newModel);
          createChildren(newModel, child.children);
        });
      }
    }
    console.log(model.children);
    createChildren(state.model, model.children);
    console.log(state);
    updateUI();
  }

  reader.readAsText(file);
}

function loadComponent(file) {

  console.log("component load");
  const reader = new FileReader();

  reader.onload = function () {
    const jsonString = reader.result;
    const model = JSON.parse(jsonString);
    newModel = new Model(
      model.name,
      model.vertices,
      model.indices,
      model.color,
      model.offset,
      model.transform
    );
    createChildren(newModel, model.children);

    console.log("newModel", newModel);
    

    state.model.setSelectedModel(state.selectedNode, newModel);
    console.log("state", state);
    updateComponentsUI();
    // state.model.children = [];
    // console.log("newChildren", newChildren);
    // createChildren(state.model, newChildren);
    // console.log("state",state);
  };
  reader.readAsText(file);
  
}

function save() {
  // console.log(state);
  const dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
  // console.log(JSON.parse((JSON.stringify(state))));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "save.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function animate(currentTime, currentFrameIndex) {
  if (currentFrameIndex === state.animation.length - 1) {
    return;
  }
  // let currentFrameIndex = 0;
  // let currentTime = 0;
  // let animationStartTime = null;
  // let animationEndTime = animation[animation.length - 1].time;

  // function updateModel() {
  let currentFrame = state.animation[currentFrameIndex];
  let nextFrame = state.animation[currentFrameIndex + 1];

  let timeDelta = nextFrame.time - currentFrame.time;
  let currentTimeDelta = currentTime - currentFrame.time;
  let progress = currentTimeDelta / timeDelta;

  for (let i = 0; i < currentFrame.animations.length; i++) {
    let transform = {
      translation: {
        x: currentFrame.animations[i].transform.translation.x + (nextFrame.animations[i].transform.translation.x - currentFrame.animations[i].transform.translation.x) * progress,
        y: currentFrame.animations[i].transform.translation.y + (nextFrame.animations[i].transform.translation.y - currentFrame.animations[i].transform.translation.y) * progress,
        z: currentFrame.animations[i].transform.translation.z + (nextFrame.animations[i].transform.translation.z - currentFrame.animations[i].transform.translation.z) * progress
      },
      rotation: {
        x: currentFrame.animations[i].transform.rotation.x + (nextFrame.animations[i].transform.rotation.x - currentFrame.animations[i].transform.rotation.x) * progress,
        y: currentFrame.animations[i].transform.rotation.y + (nextFrame.animations[i].transform.rotation.y - currentFrame.animations[i].transform.rotation.y) * progress,
        z: currentFrame.animations[i].transform.rotation.z + (nextFrame.animations[i].transform.rotation.z - currentFrame.animations[i].transform.rotation.z) * progress
      },
      scale: {
        x: currentFrame.animations[i].transform.scale.x + (nextFrame.animations[i].transform.scale.x - currentFrame.animations[i].transform.scale.x) * progress,
        y: currentFrame.animations[i].transform.scale.y + (nextFrame.animations[i].transform.scale.y - currentFrame.animations[i].transform.scale.y) * progress,
        z: currentFrame.animations[i].transform.scale.z + (nextFrame.animations[i].transform.scale.z - currentFrame.animations[i].transform.scale.z) * progress
      }
    };

    state.model.getSelectedModel(currentFrame.animations[i].node).updateTransform(transform);
  }

  // if (currentTime >= animationEndTime) {
  //   currentTime = 0;
  //   animationStartTime = performance.now();
  // }

  // requestAnimationFrame(updateModel);
  // currentTime = performance.now() - animationStartTime;
  // if (currentTime > animationEndTime) {
  //   currentTime = animationEndTime;
  // }
  

  // requestAnimationFrame(() => {
  //   animationStartTime = performance.now();
  //   updateModel();
  // });
  // console.log(currentTime);
  // console.log(state.animation[currentFrameIndex + 1].time <= currentTime%animationEndTime);
  
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

  const lightShaderProgram = createProgram(
    gl,
    vertexShaderLight,
    fragmentShaderLight
  );


  let currentFrameIndex = 0;
  let currentTime = 0;
  let animationStartTime = null;
  let animationEndTime = null;
  // let old_time = 0;
  console.log(state.model);
  function render() {
    // let time_difference = new_time - old_time;

    if (state.animation !== null) {
      animationEndTime = state.animation[state.animation.length - 1].time;
      console.log("animate");
      console.log(currentFrameIndex);
      animate(currentTime, currentFrameIndex);
      // startAnimation(time_difference, 0.05, 0.02, 0.03);
      currentTime = performance.now() - animationStartTime;
      // old_time = new_time;
      while (currentFrameIndex < state.animation.length - 1 && state.animation[currentFrameIndex + 1].time <= currentTime ) {
        currentFrameIndex++;
      }
      if (currentTime >= animationEndTime) {
        currentTime = 0;
        animationStartTime = performance.now();
        currentFrameIndex = 0;
      }
    }

    // pass shading
    
    let shaderProgram = lightShaderProgram;
    
    let u_shading = gl.getUniformLocation(shaderProgram, "u_shading");
    let u_textureType = gl.getUniformLocation(shaderProgram, "u_textureType");
    let Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
    let Tmatrix = gl.getUniformLocation(shaderProgram, "Tmatrix");
    let u_textureLoc = gl.getUniformLocation(shaderProgram, "u_texture");
    let texcoordLocation = gl.getAttribLocation(shaderProgram, "a_texcoord");
    // / Create a buffer for texcoords.
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(texcoordLocation);
    
    // We'll supply texcoords as floats.
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Set Texcoords.
    setTexCoords(gl);

    // Asynchronously load an image
    if (state.textureType == 1) { // if image texture is selected
      // Create a texture.
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      
      // Fill the texture with a 1x1 blue pixel.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                    new Uint8Array([0, 0, 255, 255]));
      
      // Asynchronously load an image
      var image = new Image();
      image.crossOrigin = "anonymous";
      image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/View_of_Dallas_from_Reunion_Tower_August_2015_13.jpg/288px-View_of_Dallas_from_Reunion_Tower_August_2015_13.jpg";
      image.onload = function()  {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
          // Check if the image is a power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
      };
    }

    gl.useProgram(shaderProgram);
    enableDepth(gl);

    let proj_matrix;
    if (state.projection == "persp") {
      proj_matrix = getPerspectiveProjection(
        45,
        canvas.width / canvas.height,
        0.1,
        100
      );
    } else if (state.projection == "orth") {
      proj_matrix = getOrthographicProjection(canvas.width / canvas.height);
    } else {
      // use oblique projection
      proj_matrix = getObliqueProjection(canvas.width / canvas.height);
    }
    let view_matrix = setViewMatrix();
    proj_matrix = multiply(proj_matrix, view_matrix);

    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);

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

        bindAttribute(gl, shaderProgram, vertexBuffer, "position");
        bindAttribute(gl, shaderProgram, colorBuffer, "color");
        gl.uniform1i(u_shading, state.enableShader);
        gl.uniform1i(u_textureType, state.textureType);
        gl.uniform1i(u_textureLoc, 0);

        let transform_matrix = setTransformMatrix(node);
        gl.uniformMatrix4fv(Tmatrix, false, transform_matrix);
        gl.drawArrays(
          gl.TRIANGLES,
          0,
          node.vertices.length / 3
        );
      }
    }
    renderChildren(state.model);

    window.requestAnimationFrame(render);
  }
  render(0);
}

main();
