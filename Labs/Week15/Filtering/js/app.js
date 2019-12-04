var canvas = document.getElementById("renderCanvas");
var rgCost = document.getElementById("rgCost");
var infoBox = document.getElementById("infoBox");
var filterButtons = document.querySelectorAll(".filterNav");
var camera, scene, data, selectedPieces, selectedType;

//console.log(filterButtons);

fetch("data/furniture.json", {method: 'get'})
    .then(response => response.json())
    .then((jsonData) => {

        //console.log(jsonData);
        data = jsonData;

        data.furniture.forEach((piece, idx) =>{
           var p = BABYLON.SceneLoader.ImportMesh(
               "", "./models/house/", piece.asset, scene,
               (meshes) => {
                   var contanierNode = new BABYLON.TransformNode("root");
                   piece.asset = contanierNode;
                   piece.asset.dataId = idx;

                   meshes.forEach((mesh)=> {
                       mesh.parent = contanierNode;
                   })
               }
               ); 
               
        })

        //console.log(data);
    })


var engine = new BABYLON.Engine(canvas,true);

scene = createScene();
engine.runRenderLoop(function(){
    scene.render();
})

function createScene(){
    var scene = new BABYLON.Scene(engine);

    camera = new BABYLON.ArcRotateCamera(
        "c", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene
    );

    var light = new BABYLON.DirectionalLight(
        "l", new BABYLON.Vector3(0,-5,1.0), scene
    )

   // var bed = BABYLON.SceneLoader.Append("./models/house/", "bedSingle.obj", scene);



    return scene;
}

function selectType(event){
    selectedType = event.target.getAttribute("data-type");

    filterButtons.forEach((button)=>{button.classList.remove("selected")});
        

    event.target.classList.add("selected");
}

function showAvailable(){

    var amount = Number(rgCost.value);

    selectedPieces = data.furniture.filter((piece)=>{
        if(selectedType == "all"){
            return piece.price < amount;
        } else {
            return (piece.price < amount) && (piece.type == selectedType);
        }
       
   
    })

    console.log(selectedPieces);

    data.furniture.forEach((piece) => {
        TweenLite.to(piece.asset.position, .7, {y:5, onComplete: showFiltered})
    })
}

function showFiltered(){
    selectedPieces.forEach((piece, idx)=>{
        TweenLite.to(piece.asset.position, .7, {y:0, x: idx})
    })
}

window.addEventListener("click", function(){
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var selectedObject = pickResult.pickedMesh;

    if(selectedObject){
        var dataId = selectedObject.parent.dataId;

        var itemInfo = data.furniture[dataId];
        console.log(itemInfo);
        infoBox.innerHTML = `${itemInfo.style} ${itemInfo.type}: $${itemInfo.price}`;

    }
})