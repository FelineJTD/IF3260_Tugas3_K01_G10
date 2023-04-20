let state;

function setDefaultState() {
  state = {
    model: Dog(),
    animation: dogAnimation,
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

  let transform = {
    translation: {
      x: currentFrame.transform.translation.x + (nextFrame.transform.translation.x - currentFrame.transform.translation.x) * progress,
      y: currentFrame.transform.translation.y + (nextFrame.transform.translation.y - currentFrame.transform.translation.y) * progress,
      z: currentFrame.transform.translation.z + (nextFrame.transform.translation.z - currentFrame.transform.translation.z) * progress
    },
    rotation: {
      x: currentFrame.transform.rotation.x + (nextFrame.transform.rotation.x - currentFrame.transform.rotation.x) * progress,
      y: currentFrame.transform.rotation.y + (nextFrame.transform.rotation.y - currentFrame.transform.rotation.y) * progress,
      z: currentFrame.transform.rotation.z + (nextFrame.transform.rotation.z - currentFrame.transform.rotation.z) * progress
    },
    scale: {
      x: currentFrame.transform.scale.x + (nextFrame.transform.scale.x - currentFrame.transform.scale.x) * progress,
      y: currentFrame.transform.scale.y + (nextFrame.transform.scale.y - currentFrame.transform.scale.y) * progress,
      z: currentFrame.transform.scale.z + (nextFrame.transform.scale.z - currentFrame.transform.scale.z) * progress
    }
  };

  state.model.getSelectedModel(currentFrame.node).transform = transform;

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
  let animationEndTime = state.animation[state.animation.length - 1].time;
  // let old_time = 0;
  console.log(state.model);
  function render() {
    // let time_difference = new_time - old_time;

    if (state.enableAnimation) {
      console.log("animate");
      console.log(currentFrameIndex);
      animate(currentTime, currentFrameIndex);
      // startAnimation(time_difference, 0.05, 0.02, 0.03);
      currentTime = performance.now() - animationStartTime;
      // old_time = new_time;
      while (currentFrameIndex < state.animation.length - 1 && state.animation[currentFrameIndex + 1].time <= currentTime ) {
        currentFrameIndex++;
      }
    }

    // pass shading
    
    let shaderProgram = lightShaderProgram;
    
    // get uniform locations
    let u_shading = gl.getUniformLocation(shaderProgram, "u_shading");
    let u_textureType = gl.getUniformLocation(shaderProgram, "u_textureType");
    let Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
    let Tmatrix = gl.getUniformLocation(shaderProgram, "Tmatrix");
    let texture2DLoc = gl.getUniformLocation(shaderProgram, "u_sampler");
    var textureLocation = gl.getUniformLocation(shaderProgram, "u_texture");
    let worldCameraPositionLocation = gl.getUniformLocation(shaderProgram, "u_worldCameraPosition");
     

    // Get Attribute Locations
    let texcoordLocation = gl.getAttribLocation(shaderProgram, "a_texcoord");
    let normalLocation = gl.getAttribLocation(shaderProgram, "a_normal");
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
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 1;
      const height = 1;
      const border = 0;
      const srcFormat = gl.RGBA;
      const srcType = gl.UNSIGNED_BYTE;
      const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);
  
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                          srcFormat, srcType, image);
          // WebGL1 has different requirements for power of 2 images
          // vs non power of 2 images so check if the image is a
          // power of 2 in both dimensions.
          if ((image.width &(image.width-1) == 0) && (image.height &(image.height-1) == 0)) {
              // Yes, it's a power of 2. Generate mips.
              gl.generateMipmap(gl.TEXTURE_2D);
          } else {
              // No, it's not a power of 2. Turn of mips and set
              // wrapping to clamp to edge
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          }
      };
      image.src = "https://webglfundamentals.org/webgl/resources/f-texture.png";

    } else if (state.textureType == 2) { // if env texture is selected
      let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        const faceTexture = [
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-z.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                url: 'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-z.jpg',
            },
        ];
        faceTexture.forEach((faceInfo) => {
            const { target, url } = faceInfo;

            // Upload the canvas to the cubemap face.
            const level = 0;
            const internalFormat = gl.RGBA;
            const width = 512;
            const height = 512;
            const format = gl.RGBA;
            const type = gl.UNSIGNED_BYTE;

            // setup each face so it's immediately renderable
            gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

            // Asynchronously load an image
            const image = new Image();
            image.crossOrigin = "anonymous"
            image.onload = () => {
                // Now that the image has loaded make copy it to the texture.
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, level, internalFormat, format, type, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            };
            image.src = url;
        });
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        let cameraPosition = [0, 0, 2];
        // Set the uniforms
        gl.uniform3fv(worldCameraPositionLocation, cameraPosition)
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
        const normalBuffer = createArrayBuffer(gl, node.exportNormalBuffer());

        turnNormalOn(gl, normalLocation, normalBuffer)
        bindAttribute(gl, shaderProgram, vertexBuffer, "position");
        bindAttribute(gl, shaderProgram, colorBuffer, "color");
        gl.uniform1i(u_shading, state.enableShader);
        gl.uniform1i(u_textureType, state.textureType);

        // Tell the shader to use texture unit 2 for env texture
        gl.uniform1i(textureLocation, 2);
        // Tell the shader to use texture unit 0 for u_texture
        gl.uniform1i(texture2DLoc, 1);

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
