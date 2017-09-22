function Cylinder(numSides) {

    numSides = Number(numSides);

    this.name = "cylinder";

    this.numTriangles = numSides * 4;
    this.numVertices = this.numTriangles * 3;

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices];
    this.texCoords = [this.numVertices];

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
    var unique_vertices = [
        vec4( 0.0,  1.0,  0.0,  1.0),  // v0
        vec4( 0.0, -1.0,  0.0,  1.0)   // v1
    ];

    var loc_colors = {};
    loc_colors.top    = vec4(1.0, 1.0, 1.0, 1.0); //white
    loc_colors.midtop = vec4(0.6, 0.6, 0.6, 1.0); //lightgrey
    loc_colors.midbot = vec4(0.3, 0.3, 0.3, 1.0); //darkgrey
    loc_colors.bottom = vec4(0.0, 0.0, 0.0, 1.0); //black


    var vert_colors = [
        loc_colors.top,
        loc_colors.bottom,
    ];


    for (var i = 0; i < numSides; i++) {
        vec = vec4( Math.cos((2*Math.PI*i)/numSides),
                    1.0,
                    Math.sin((2*Math.PI*i)/numSides),
                    1.0);
        unique_vertices.push(vec);
        vert_colors.push(loc_colors.midtop);
    }

    for (var i = 0; i < numSides; i++) {
        vec = vec4( Math.cos((2*Math.PI*i)/numSides),
                    -1.0,
                    Math.sin((2*Math.PI*i)/numSides),
                    1.0 );
        unique_vertices.push(vec);
        vert_colors.push(loc_colors.midbot);
    }

    this.uniques = unique_vertices;

/////    v6----- v7
/////   /|      /|
/////  v2------v3|              ^ y
/////  | |     | |              |
/////  | |v4---|-|v5            -->x
/////  |/      |/              /
/////  v0------v1              z

    // Local variable:  Indices into the above vertices and colors arrays
    var indices = [];

    for (var i = 2; i < numSides+1; i++) {
        indices.push(0,i,i+1);
    }
    indices.push(0,numSides+1,2); //Top
    for (var i = numSides + 2; i < (numSides*2)+1; i++) {
        indices.push(1,i,i+1);
    }
    indices.push(1,(2*numSides)+1,numSides+2); //Bottom
    for (var i = 2; i < numSides + 1; i++) {
        indices.push(i,
                     i+1,
                     i+numSides,
                     i+numSides,
                     i+numSides+1,
                     i+1);
    }
    indices.push(numSides+1,
                 (numSides*2)+1,
                 2,
                 (numSides*2)+1,
                 numSides+2,
                 2); //Sides

    this.indices = indices;

    for (var i = 0; i < this.numVertices; i++) {
        var q = indices[i];
        this.vertices[i] = unique_vertices[q];
        this.colors[i] = vert_colors[q];
    }
}
