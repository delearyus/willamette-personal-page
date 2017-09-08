
var circles = [];
var canvas;
var rect;

function Circle(x,y) {
  this.radius = Math.random() * 90 + 10;
  this.x =      x;
  this.y =      y;
  this.color = 'black';
  circles.push(this);
  this.drawCircle();
}



window.onload = function init()
{
  canvas = document.getElementById("gl-canvas");
  var parent = document.getElementById("canvas-parent");
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  rect = canvas.getBoundingClientRect();
  //alert("hello");

  setCanvasColor("#84c3f9");

  canvas.addEventListener("mousedown", function (event) {
    rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var click = event.button;
    if (event.button == 0 && event.shiftKey) {
      index = findIndexfromPosition(x,y);
      bringtoFront(index);
    } else if (event.button == 0) {
      new Circle(x,y);
    } else if (event.button == 2) {
      changeColors();
    }
  });

  window.addEventListener("resize", function () {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      for (i = 0; i < circles.length; i++) {
          circles[i].drawCircle();
      }
  });
  //setInterval(changeColors,100); //only enable this if you are mean
}

function setCanvasColor(color) {
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.strokeStyle = 'black';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

Circle.prototype.drawCircle = function() {
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

function changeColors() {
  //setCanvasColor(randomrgb()); // only enable this if you are mean
  for (i = 0; i < circles.length; i++) {
    newcolor = randomrgb();
    circles[i].color = newcolor;
    circles[i].drawCircle();
  }
}

function randomrgb(){
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  return "rgb("+r+","+g+","+b+")";
}

function findIndexfromPosition(mouseX,mouseY) {
  for (i = circles.length - 1; i > -1; i--) {
    circ = circles[i];
    dx = Math.abs(mouseX - circ.x);
    dy = Math.abs(mouseY - circ.y);
    totaldist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    check = totaldist < circ.radius;
    if (check) {
      return i;
      break;
    };
  }
}

function bringtoFront(index) {
  if (index == null) {
    return;
  };
  topcirc = circles[index];
  before = circles.slice(0,index);
  after = circles.slice(index+1);
  circles = before.concat(after);
  circles.push(topcirc);
  for (i = 0; i < circles.length; i++) {
    circles[i].drawCircle();
  }
}
