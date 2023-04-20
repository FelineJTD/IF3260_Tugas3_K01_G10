let vertexShaderLight = `
    precision highp float;
    precision mediump int;
    attribute vec3 position;
    attribute vec3 a_normal;
    uniform mat4 Pmatrix;
    uniform mat4 Tmatrix;

    attribute vec3 color;
    attribute vec2 a_texcoord;
    varying vec2 v_texcoord;

    uniform bool u_shading;
    uniform int u_textureType;

    varying vec3 v_worldPosition;
    varying vec3 v_worldNormal;

    varying vec3 vColor;
    varying float lighting;
    void main(void) { 
        vec4 transformedPos = Tmatrix * vec4(position.xy, position.z * -1.0, 1.0);
        gl_Position = Pmatrix*transformedPos;
        vColor = color;
        // Pass the texcoord to the fragment shader.
        v_texcoord = a_texcoord;
        if (u_shading) {
          lighting = min(max((1.0 - transformedPos.z) / 2.0, 0.0), 1.0);
        } else {
          lighting = 1.0;
        }

        if (u_textureType == 2) {
          gl_Position = Tmatrix * vec4(position.xy, position.z * -1.0, 1.0);
        
          v_worldPosition = (Pmatrix * vec4(position.xy, position.z * -1.0, 1.0)).xyz;
          
          v_worldNormal = mat3(Pmatrix) * a_normal;
        }
    }`;

let fragmentShaderLight = `
    precision highp float;
    precision mediump int;
    varying vec3 vColor;
    varying float lighting;
    // Passed in from the vertex shader.
    varying vec2 v_texcoord;
    varying vec3 v_worldPosition;
    varying vec3 v_worldNormal;

    // The texture.
    uniform sampler2D u_sampler;
    uniform samplerCube u_texture;
    uniform bool u_shading;
    uniform int u_textureType;

    // The position of the camera
    uniform vec3 u_worldCameraPosition;

    void main(void) {
      vec3 worldNormal = normalize(v_worldNormal);
      vec3 eyeToSurfaceDir = normalize(v_worldPosition - u_worldCameraPosition);
      vec3 direction = reflect(eyeToSurfaceDir,worldNormal);


      if (u_shading) {
        gl_FragColor = vec4(vColor * lighting, 1.);
      } else {
        gl_FragColor = vec4(vColor, 1.);
      }

      if (u_textureType == 1) {
        gl_FragColor = texture2D(u_sampler, v_texcoord) * gl_FragColor;
      } else if (u_textureType == 2) {
        gl_FragColor = textureCube(u_texture, direction);
      }
    }`;

function createArrayBuffer(gl, array) {
  let arrayBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return arrayBuffer;
}

function createElementBuffer(gl, element) {
  let elementBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, element, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return elementBuffer;
}

function bindAttribute(gl, program, buffer, attr) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  let attribute = gl.getAttribLocation(program, attr);
  gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.enableVertexAttribArray(attribute);
}

function bindTexture(gl, program, buffer, attr) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  let attribute = gl.getAttribLocation(program, attr);
  gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(attribute);
}

function enableDepth(gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
}

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log("Failed to create shader. Reason: ", gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(
    "Failed to create program. Reason: ",
    gl.getProgramInfoLog(program)
  );
  gl.deleteProgram(program);
}


function turnNormalOn(gl, normalLocation, normalBuffer){
  // Turn on the normal attribute
  gl.enableVertexAttribArray(normalLocation);

  // Bind the noirmal buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  // Tell the attribute how to get data out of normalBuffer (ARRAY_BUFFER)
  let size = 3;                 // 3 components per iteration
  let type = gl.FLOAT;            // the data is 32bit floats
  let normalize = false;         // don't normalize the data
  let stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
  let offset = 0;               // start at the beginning of the buffer
  gl.vertexAttribPointer(
      normalLocation, size, type, normalize, stride, offset);
}

