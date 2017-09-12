/** Build and Draw Primitive Shapes
 * 
 * Global Variables:
 *   gl: the webgl graphics context.
 *   vPosition: shader variable location for vertex position attribute
 *   vColor: shader variable location for color attribute
 */

var Shapes = {};   // set up Shapes namespace

Shapes.cube     = new Cube();  // global
Shapes.pyramid = new Pyramid();
Shapes.cylinder = new Cylinder(8);
Shapes.cone = new Cone(8);
// TO DO:  DECLARE OTHER SHAPES

/**
 * Create and load the buffers for all of the primitive shapes.
 * @return {undefined}
 */
Shapes.initShapes = function (bOutline) {
    Shapes.initBuffers(Shapes.cube, bOutline);
    Shapes.initBuffers(Shapes.pyramid, bOutline);
    Shapes.initBuffers(Shapes.cylinder, bOutline);
    Shapes.initBuffers(Shapes.cone, bOutline);
    // TO DO:  INITIALIZE OTHER SHAPES
};

/**
 * Create and load buffers on GPU for the primitive.
 * @param {type} primitive 
 * @return {undefined}
 */
Shapes.initBuffers = function (primitive,bOutline) {

    // SET UP ARRAY BUFFER FOR VERTICES 
    ////////////////////////////////////////////////////////////
    primitive.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffer

    // SET UP ARRAY BUFFER FOR VERTEX COLORS 
    ////////////////////////////////////////////////////////////
    primitive.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.colors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffer

    if (bOutline) {

        // CALCULATE EDGES FROM THE VERTICES FOR SHAPE OUTLINES 
        // Don't need to do this unless you want an outline 
        var edges = [];
        for (var i = 0; i < primitive.numTriangles; i++) {
            edges.push(primitive.vertices[i * 3 + 0]);
            edges.push(primitive.vertices[i * 3 + 1]);
            edges.push(primitive.vertices[i * 3 + 1]);
            edges.push(primitive.vertices[i * 3 + 2]);
            edges.push(primitive.vertices[i * 3 + 2]);
            edges.push(primitive.vertices[i * 3 + 0]);
        }

        primitive.numEdgeVertices = edges.length;

        // SET UP ARRAY BUFFER FOR EDGES     
        ////////////////////////////////////////////////////////////
        primitive.edgeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, primitive.edgeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(edges), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);  // done with this buffer

        // SET UP ARRAY BUFFER FOR EDGE COLORS 
        ////////////////////////////////////////////////////////////
        var edgeColors = [];
        for (var i = 0; i < edges.length; i++) {
            edgeColors.push([0.0, 0.0, 0.0, 1.0]);
        }

        // SET UP ARRAY BUFFER FOR EDGE COLORS     
        ////////////////////////////////////////////////////////////
        primitive.edgeColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, primitive.edgeColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(edgeColors), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffer

    } else {

        if (primitive.edgeBuffer) { gl.deleteBuffer(primitive.edgeBuffer); };
        if (primitive.edgeColorBuffer) {
            gl.deleteBuffer(primitive.edgeColorBuffer);
        };
    };

    console.log("Buffer Lengths:");
    console.log(flatten(primitive.vertices).length);
    console.log(flatten(primitive.colors).length);
    if (bOutline) {
        console.log(flatten(edges).length);
        console.log(flatten(edgeColors).length);
    }
};

/**
 * Enable the buffers and draw the primitive shape
 * @param {type} primitive
 * @return {undefined}
 */
Shapes.drawPrimitive = function (primitive) {
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.vertexBuffer);
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.colorBuffer);
    gl.enableVertexAttribArray(vColor);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, primitive.numVertices);

    gl.disableVertexAttribArray(vPosition);
    gl.disableVertexAttribArray(vColor);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    Shapes.drawWiredPrimitive(primitive);
};

Shapes.drawWiredPrimitive = function (primitive) {
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.edgeBuffer);
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.edgeColorBuffer);
    gl.enableVertexAttribArray(vColor);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.LINES, 0, primitive.numEdgeVertices);

    gl.disableVertexAttribArray(vPosition);
    gl.disableVertexAttribArray(vColor);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};



