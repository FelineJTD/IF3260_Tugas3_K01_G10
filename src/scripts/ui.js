function updateRotationUI() {
  document.getElementById("rotationX").value = Math.round(
    state.transform.rotation.x
  );
  document.getElementById("rotationX").nextElementSibling.value = Math.round(
    state.transform.rotation.x
  );
  document.getElementById("rotationY").value = Math.round(
    state.transform.rotation.y
  );
  document.getElementById("rotationY").nextElementSibling.value = Math.round(
    state.transform.rotation.y
  );
  document.getElementById("rotationZ").value = Math.round(
    state.transform.rotation.z
  );
  document.getElementById("rotationZ").nextElementSibling.value = Math.round(
    state.transform.rotation.z
  );
}

function updateUI() {
  document.getElementById("dog").checked = true;

  document.getElementById("color").value = rgbToHexColor(state.color);

  if (state.projection == "orth")
    document.getElementById("orth").checked = true;
  if (state.projection == "obliq")
    document.getElementById("obliq").checked = true;
  if (state.projection == "persp")
    document.getElementById("persp").checked = true;

  updateRotationUI();

  document.getElementById("translationX").value = state.transform.translation.x;
  document.getElementById("translationX").nextElementSibling.value =
    state.transform.translation.x;
  document.getElementById("translationY").value = state.transform.translation.y;
  document.getElementById("translationY").nextElementSibling.value =
    state.transform.translation.y;
  document.getElementById("translationZ").value = state.transform.translation.z;
  document.getElementById("translationZ").nextElementSibling.value =
    state.transform.translation.z;

  document.getElementById("scalingX").value = state.transform.scale.x;
  document.getElementById("scalingX").nextElementSibling.value =
    state.transform.scale.x;
  document.getElementById("scalingY").value = state.transform.scale.y;
  document.getElementById("scalingY").nextElementSibling.value =
    state.transform.scale.y;
  document.getElementById("scalingZ").value = state.transform.scale.z;
  document.getElementById("scalingZ").nextElementSibling.value =
    state.transform.scale.z;

  document.getElementById("cameraRadius").value = state.view.radius;
  document.getElementById("cameraRadius").nextElementSibling.innerHTML =
    state.view.radius.toFixed(3);

  document.getElementById("cameraAngle").value = state.view.rotation;
  document.getElementById("cameraAngle").nextElementSibling.innerHTML =
    state.view.rotation.toFixed(3);

  document.getElementById("isShadingOn").checked = state.enableShader;
  // document.getElementById("isAnimationOn").checked = state.enableAnimation;

  updateComponentsUI();
  updateSelectedComponentUI();
}

function addComponentButton(model, indent, idx) {
  innerHtml =
    "<button class='component-button' style='margin-left: " +
    indent +
    "em' onclick='handleChange(" +
    idx +
    ")'>" +
    model.name +
    "</button>";
  console.log(idx);
  idx++;
  if (model.children) {
    model.children.forEach((child) => {
      innerHtml += addComponentButton(child, indent + 1, idx);
      idx += child.getDescendantCount();
    });
  }
  return innerHtml;
}

function handleChange(idx) {
  state.selectedNode = idx;
  updateSelectedComponentUI();
}

function updateComponentsUI() {
  console.log("update component ui");
  const container = document.getElementById("components-container");
  container.innerHTML = "";
  // render button for each component and children recursively
  container.innerHTML += addComponentButton(state.model, 0, 0);
}

function updateSelectedComponentUI() {
  const container = document.getElementById("selected-component");
  container.innerHTML = "";
  if (state.selectedNode == -1) {
    container.innerHTML = "<p>No component selected</p>";
  } else {
    container.innerHTML =
      "<p>Selected component: " +
      state.model.getSelectedModel(state.selectedNode).name +
      "</p>";
  }
}

