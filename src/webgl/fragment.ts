const fragmentShaderLight = `
    precision mediump float;
    varying vec3 vColor;
    varying float lighting;

    void main(void) {
        gl_FragColor = vec4(vColor * lighting, 1.);
    }`
const fragmentShaderFlat = `
    precision mediump float;
    varying vec3 vColor;

    void main(void) {
        gl_FragColor = vec4(vColor, 1.);
    }`

export { fragmentShaderLight, fragmentShaderFlat }
