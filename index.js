var reactionButton = document.getElementById('reaction-start-button')
var username = document.getElementById('username-text')
var nothidden = document.getElementsByClassName('not-hidden')
var hidden = document.getElementById('hidden')
var green = document.getElementById('green-hidden')

var flag = 0;


reactionButton.addEventListener('click', function() {
  test()
});


function test(){

  if (username.textLength == 0)
  {
      alert("You must first enter a username!")
  }

  else if (username.textLength > 10 || username.textLength < 3)
  {
    alert("Username must be between 3 and 10 characters long!")
  }

  else
  {
    runtest()


  }
}

function runtest(){
  hidden.style.display = 'block'
  const random = Math.floor(Math.random() * 10000);
  setTimeout(changeToGreen, random)
  console.log(random)
}

function changeToGreen(){

    hidden.style.display = 'none'
    green.style.display = 'block'

}
