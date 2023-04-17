const vertexShaderLight: string = `
    attribute vec3 position;
    uniform mat4 Pmatrix;
    uniform mat4 Tmatrix;
    uniform mat4 u_worldInverseTranspose;
    attribute vec3 color;
    attribute vec3 a_normal;
    varying vec3 vColor;
    varying float lighting;
    varying vec3 v_normal;
    
    void main(void) {  
        vec4 transformedPos = Tmatrix * vec4(position.xy, position.z * -1.0, 1.0);
        gl_Position = Pmatrix*transformedPos;
        vColor = color;
        v_normal = (u_worldInverseTranspose * vec4(a_normal, 0.0)).xyz;
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
