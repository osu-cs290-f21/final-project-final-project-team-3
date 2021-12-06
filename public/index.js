var reactionButton = document.getElementById('reaction-start-button')
var nothidden = document.getElementsByClassName('not-hidden')
var hidden = document.getElementById('hidden')
var green = document.getElementById('green-hidden')
var timeOutput = document.getElementById('time-output')
var loglist = document.getElementById('log-list')
var modalBackdrop = document.getElementById('modal-backdrop')
var modal = document.getElementById('modal-username-input')
var leaderboard = document.getElementById('board-list')

var flag = 0;
var sTime = 0;
var eTime = 0;
var time = 0;
var logArray = []

if(window.location.href === 'http://localhost:3000/reaction') {
  reactionButton.addEventListener('click', function() {
    runtest()
  });

  function closeModal()
  {
    modalBackdrop.style.display = 'none'
    modal.style.display = 'none'
    document.getElementById('username-input-element').value = ""
  }

  var modalCancel = document.getElementById('modal-cancel')
  modalCancel.addEventListener('click', function(){
    console.log("cancel button event listener")
    closeModal()
  })

  var modalClose = document.getElementById('modal-close')
  modalClose.addEventListener('click', function(){
    console.log("close button event listener")
    closeModal()
  })

  function runtest(){
    hidden.style.display = 'block'
    const random = Math.floor(Math.random() * 5000);
    setTimeout(changeToGreen, random)
  }

  function changeToGreen(){
      if (flag === 0)
      {
        hidden.style.display = 'none'
        green.style.display = 'block'
        const starttime = new Date()
        starttime.getTime()
        sTime = starttime
      }

      flag = 0;
  }


  hidden.addEventListener('click' , function() {
      alert("Do not click until the screen turns green!")
      hidden.style.display = 'none'
      flag = 1;

  });

  green.addEventListener('click', function() {

    const endtime = new Date()
    endtime.getTime()
    eTime = endtime
    timeOutput.textContent = eTime - sTime + " ms";
    green.style.display = 'none'
    time = eTime-sTime

    // open modal to get username
    modalBackdrop.style.display = 'block'
    modal.style.display = 'block'

  });

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

  function updatelog(username)
  {

    var context = {
      name: username,
      score: time
    }

    // console.log("logArray unsorted:", logArray)
    logArray.push(context)
    logArray.sort(function(a, b) {
      return a.score - b.score
    })
    // console.log("logArray sorted:", logArray)

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

  
}

function updateLeaderboard(username) {
  // add sorting here and only do rest of function if it fits in leaderboard

  var req = new XMLHttpRequest()
  req.open('POST', '/reaction/leaderboard')

  var context = {
    name: username,
    score: time
  }
  var reqBody = JSON.stringify(context)

  req.addEventListener('load', function (event) {
    if (event.target.status === 200) {
      var node = Handlebars.templates.leaderboardItem(context)
      leaderboard.insertAdjacentHTML('beforeend', node)
    } else {
      alert("Error saving score: " + event.target.response)
    }
  })

  req.setRequestHeader('Content-Type', 'application/json')
  req.send(reqBody)
}
