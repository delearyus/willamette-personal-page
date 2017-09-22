//Defines a recursive tree from given parameters:
// ns:    Number of splits per branch
// theta: rotation for each branch
// n :    number of remaining branches
// color: vec4 containing color
// ms:    the Matrix stack

function drawTree(n,ns,theta,color,width,ms) {

    //BASE CASE:
    //If n is 0, do nothing. Might change in future to add leaves?

    if (n <= 0) { return }

    //Recursion Step:
    //If n > 0, set up the proper transformations and call recursively
    
    ms.push();
    ms.multiply(scalem(width,1.0,width));
    ms.multiply(scalem(1,0.5,1));
    ms.multiply(translate(0,1,0));

    gl.uniformMatrix4fv(uModel_view, false, flatten(ms.top()));
    gl.uniform4fv(uColor, color);
    Shapes.drawPrimitive(Shapes.cylinder);

    ms.pop();
    for (var i = 0; i < ns; i++) {
        //console.log("drawing level " + n + ", i=" + i);
        ms.push();
        ms.multiply(rotateY(i * (360 / ns)));
        ms.multiply(translate(0,0,-0.5 * width));
        ms.multiply(translate(0,1,0));
        //ms.multiply(scalem(0.8, 0.8, 0.8));
        ms.multiply(rotateX(theta));
        //console.log("recursing for " + n);
        //newns = ns == 1 ? 1 : ns - 1;
        drawTree(n-1,ns,theta,color,(width * 0.7),ms);
        //console.log("finished recursing for " + n);
        ms.pop();
    }

}
