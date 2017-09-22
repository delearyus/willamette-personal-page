var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices
var vColor;       // shader variable attrib location for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix

var axis = 1;            // selected axis
var xAxis = 0;            // index for the x axis
var yAxis = 1;            // index for the y axis
var zAxis = 2;            // index for the z axis
var theta = [0, 0, 0];  // rotation around each axis

var shape = Shapes.cube; // shape to be drawn

var bOutline = false;

window.onload = function init()
{
    canvas = document.getElementById("gl-canvas");
    parent = document.getElementById("canvas-parent");
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    gl.enable(gl.DEPTH_TEST);  // enable the depth buffer

    shaderSetup();   // set up the shaders

    Shapes.initShapes(bOutline);  // create all primitive shapes

    initWindowListeners(); // setup button controls

    render();  // Go draw the scene!
};

function shaderSetup() {
    //  Load shaders
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // get location of shader variables. We will need these in setting up buffers
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");

    // uniform variables for the camera settings
    uProjection = gl.getUniformLocation(program, "uProjection");
    uModel_view = gl.getUniformLocation(program, "uModel_view");
}

function initWindowListeners()  {
    //event listeners for buttons
    document.getElementById("xButton").onclick = function () {
        axis = xAxis;
    };
    document.getElementById("yButton").onclick = function () {
        axis = yAxis;
    };
    document.getElementById("zButton").onclick = function () {
        axis = zAxis;
    };
    document.getElementById("bOutline").onclick = function () {
        bOutline = document.getElementById("bOutline").checked;
        Shapes.initBuffers(shape,bOutline);
    };
    document.getElementById("ShapesChoice").addEventListener('click',function (event) {
        var x = document.getElementById("ShapesChoice").selectedIndex;
        updateInfo();
        switch (x) {   // cube=0, cylinder=1, cone=2, disk=3
            case 0:
                shape = Shapes.cube;
                Shapes.initBuffers(shape,bOutline);
                break;
            case 1:
                shape = Shapes.pyramid;
                Shapes.initBuffers(shape,bOutline);
                break;
            case 2:
                shape = Shapes.cylinder;
                Shapes.initBuffers(shape,bOutline);
                break;
            case 3:
                shape = Shapes.cone;
                Shapes.initBuffers(shape,bOutline);
                break;
            // TO DO:  ADD OTHER CASES FOR OTHER SHAPES
        }
    });
    document.getElementById("coneNumEdges").addEventListener('input', function (event) {
        var e = document.getElementById("coneNumEdges").value;
        document.getElementById("coneCurEdges").innerHTML = e;
        newcone = new Cone(e);
        Shapes.cone = newcone;
        Shapes.initBuffers(Shapes.cone, bOutline);
        shape = Shapes.cone;
    });
    document.getElementById("cylNumEdges").addEventListener('input', function (event) {
        var e = document.getElementById("cylNumEdges").value;
        document.getElementById("cylCurEdges").innerHTML = e;
        newcyl = new Cylinder(e);
        Shapes.cylinder = newcyl;
        Shapes.initBuffers(Shapes.cylinder, bOutline);
        shape = Shapes.cylinder;
    });

    //window.addEventListener("resize", function () {
      //canvas.width = parent.offsetWidth;
      //canvas.height = parent.offsetHeight;
    //});
}

function cameraSetup() {
    // All of this is to get the camera set properly. We will
    // learn about this in Lab 4
    var pause = document.getElementById("pauseButton");
    if (!(pause.checked)) {theta[axis] += 1.0; }; // increase rotation about chosen axis
    var eye = vec3(0.0, 0.0, 2.0);
    var at = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);
    var viewMat = lookAt(eye, at, up);
    var axisRot = mult(mult(rotateZ(theta[2]), rotateY(theta[1]) ), rotateX(theta[0]));
    viewMat = mult(viewMat, axisRot);
    viewMat = mult(viewMat, scalem(.5,.5,.5));
    gl.uniformMatrix4fv(uModel_view, false, flatten(viewMat));

    var projMat = perspective(60, canvas.width / canvas.height, 0.1, 500.);
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    cameraSetup();

    // draw the shape!
    Shapes.drawPrimitive(shape);

    requestAnimFrame(render);
}

function updateInfo() {
    var x = document.getElementById("ShapesChoice").selectedIndex;
    var cylinfo = document.getElementById("CylinderInfo");
    var coneinfo = document.getElementById("ConeInfo");
    switch (x) {
        case 0:
            cylinfo.style.display = 'none';
            coneinfo.style.display = 'none';
            break;
        case 1:
            cylinfo.style.display = 'none';
            coneinfo.style.display = 'none';
            break;
        case 2:
            cylinfo.style.display = 'block';
            coneinfo.style.display = 'none';
            break;
        case 3:
            cylinfo.style.display = 'none';
            coneinfo.style.display = 'block';
            break;
    }
}
