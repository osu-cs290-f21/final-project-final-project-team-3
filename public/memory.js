var memoryButton = document.getElementById('memory-start-button')
var blackScreen = document.getElementById('hiddenBlack')
var wordToRemember = document.getElementById('wordDisplay')
var notHidden = document.getElementById('nothidden')
var secondModal = document.getElementById('seenUnseenModal')
var wordEvent = document.getElementById('wordEvent')
var seenButton = document.getElementById('modal-seen')
var newButton = document.getElementById('modal-new')
var lives = document.getElementById('lives')
var loglist = document.getElementById('log-list')
var leaderboard = document.getElementById('board-list')

// var leaderboardData = require('./leaderboardData.json')


var words = [ "lake", "appointment", "sense", "leash", "silk", "assume", "worth", "consensus",
  "incapable", "engine", "stumble", "blast", "combination", "drink", "guide", "craft", "separation",
  "harmony", "heat", "verdict", "reactor", "manual", "hero", "railroad", "jest", "influence", "tube",
  "wonder", "lip", "tabloid"
];

var chosenwords = [];

var currentWord = 0;
var mistakes = 0;
var correct = 0;
var logArray = []

var wordsnumber = [];

if(window.location.href === 'http://localhost:3000/memory') {
memoryButton.addEventListener('click', function () {
    test_setup()
    blackScreen.style.display = 'block'
    notHidden.style.display = 'none'
    displayWordsCycle()
  });

  function closeModal()
  {
    modalBackdrop.style.display = 'none'
    modal.style.display = 'none'
    document.getElementById('username-input-element').value = ""
  }

  var modalCancel = document.getElementById('modal-cancel')
  modalCancel.addEventListener('click', function(){
    closeModal()
  })

  var modalClose = document.getElementById('modal-close')
  modalClose.addEventListener('click', function(){
    closeModal()
  })

  newButton.addEventListener('click', function () {
  if (chosenwords.indexOf(wordEvent.textContent) !== -1)
  {
    // highlighting incorrect animation, DOCUMENTATION: https://css-tricks.com/restart-css-animation/
    this.classList.remove("animationIncorrect");
    this.classList.remove("animationCorrect");
    void this.offsetHeight;
    this.classList.add("animationIncorrect");

    mistakes++;

    if (mistakes === 3 || currentWord === 29)
    {
      exitTest()
    }

    else
    {
      if (mistakes === 1)
      {
        lives.textContent = "2"
      }

      else if (mistakes === 2)
      {
        lives.textContent = "1"
      }

      wordEvent.textContent = words[++currentWord]

    }

  }

  else
  {
    // highlighting correct animation, DOCUMENTATION: https://css-tricks.com/restart-css-animation/
    this.classList.remove("animationCorrect");
    this.classList.remove("animationIncorrect");
    void this.offsetHeight;
    this.classList.add("animationCorrect");
    correct++

    if (currentWord === 29)
    {
      exitTest()
    }

    else
    {
      wordEvent.textContent = words[++currentWord]
    }
  }
});


seenButton.addEventListener('click', function () {
  if (chosenwords.indexOf(wordEvent.textContent) === -1)
  {
    // highlighting incorrect animation, DOCUMENTATION: https://css-tricks.com/restart-css-animation/
    this.classList.remove("animationIncorrect");
    this.classList.remove("animationCorrect");
    void this.offsetHeight;
    this.classList.add("animationIncorrect");

    mistakes++;

    if (mistakes === 3 || currentWord === 29)
    {
      exitTest()
    }

    else
    {
      if (mistakes === 1)
      {
        lives.textContent = "2"
      }

      else if (mistakes === 2)
      {
        lives.textContent = "1"
      }

      wordEvent.textContent = words[++currentWord]
    }

  }

  else
  {

    // highlighting correct animation, DOCUMENTATION: https://css-tricks.com/restart-css-animation/
    this.classList.remove("animationCorrect");
    this.classList.remove("animationIncorrect");
    void this.offsetHeight;
    this.classList.add("animationCorrect");

    correct++;

    if (currentWord === 29)
    {
      exitTest()
    }

    else
    {
      wordEvent.textContent = words[++currentWord]
    }
  }
});



function exitTest()
{
  secondModal.style.display = 'none'
  notHidden.style.display = 'block'
  chosenwords = []
  wordsnumber = []
  mistakes = 0

  // open modal to get username
  modalBackdrop.style.display = 'block'
  modal.style.display = 'block'

}

// get username/listen for submit click
var submit = document.getElementById('modal-submit')
submit.addEventListener('click', function() {

  var username = document.getElementById('username-input-element').value
  if (!username) {
    alert("Please enter a username")
  }
  else {
    // close modal
    document.getElementById('username-input-element').value = ""
    modalBackdrop.style.display = 'none'
    modal.style.display = 'none'

    // reset input
    username.value = ""
    updatelog(username)
    updateLeaderboard(username)
  }

})

function updatelog(username) {

  var context = {
    name: username,
    score: correct
  }


  logArray.push(context)
  logArray.sort(function(a, b) {
    return b.score - a.score
  })


  if (loglist) {
    var lis = document.querySelectorAll('#log-list li');
    for (var i = 0; i < lis.length; i++) {
        li = lis[i]
        li.parentNode.removeChild(li);
    }
  }

  for (var i = 0; i < logArray.length; i++) {
    var node = Handlebars.templates.leaderboardItem(logArray[i])
    loglist.insertAdjacentHTML('beforeend', node)
  }

}

function updateLeaderboard(username) {

  // We use an axios request library to make a request to my backend
  // Source: https://axios-http.com/docs/post_example
  axios.post('/memory/leaderboard', {
    name: username,
    score: correct
  }).then(function (resp) {

    // Get the response data

    // Delete all the old leaderboard li
    var lis = document.querySelectorAll('#board-list li');
      for (var i = 0; i < lis.length; i++) {
          li = lis[i]
          li.parentNode.removeChild(li);
      }

    // Get array from data
    var newTop5 = resp.data

    // Loop over all data
    for (var i = 0; i < newTop5.length; i++){
      var node = Handlebars.templates.leaderboardItem(newTop5[i])

      // Insert the new node
      leaderboard.insertAdjacentHTML('beforeend', node)
    }
  }).catch(function (err) {
      // If there is an error output error
      alert("Error saving score: " + username)
  })
}


//Sleep Function Adapted from https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function displayWordsCycle() {
  for(z=0; z<10; z++)
  {
    wordToRemember.textContent = chosenwords[z]
    await sleep(1000)
  }
  blackScreen.style.display = 'none'
  secondModal.style.display = 'block'
  wordEvent.textContent = words[0]

}


  function test_setup(){

    correct = 0
    lives.textContent = "3"


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
