const fragmentShaderLight = `
    precision mediump float;
    varying vec3 vColor;
    varying vec3 v_normal;
    uniform vec3 u_reverseLightDirection;

    void main(void) {
        vec3 normal = normalize(v_normal);
        float light = dot(v_normal, u_reverseLightDirection);
        gl_FragColor = vec4(vColor * light,  1.);
    }`
const fragmentShaderFlat = `
    precision mediump float;
    varying vec3 vColor;

    void main(void) {
        gl_FragColor = vec4(vColor, 1.);
    }`

export { fragmentShaderLight, fragmentShaderFlat }
