var soundButtons = document.getElementById("soundButtons");

var soundNames = [
    "Out and About", "Crazy Feelin", 
    "Like a Boss", "Chimes", 
    "Click Clock", "Pop", "Puff","Rustle"
];

var sounds = [
    "Out_And_About_David_Renda",
    "Crazy_Feelin_David_Renda",
    "Like_A_Boss_David_Renda",
    "chimes_long", "click_clock_loop",
    "pop_10","puff", "rustle_5"
];

var soundElement = [];
sounds.forEach((soundURL, idx) => {
// soundNames.forEach((soundName) => {
   
        var newSound = new Audio("sounds/" + soundURL + ".mp3");
    
        soundElement.push(newSound);
        var newButton = document.createElement("button");
        newButton.innerHTML = soundNames[idx];
        newButton.setAttribute("data-sound-id", idx);
        soundButtons.appendChild(newButton);
        newButton.addEventListener("click", playAudioArray);
    })
//})
// var myAudio = document.getElementById("myAudio");

 function playAudioArray(event){
     var soundIndex = Number( event.target.getAttribute("data-sound-id"));

     var selectedSound = soundElement[soundIndex];

     selectedSound.play();
 }

// function stopMainAudio(){
//     myAudio.pause();
//     myAudio.currentTime = 0;
// }