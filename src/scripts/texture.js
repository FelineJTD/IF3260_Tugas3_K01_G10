function setTexCoords(gl){
    const textureCoordinates = [
        // select the top left image
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        1, 1,

        // select the top middle image
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        1, 1,
        // select to top right image
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        1, 1,
        // select the bottom left image
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        1, 1,
        // select the bottom middle image
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        1, 1,
        // select the bottom right image
        0, 0,
        0, 1,
        1, 1,
        1, 0,
        0, 0,
        1, 1,


    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
}

function LoadImageTexture(gl, source) {
    gl.bindTexture(gl.TEXTURE_2D, null);
    let texture = gl.createTexture();
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = source;
    image.onload = () => {
    // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
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

function setupTextureImg(gl, texCoordLocation){
    // Create a texture, bind it to texture 1
    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255]));
    const image = new Image();
    image.src = 'https://webglfundamentals.org/webgl/resources/leaves.jpg';
    image.crossOrigin = 'Anonymous';
    image.addEventListener('load', function() {
      // Now that the image has loaded make copy it to the texture.
      gl.activeTexture(gl.TEXTURE1);
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
    });

    texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    setTexCoords(gl);

    const num = 2; // every coordinate composed of 2 values
    const type = gl.FLOAT; // the data in the buffer is 32 bit float
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set to the next
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.vertexAttribPointer(texCoordLocation, num, type, normalize, stride, offset);
    gl.enableVertexAttribArray(texCoordLocation);
  }
