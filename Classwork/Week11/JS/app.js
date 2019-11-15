var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var camera;

var box, light, blueMat;
var selectedMesh = null;

var scene = createScene(); //Call the createScene function

function createScene() {

  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  // Add a camera to the scene and attach it to the canvas
  camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  
  // Add lights to the scene
  var myLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);

  // Add and manipulate meshes in the scene
  box = BABYLON.MeshBuilder.CreateBox("box", {size: .7}, scene);
  var lesserBox = BABYLON.MeshBuilder.CreateBox("box2", {size: .5}, scene);
  lesserBox.position.x = 1;
  var otherBox = BABYLON.MeshBuilder.CreateBox("box3", {size: .5}, scene);
  otherBox.position.x = -1;
  
 
  light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(1, 1, 0), scene);

   blueMat = new BABYLON.StandardMaterial("ground", scene);
   blueMat.emissiveColor = BABYLON.Color3.White();
  
  return scene;
};


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () { 
  
  //sphere.rotate(BABYLON.Axis.Y, .01, BABYLON.Space.WORLD);
  scene.render();
});


function checkUp() {
    console.log(selectedMesh.rotation.y)
}

window.addEventListener("keydown", (event) => {

    if(selectedMesh) {
        if(event.keyCode == 87) {
            TweenLite.to(selectedMesh.rotation, .1, { x: "+=20", onComplete: checkUp });
            if(lesserBox.rotation.x && otherBox.rotation.x == box.rotation.x){
              blueMat.emissiveColor = BABYLON.Color3.Green();
              return scene;
            }
        } if(event.keyCode == 83) {
          TweenLite.to(selectedMesh.rotation, .10, { x: "-=20", onComplete: checkUp });
          if(lesserBox.rotation.x && otherBox.rotation.x == box.rotation.x){
            blueMat.emissiveColor = BABYLON.Color3.Green();
            return scene;
          }
      }
    }

})

window.addEventListener("click", function () {
    // We try to pick an object
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

    pickResult.pickedMesh.material = blueMat;

    selectedMesh = pickResult.pickedMesh;
 })