function setListeners() {
  document.getElementById("reset").addEventListener("click", () => {
    setDefaultState();
  });

  document.getElementById("dog").oninput = () => {
    state.model = Dog();
    document.getElementById("anim1").disabled = false;
    document.getElementById("anim2").disabled = false;
    updateComponentsUI();
  };

  document.getElementById("duck").oninput = () => {
    state.model = Duck();
    document.getElementById("anim1").disabled = false;
    document.getElementById("anim2").disabled = false;
    updateComponentsUI();
  };

  document.getElementById("person").oninput = () => {
    state.model = Person();
    document.getElementById("anim1").disabled = false;
    document.getElementById("anim2").disabled = false;
    updateComponentsUI();
  };
  document.getElementById("platypus").oninput = () => {
    state.model = Platypus();
    document.getElementById("anim1").disabled = true;
    document.getElementById("anim2").disabled = true;
    updateComponentsUI();
  };

  document.getElementById("none").oninput = () => {
    state.animation = null;
  };

  document.getElementById("anim1").oninput = () => {
    state.animation = anim1;
  };

  document.getElementById("anim2").oninput = () => {
    state.animation = anim2;
  };
  document.getElementById("anim3").oninput = () => {
    state.animation = anim3;
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

  // For texture
  document.getElementById("none").onclick = () => {
    state.textureType = 0;
  };
  document.getElementById("tex-image").onclick = () => {
    state.textureType = 1;
  };
  document.getElementById("env").onclick = () => {
    state.textureType = 2;
  };
  document.getElementById("bump").onclick = () => {
    state.textureType = 3;
  };

  document.getElementById("rotationX").addEventListener("input", (event) => {
    // state.transform.rotation.x = Math.round(event.target.value);
    console.log(state.model.getSelectedModel(state.selectedNode));
    rotateModelX(
      state.model.getSelectedModel(state.selectedNode),
      Math.round(event.target.value)
    );
    // else
    // {
    //     state.model.children[state.selectedNode - 1].transform.rotation.x = Math.round(event.target.value);
    // }
  });

  document.getElementById("rotationY").addEventListener("input", (event) => {
    // state.transform.rotation.y = Math.round(event.target.value);
    rotateModelY(
      state.model.getSelectedModel(state.selectedNode),
      Math.round(event.target.value)
    );
  });

  document.getElementById("rotationZ").addEventListener("input", (event) => {
    // state.transform.rotation.z = Math.round(event.target.value);
    rotateModelZ(
      state.model.getSelectedModel(state.selectedNode),
      Math.round(event.target.value)
    );
  });

  document.getElementById("translationX").addEventListener("input", (event) => {
    // state.transform.translation.x = event.target.value;
    translateModelX(
      state.model.getSelectedModel(state.selectedNode),
      event.target.value
    );
  });

  document.getElementById("translationY").addEventListener("input", (event) => {
    translateModelY(
      state.model.getSelectedModel(state.selectedNode),
      event.target.value
    );
  });

  document.getElementById("translationZ").addEventListener("input", (event) => {
    translateModelZ(
      state.model.getSelectedModel(state.selectedNode),
      event.target.value
    );
  });

  document.getElementById("scalingX").addEventListener("input", (event) => {
    scaleModelX(
      state.model.getSelectedModel(state.selectedNode),
      event.target.value
    );
  });

  document.getElementById("scalingY").addEventListener("input", (event) => {
    scaleModelY(
      state.model.getSelectedModel(state.selectedNode),
      event.target.value
    );
  });

  document.getElementById("scalingZ").addEventListener("input", (event) => {
    scaleModelZ(
      state.model.getSelectedModel(state.selectedNode),
      event.target.value
    );
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

  // document
  //   .getElementById("isAnimationOn")
  //   .addEventListener("change", (event) => {
  //     state.enableAnimation = event.target.checked;
  //   });

  document.getElementById("canvas").addEventListener("wheel", (event) => {
    state.view.radius = Math.max(
      0,
      Math.min(1, state.view.radius + event.deltaY / 1000)
    );
    document.getElementById("cameraRadius").value = state.view.radius;
    document.getElementById("cameraRadius").nextElementSibling.innerHTML =
      state.view.radius.toFixed(3);
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

  document.getElementById("save-component").addEventListener("click", () => {
    saveComponent();
  });

  document.getElementById("load").oninput = (event) => {
    load(event.target.files[0]);
  };

  document.getElementById("load-component").oninput = (event) => {
    loadComponent(event.target.files[0]);
  };

  document.getElementById("color").oninput = (event) => {
    state.color = hexToRGBColor(event.target.value);
    state.model.getSelectedModel(state.selectedNode).updateColor(state.color);
  };
}
