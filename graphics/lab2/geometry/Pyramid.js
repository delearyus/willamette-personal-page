function Pyramid() {

    this.name = "pyramid";

    this.numTriangles = 6;
    this.numVertices = this.numTriangles * 3;

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices];
    this.texCoords = [this.numVertices];

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
    var unique_vertices = [
        vec4(-1.0, -1.0,  1.0,  1.0),  // v0
        vec4( 1.0, -1.0,  1.0,  1.0),  // v1
        vec4( 1.0, -1.0, -1.0,  1.0),  // v2
        vec4(-1.0, -1.0, -1.0,  1.0),  // v3
        vec4( 0.0,  0.0,  0.0,  1.0)   // v4
    ];

    var vert_colors = [
        vec4(0.0, 1.0, 0.0, 1.0), // green   - v0
        vec4(0.0, 1.0, 0.0, 1.0), // green   - v1
        vec4(0.0, 1.0, 0.0, 1.0), // green   - v2
        vec4(0.0, 1.0, 0.0, 1.0), // green   - v3
        vec4(0.0, 0.0, 1.0, 1.0)  // blue    - v4
    ];

    var face_normals = [
        vec4( 0.0, -1.0,  0.0,  0.0),  // bottom
        vec4( 0.0,  1.0,  1.0,  0.0),  // front
        vec4( 1.0,  1.0,  0.0,  0.0),  // right
        vec4( 0.0,  1.0, -1.0,  0.0),  // back
        vec4(-1.0,  1.0,  0.0,  0.0)   // left
    ];

/////    v6----- v7
/////   /|      /|
/////  v2------v3|              ^ y
/////  | |     | |              |
/////  | |v4---|-|v5            -->x
/////  |/      |/              /
/////  v0------v1              z
    var face_tex_coords = [
        vec2(0, 1),
        vec2(1, 1),
        vec2(0, 0),
        vec2(0, 0),
        vec2(1, 1),
        vec2(1, 0)
    ];


    // Local variable:  Indices into the above vertices and colors arrays
    var indices = [
        0, 3, 2, 2, 1, 0, // Bottom
        1, 4, 0, //Front
        2, 4, 1, //Right
        3, 4, 2, //Back
        0, 4, 3  //Left
    ];


    // These are the actual vertices and colors to be placed in the vertex buffers.
    bnorm = face_normals[0]
    for (var j = 0; j < 6; j++) {
        var q = indices[j];
        this.vertices[j] = unique_vertices[q];
        this.colors[j] = vert_colors[q];
        //this.normals[j] = norm;
        //this.texCoords[j] = face_tex_coords[k];
    }
    for (var i = 0; i < 4; i++) {
        norm = face_normals[i+1];
        for (var j = 0; j < 3; j++) {
            var k = (i * 3) + j + 6;
            var q = indices[k];
            this.vertices[k] = unique_vertices[q];
            this.colors[k] = vert_colors[q];
            //this.normals[k] = norm;
            //this.texCoords[k] = face_tex_coords[j];
        }
    }
}
