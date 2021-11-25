var reactionButton = document.getElementById('reaction-start-button')
var username = document.getElementById('username-text')
var nothidden = document.getElementsByClassName('not-hidden')
var hidden = document.getElementById('hidden')

reactionButton.addEventListener('click', function() {
  test()
});



function runtest(){

  while

}

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
    hidden.style.display = 'block'
    runtest()
  }
}
