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

function animate(currentTime, animationStartTime, animationEndTime, currentFrameIndex) {
  // let currentFrameIndex = 0;
  // let currentTime = 0;
  // let animationStartTime = null;
  // let animationEndTime = animation[animation.length - 1].time;

  // function updateModel() {
  let currentFrame = state.animation[currentFrameIndex];
  let nextFrame = state.animation[currentFrameIndex + 1%state.animation.length];

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
  console.log(currentTime);
  console.log(state.animation[currentFrameIndex + 1].time <= currentTime%animationEndTime);
  
}

// function startAnimation(time_difference, rot_x, rot_y, rot_z) {
//   state.transform.rotation.x =
//     state.transform.rotation.x > 180
//       ? -180 + time_difference * rot_x
//       : state.transform.rotation.x + time_difference * rot_x;
//   state.transform.rotation.y =
//     state.transform.rotation.y > 180
//       ? -180 + time_difference * rot_y
//       : state.transform.rotation.y + time_difference * rot_y;
//   state.transform.rotation.z =
//     state.transform.rotation.z > 180
//       ? -180 + time_difference * rot_z
//       : state.transform.rotation.z + time_difference * rot_z;

//   document.getElementById("rotationX").nextElementSibling.value = Math.round(
//     state.transform.rotation.x
//   );
//   document.getElementById("rotationY").nextElementSibling.value = Math.round(
//     state.transform.rotation.y
//   );
//   document.getElementById("rotationZ").nextElementSibling.value = Math.round(
//     state.transform.rotation.z
//   );

//   document.getElementById("rotationX").value = Math.round(
//     state.transform.rotation.x
//   );
//   document.getElementById("rotationY").value = Math.round(
//     state.transform.rotation.y
//   );
//   document.getElementById("rotationZ").value = Math.round(
//     state.transform.rotation.z
//   );
// }

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
      animate(currentTime, animationStartTime, animationEndTime, currentFrameIndex);
      // startAnimation(time_difference, 0.05, 0.02, 0.03);
      currentTime = performance.now() - animationStartTime;
      // old_time = new_time;
      while (state.animation[(currentFrameIndex + 1)%state.animation.length].time <= currentTime%animationEndTime) {
        currentFrameIndex = (currentFrameIndex + 1)%state.animation.length;
      }
      console.log(currentFrameIndex);
    }

    // pass shading
    
    let shaderProgram = lightShaderProgram;
    
    let u_shading = gl.getUniformLocation(shaderProgram, "u_shading");
    let u_textureType = gl.getUniformLocation(shaderProgram, "u_textureType");
    let Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
    let Tmatrix = gl.getUniformLocation(shaderProgram, "Tmatrix");

    
    // Asynchronously load an image
    if (state.textureType == 1) { // if image texture is selected
      // Create texture
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      
      // Fill the texture with a 1x1 blue pixel.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));
      LoadImageTexture(gl, 'https://webglfundamentals.org/webgl/resources/leaves.jpg');
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
        const indexBuffer = createElementBuffer(gl, node.exportIndexBuffer());
        const texBuffer = gl.createBuffer();

        bindAttribute(gl, shaderProgram, vertexBuffer, "position");
        bindAttribute(gl, shaderProgram, colorBuffer, "color");
        bindTexture(gl, shaderProgram, texBuffer, "a_texcoord")
        gl.uniform1i(u_shading, state.enableShader);
        gl.uniform1i(u_textureType, state.textureType);

        let transform_matrix = setTransformMatrix(node);
        gl.uniformMatrix4fv(Tmatrix, false, transform_matrix);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(
          gl.TRIANGLES,
          node.exportIndexBuffer().length,
          gl.UNSIGNED_SHORT,
          0
        );
      }
    }
    renderChildren(state.model);

    window.requestAnimationFrame(render);
  }
  render(0);
}

main();
