const btn = document.getElementById("btnChangeColor");

function initWebGL(canvasId) {
    const canvas = document.getElementById(canvasId);
    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.error('WebGL not supported');
        throw new Error('WebGL not supported');
    }
    return gl;
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        throw new Error('Program linking error');
    }
    return program;
}

function createBuffer(gl, data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    return buffer;
}

function setupAttribute(gl, program, attributeName, size, type, normalize, stride, offset) {
    const location = gl.getAttribLocation(program, attributeName);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, type, normalize, stride, offset);
}

function drawTriangle(gl, program) {
    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}


    //generate random color RGB
    // function randomColor(){
    //     // const color =  [Math.random(), Math.random(), Math.random(), 1.0];
    //     var1 = Math.random();
    //     return var1;
    // }



function main() {
    const gl = initWebGL('glCanvas');

    const vertexShaderSource = `
        attribute vec2 a_position;
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        void main() {
            gl_FragColor = vec4(1.0, 0, 0, 1.0); 
        }
    `;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    const vertices = [
        0.0, 0.5,    // Top vertex
        -0.5, -0.5,  // Bottom-left vertex
        0.5, -0.5    // Bottom-right vertex
    ];

    createBuffer(gl, vertices);
    setupAttribute(gl, program, 'a_position', 2, gl.FLOAT, false, 0, 0);
    drawTriangle(gl, program);


    //untuk ganti warna
    const changeColor = () => {
        //bikin variable untuk ganti warna
        const var1 = Math.random();
        const var2 = Math.random();
        const var3 = Math.random();

        const fragmentShaderSource = `
            precision mediump float;
            void main() {
                gl_FragColor = vec4(${var1}, ${var2}, ${var3}, 1.0); 
            }
        `;//RGBnya random dengan angka dari var1 2 & 3


        //generate segitiga baru
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = createProgram(gl, vertexShader, fragmentShader);

        setupAttribute(gl, program, 'a_position', 2, gl.FLOAT, false, 0, 0);
        drawTriangle(gl, program);
    };

    //button kalau di click jalanin change color
    btn.onclick = changeColor;

}

main();