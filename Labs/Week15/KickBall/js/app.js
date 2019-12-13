var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var camera, scene, ball, goal, timeoutId, particle;

scene = createScene();
engine.runRenderLoop(function(){
    scene.render();
})

scene.registerAfterRender(function(){
    if(ball.intersectsMesh(goal, false)){
        console.log("Goal?");
        goal.position.x = (Math.random()*10) - 4;

        particle.manuelEmitCount = 21;
        particle.start();

        particle.minEmitBox = ball.position;
        particle.minEmitBox = ball.position;


        resetBall();
    }
})
function createScene(){
    var scene = new BABYLON.Scene(engine);

    camera = new BABYLON.UniversalCamera("UC", new BABYLON.Vector3(0,0,-25), scene);

    var light = new BABYLON.DirectionalLight("lumos", new BABYLON.Vector3(0, -2.5, 1), scene);

    var gravityVector = BABYLON.Vector3(0, -9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    ball = BABYLON.MeshBuilder.CreateSphere("orb", {diameter: 1}, scene);
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(
        ball, BABYLON.PhysicsImpostor.SphereImpostor,
        {mass: 1, restitution: .2}, scene
        );

    var ground = BABYLON.MeshBuilder.CreateGround("lava", {height: 20, width: 20, subdivision: 4}, scene);
    ground.position.y = -3;
    ground.position.x = 0;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground, BABYLON.PhysicsImpostor.BoxImpostor,
        {mass:0, restitution:.9}, scene
        );

        goal = new BABYLON.MeshBuilder.CreateBox('goal', {height:5, width: 10}, scene);
        goal.position.z = 19;
        goal.position.y = -2;
        goal.position.x = (Math.random()*10) - 4;

        particle = new BABYLON.ParticleSystem("GoalExplosion", 2000, scene);
        particle.emmiter = new BABYLON.Vector3(0,0,0);
        particle.minEmitPower = 1;
        particle.maxEmitPower = 3;
        particle.addVelocityGradient(0,2);
        particle.start();

        particle.particleTexture = new BABYLON.Texture("images/particle.JPEG", scene);

    return scene;


}
function resetBall(){
ball.position = new BABYLON.Vector3();

ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3());
ball.physicsImpostor.setAngularVelocity(new BABYLON.Vector3());


clearTimeout(timeoutId);


}

window.addEventListener("click", function(){
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var selectedObject = pickResult.pickedMesh; 

    if(selectedObject){

        if(selectedObject.tag = "ball"){
        var surfaeNormal = pickResult.getNormal(true);
        var forceDirection = surfaeNormal.scale(-5000);

        selectedObject.physicsImpostor.applyForce(
            forceDirection,
            selectedObject.getAbsolutePosition()
        )

        timeoutId = setTimeout(resetBall, 4500);
        }

    }
})
