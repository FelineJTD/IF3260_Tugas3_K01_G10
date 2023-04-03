const vertexShaderLight: string = `
    attribute vec3 position;
    uniform mat4 Pmatrix;
    uniform mat4 Tmatrix;
    attribute vec3 color;
    varying vec3 vColor;
    varying float lighting;
    
    void main(void) {  
        vec4 transformedPos = Tmatrix * vec4(position.xy, position.z * -1.0, 1.0);
        gl_Position = Pmatrix*transformedPos;
        vColor = color;
        lighting = min(max((1.0 - transformedPos.z) / 2.0, 0.0), 1.0);
    }`

const vertexShaderFlat: string = `
    attribute vec3 position;
    uniform mat4 Pmatrix;
    uniform mat4 Tmatrix;
    attribute vec3 color;
    varying vec3 vColor;
    
    void main(void) { 
        vec4 transformedPos = Tmatrix * vec4(position.xy, position.z * -1.0, 1.0);
        gl_Position = Pmatrix*transformedPos;
        vColor = color;
    }`

export { vertexShaderLight, vertexShaderFlat }
