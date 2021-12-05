var memoryButton = document.getElementById('memory-start-button')
var blackScreen = document.getElementById('hiddenBlack')
var wordToRemember = document.getElementById('wordDisplay')
var notHidden = document.getElementById('nothidden')
var secondModal = document.getElementById('seenUnseenModal')
var wordEvent = document.getElementById('wordEvent')
var seenButton = document.getElementById('modal-seen')
var newButton = document.getElementById('modal-new')

var words = [ "lake", "appointment", "sense", "leash", "silk", "assume", "worth", "consensus",
  "incapable", "engine", "stumble", "blast", "combination", "drink", "guide", "craft", "separation",
  "harmony", "heat", "verdict", "reactor", "manual", "hero", "railroad", "jest", "influence", "tube",
  "wonder", "lip", "tabloid"
];

var chosenwords = [];

var currentWord = 0;
var mistakes = 0;
var correct = 0;

var wordsnumber = [];

if(window.location.href === 'http://localhost:3000/memory') {
memoryButton.addEventListener('click', function () {
    test_setup()
    blackScreen.style.display = 'block'
    notHidden.style.display = 'none'
    displayWordsCycle()
    console.log(chosenwords)
  });

newButton.addEventListener('click', function () {
  console.log("currentWord =", currentWord)
  if (chosenwords.indexOf(wordEvent.textContent) !== -1)
  {
    console.log("Incorrect!")
    //show incorrect modal
    mistakes++;

    if (mistakes === 3)
    {
      secondModal.style.display = 'none'
    }

    else if (currentWord === 30)
    {
      //Start test over again
      secondModal.style.display = 'none'
    }

    else
    {
      wordEvent.textContent = words[++currentWord]
    }

  }

  else
  {
    console.log("Correct!")
    correct++

    if (currentWord === 29)
    {
      //Start test over again
      secondModal.style.display = 'none'
    }

    else
    {
      wordEvent.textContent = words[++currentWord]
    }
  }
});


seenButton.addEventListener('click', function () {
  console.log("currentWord =", currentWord)
  if (chosenwords.indexOf(wordEvent.textContent) === -1)
  {
    console.log("Incorrect!")
    //show incorrect modal
    mistakes++;

    if (mistakes === 3)
    {
      secondModal.style.display = 'none'
    }

    else if (currentWord === 29)
    {
      //Start test over again
      secondModal.style.display = 'none'
    }

    else
    {
      wordEvent.textContent = words[++currentWord]
    }

  }

  else
  {
    console.log("Correct!")
    correct++

    if (currentWord === 29)
    {
      //Start test over again
      secondModal.style.display = 'none'
    }

    else
    {
      wordEvent.textContent = words[currentWord++]
    }
  }
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
  blackScreen.style.display = 'none'
  secondModal.style.display = 'block'
  wordEvent.textContent = words[0]

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
