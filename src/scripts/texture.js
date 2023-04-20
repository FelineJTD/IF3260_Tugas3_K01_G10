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
