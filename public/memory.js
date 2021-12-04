var memoryButton = document.getElementById('memory-start-button')

var words = [ "lake", "appointment", "sense", "leash", "silk", "assume", "worth", "consensus",
  "incapable", "engine", "stumble", "blast", "combination", "drink", "guide", "craft", "separation",
  "harmony", "heat", "verdict", "reactor", "manual", "hero", "railroad", "jest", "influence", "tube",
  "wonder", "lip", "tabloid"
];

console.log(memoryButton)


if(window.location.href === 'http://localhost:3000/memory') {
  memoryButton.addEventListener('click', function () {
    console.log("stuff")
  });

}
