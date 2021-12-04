var reactionButton = document.getElementById('reaction-start-button')
var nothidden = document.getElementsByClassName('not-hidden')
var hidden = document.getElementById('hidden')
var green = document.getElementById('green-hidden')
var timeOutput = document.getElementById('time-output')
var loglist = document.getElementById('log-list')
var modalBackdrop = document.getElementById('modal-backdrop')
var modal = document.getElementById('modal-username-input')

var sTime = 0;
var eTime = 0;
var time = 0;

if(window.location.href === 'http://localhost:3000/reaction') {
  reactionButton.addEventListener('click', function() {
    runtest()
  });
  
  function runtest(){
    hidden.style.display = 'block'
    const random = Math.floor(Math.random() * 5000);
    setTimeout(changeToGreen, random)
  }
  
  function changeToGreen(){
  
      hidden.style.display = 'none'
      green.style.display = 'block'
      const starttime = new Date()
      starttime.getTime()
      sTime = starttime
  }
  
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
      modalBackdrop.style.display = 'none'
      modal.style.display = 'none'
  
      // reset input
      username.value = ""
      updatelog(username)
    }
  
  })
  
  function updatelog(username)
  {
  
    var context = {
      name: username,
      score: time
    }
  
    var node = Handlebars.templates.leaderboardItem(context)
    var log = document.getElementById('log-list')
    log.insertAdjacentHTML('beforeend', node)
  
    // var logTimes = document.getElementsByTagName('li')
    // var betterTime = false
    // for (var i = 0; i < logTimes.length; i++) {
    //   if (time < logTimes[i]) {
    //     log.insertAdjacentHTML('beforeend', node)
    //   }
    // }
  
  }
}


