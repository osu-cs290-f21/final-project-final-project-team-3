var reactionButton = document.getElementById('reaction-start-button')
var username = document.getElementById('username-text')



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
    alert("Username must be within 3 and 10 characters!")
  }

  else
  {
    console.log("Successful Username")
  }
}
