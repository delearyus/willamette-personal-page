var Controls = {};

Controls.initWindowListeners = function () {
  document.getElementById("viewangle").addEventListener('input', function () {
    thetaY = Number(document.getElementById("viewangle").value);
    render();
  });

  document.getElementById("branchangle").addEventListener('input', function () {
    branchAngle = Number(document.getElementById("branchangle").value);
    render();
  });

  document.getElementById("branchsplits").addEventListener('input', function () {
    branchSplits = Number(document.getElementById("branchsplits").value);
    render();
  });

  document.getElementById("showoutline").addEventListener('click', function () {
    showOutline = document.getElementById("showoutline").checked;
    render();
  });

  document.getElementById("treeheight").addEventListener('input', function () {
    treeHeight = Number(document.getElementById("treeheight").value);
    render();
  });

  document.getElementById("distance").addEventListener('input', function () {
    distance = 1 / Number(document.getElementById("distance").value);
    render();
  });
}
