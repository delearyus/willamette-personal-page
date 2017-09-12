function Cone(n) { //n is the number of 'sides' around the cone
    n = Number(n); //Make sure n is numeric

    // Notes on Variable Names:
    // ////////////////////////
    // Variable names use Hungarian Notation, which consists of
    // prefixing every variable name with a prefix that denotes
    // what kind of value it is. This is useful for not getting
    // mixed up with respect to what a variable contains.
    //
    // Prefixes in use:
    // p   - point vector
    // pl  - list of points
    // c   - color vector
    // cl  - list of colors
    // fl  - list of points, but sequenced for purposes of forming figures

    this.name = "Cone";
    this.numTriangles = n * 2;
    this.numVertices  = n * 6;

    this.vertices = new Array(this.numVertices);
    this.colors   = new Array(this.numVertices);

    // local variables - unique vertices //

    pBottom = vec4( 0.0, -1.0, 0.0, 1.0 ); //first 3 are x, y, z
    pTop    = vec4( 0.0,  1.0, 0.0, 1.0 ); //final arg is always 1.0


    plSides = new Array(n);

    // list of points that represent the perimeter of the base of the cone,
    // starting at (0, -1, 1) and going counter-clockwise looking down.

    for (var i = 0; i < n; i++) {
    //iterate around the outside circle of the cone, adding points
        radT = Math.PI * 2 * i / n; //percentage around circle, in radians
        pTemp = vec4(Math.cos(radT), -1.0, Math.sin(radT));
        //pTemp is the new point to be added

        plSides[i] = pTemp;
    }

    //console.log(plSides);

    // local variables - triangles //


    flBottom = new Array(n * 3); //n triangles, 3 points each
    flTop    = new Array(n * 3);

    // list of figures (actually just a list of points, but will be treated
    // as triples which each represents a triangle. flBottom represents the
    // bottom of the cone, while flTop represents the top. These will
    // eventually be combined into one list, namely `this.vertices`.

    for (var i = 0; i < n; i++) {
        var j = (i + 1) % n //this ensures that we 'wrap back around'
        flBottom.splice(i*3, 3, pBottom, plSides[j], plSides[i]);
        flTop.splice(   i*3, 3, pTop,    plSides[i], plSides[j]);
    }

    //console.log(flBottom);

    // local variables - colors //

    clColors = new Array(n); //each 'slice' has its own color
    for (var i = 0; i < n; i++) {
        p = i > n / 2 ? 1 - (2 * (i - (n / 2)) / n) : 2 * i / n;
        //percentage of the way through the iteration, going 0 to 1 to 0 again
        cTemp = vec4(0.5, p, p, 1.0); //always has r=0.5, g & b go from 0 to 1.
                                      //creating a nice maroon-to-cyan gradient
        clColors[i] = cTemp;
    }

    // final loop - putting it all together //

    for (var i = 0; i < n; i++) {
        var j = i * 3; //index of first vertex in flBottom and flTop
        this.vertices.splice(i*6, 6, flBottom[j], flBottom[j+1], flBottom[j+2],
                                     flTop[j],    flTop[j+1],    flTop[j+2]);

        var k = clColors[i]; //only because I don't want to repeat myself
        this.colors.splice(i*6, 6, k, k, k, k, k, k);

    }
    //console.log(this.vertices);
    //console.log(this.colors);

}
