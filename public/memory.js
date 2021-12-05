var memoryButton = document.getElementById('memory-start-button')
var blackScreen = document.getElementById('hiddenBlack')
var wordToRemember = document.getElementById('wordDisplay')
var notHidden = document.getElementById('nothidden')

var words = [ "lake", "appointment", "sense", "leash", "silk", "assume", "worth", "consensus",
  "incapable", "engine", "stumble", "blast", "combination", "drink", "guide", "craft", "separation",
  "harmony", "heat", "verdict", "reactor", "manual", "hero", "railroad", "jest", "influence", "tube",
  "wonder", "lip", "tabloid"
];

var chosenwords = [];

var wordsnumber = [];

if(window.location.href === 'http://localhost:3000/memory') {
  memoryButton.addEventListener('click', function () {
    test_setup()
    blackScreen.style.display = 'block'
    notHidden.style.display = 'none'
    displayWordsCycle()


  });

//Sleep Function Adapted from https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function displayWordsCycle() {
  for(z=0; z<10; z++)
  {
    // console.log(chosenwords[i])
    console.log(z)
    wordToRemember.textContent = chosenwords[z]
    await sleep(1000)
  }
}


  function test_setup(){
    for(i=0; i<10; i++)
    {
      var random = -1

      while (random === -1 || wordsnumber.indexOf(random) !== -1)
      {
        random = Math.floor(Math.random() * 30)
      }

      wordsnumber.push(random);
      chosenwords.push(words[random]);
    }
}


























}
