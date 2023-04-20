let state;

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
  reader.readAsText(file, "UTF-8");
  reader.onload = (readerEvent) => {
    const content = readerEvent.target.result;
    const save = JSON.parse(content);
    state = save;
    state.model = new Model(
      state.model.name,
      state.model.vertices,
      state.model.indices,
      state.model.colors
    );
    updateUI();
  };
}

function save() {
  const dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "save.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function startAnimation(time_difference, rot_x, rot_y, rot_z) {
  state.transform.rotation.x =
    state.transform.rotation.x > 180
      ? -180 + time_difference * rot_x
      : state.transform.rotation.x + time_difference * rot_x;
  state.transform.rotation.y =
    state.transform.rotation.y > 180
      ? -180 + time_difference * rot_y
      : state.transform.rotation.y + time_difference * rot_y;
  state.transform.rotation.z =
    state.transform.rotation.z > 180
      ? -180 + time_difference * rot_z
      : state.transform.rotation.z + time_difference * rot_z;

  document.getElementById("rotationX").nextElementSibling.value = Math.round(
    state.transform.rotation.x
  );
  document.getElementById("rotationY").nextElementSibling.value = Math.round(
    state.transform.rotation.y
  );
  document.getElementById("rotationZ").nextElementSibling.value = Math.round(
    state.transform.rotation.z
  );

  document.getElementById("rotationX").value = Math.round(
    state.transform.rotation.x
  );
  document.getElementById("rotationY").value = Math.round(
    state.transform.rotation.y
  );
  document.getElementById("rotationZ").value = Math.round(
    state.transform.rotation.z
  );
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

  let old_time = 0;
  console.log(state.model);
  function render(new_time) {
    let time_difference = new_time - old_time;

    if (state.enableAnimation) {
      startAnimation(time_difference, 0.05, 0.02, 0.03);
      old_time = new_time;
    }

    // pass shading
    
    let shaderProgram = lightShaderProgram;
    
    let u_shading = gl.getUniformLocation(shaderProgram, "u_shading");
    let u_textureType = gl.getUniformLocation(shaderProgram, "u_textureType");
    let Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
    let Tmatrix = gl.getUniformLocation(shaderProgram, "Tmatrix");
    let u_textureLoc = gl.getUniformLocation(shaderProgram, "u_texture");
    let texCoordLoc = gl.getAttribLocation(shaderProgram, "a_texcoord");

    // Asynchronously load an image
    if (state.textureType == 1) { // if image texture is selected
      setupTextureImg(gl, texCoordLoc)
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
