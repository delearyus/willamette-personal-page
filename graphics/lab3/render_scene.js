var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var uColor;       //  shader uniform variable for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix

var thetaY = -15;  // rotation around y axis
var branchAngle = 20; //angle offset of each branch segment
var branchSplits = 3; //number of splits for each segment
var viewMat;     // view matrix (will get to in Lab 4)
var showOutline = false;
var treeHeight = 6;
var distance = 1;

window.onload = function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.7, 0.7, 0.7, 1.0);

    gl.enable(gl.DEPTH_TEST);

    shaderSetup();        // set up shaders

    Shapes.initShapes();  // create the primitive shapes    

    Controls.initWindowListeners();

    render();              // Go draw the scene!
};
/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");   // we won't use vertex here
                            // colors but we keep it in for possible use later.
    
    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
}

/**
 * Set the location and orientation of the camera. Compute 
 * the view and projection matrices, and set the value of the uniform
 * shader variable for the projection matrix.
 * @return {undefined}
 */
function cameraSetup() {
      // All of this is to get the camera set properly. We will 
    // learn about this in Lab 4
    //thetaY += 1.0;  // increase rotation about chosen axis
    var eye = vec3(0.0, 4.0, 8.0);  // location of camera
    var at = vec3(0, 0, 0);         // what the camera is looking at
    var up = vec3(0, 1, 0);         // the camera's up direction
    viewMat = lookAt(eye, at, up);  // view matrix
    var axisRot = rotateY(thetaY);  // rotation matrix for rotating around the y axis
    viewMat = mult(viewMat, axisRot); // combine the view matrix with rotation matrix
     
    // Calculate the projection matrix 
    var projMat = perspective(60, canvas.width / canvas.height, 0.1, 500.);
    // Set the value of the projection uniform variable in the shader
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat)); // set projection matrix
    
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    cameraSetup();
   
    // Draw a red cube   
    //gl.uniformMatrix4fv(uModel_view, false, flatten(viewMat)); // set modelview transform
    //gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
    //Shapes.drawPrimitive(Shapes.cylinder);    // draw cube
    
    // draw a non-uniformly scaled and translated green cube.
    //viewMat = mult(viewMat, translate(-2.5,0,0)); // update modelview transform
    //viewMat = mult(viewMat, scalem(1,2,1));   // update modelview transform
    //gl.uniformMatrix4fv(uModel_view, false, flatten(viewMat)); // set view transform
    //gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));  // set color to green
    //Shapes.drawPrimitive(Shapes.cube);  // draw cube
    
    ms = new MatrixStack();
    ms.multiply(translate(0,-2,0));
    ms.multiply(viewMat);
    ms.multiply(scalem(distance,distance,distance));
    //ms.multiply(scalem(2,2,2));
    color = vec4(0.5, 0.3, 0.0); //Set color to #884c00, roughly
    drawTree(treeHeight,branchSplits,branchAngle,color,0.2,ms);

    //requestAnimFrame(render);
}

