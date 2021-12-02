var reactionButton = document.getElementById('reaction-start-button')
var username = document.getElementById('username-text')
var nothidden = document.getElementsByClassName('not-hidden')
var hidden = document.getElementById('hidden')
var green = document.getElementById('green-hidden')
var timeOutput = document.getElementById('time-output')
var loglist = document.getElementById('log-list')

var sTime = 0;
var eTime = 0;

reactionButton.addEventListener('click', function() {
  console.log("event listener")
  runtest()
});


// function test(){

  // if (username.textLength == 0)
  // {
  //     alert("You must first enter a username!")
  // }

  // else if (username.textLength > 10 || username.textLength < 3)
  // {
  //   alert("Username must be between 3 and 10 characters long!")
  // }

  // else
  // {
  //   runtest()


  // }
// }

function runtest(){
  console.log("running test")
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
  updatelog(eTime-sTime)

});

function updatelog(time)
{
  // open modal to get username
  var modal = document.getElementById('modal-username-input')
  modal.style.display = 'block'

  var node = document.createElement('li')
  node.appendChild(document.createTextNode("   " + time + '  ms'))
  loglist.appendChild(node);
}
