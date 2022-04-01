const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let flippedCard = 0;
let emptyClick = false;
let score = 0;
let lowScore = localStorage.getItem("low-score");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black"
];

if (lowScore) {
  document.getElementById("low-score").innerText = "Best score: " + lowScore;
}
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
function setScore(newScore) {
  score = newScore;
  document.getElementById("score").innerText = "Score: " + score;
}

// TODO: Implement this function!
function handleCardClick(e) {
  if (emptyClick) return;
  if (e.target.classList.contains("flipped")) return;

  let cardClicked = e.target;
  cardClicked.style.backgroundColor = cardClicked.classList[0];
  //console.log("you just clicked", e.target);
  if (!firstCard || !secondCard) {
    cardClicked.classList.add("flipped");
    firstCard = firstCard || cardClicked;
    secondCard = cardClicked === firstCard ? null : cardClicked;
    setScore(score + 1);
}
  if (firstCard && secondCard) {
    emptyClick = true;

    let firstColor = firstCard.className;
    let secondColor = secondCard.className;
    
    if (firstColor === secondColor){
      flippedCard += 2;
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = null;
      secondCard = null;
      emptyClick = false;
    }
    else {
      setTimeout(function() {
      firstCard.style.backgroundColor = "";
      secondCard.style.backgroundColor = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      secondCard = null
      emptyClick = false;
    }, 500);
  }
  }
  if (flippedCard === COLORS.length) {
    let lowScore = +localStorage.getItem("low-score") || Infinity;
    if (score < lowScore) {
      localStorage.setItem("low-score", score);
    if (alert("You have won!")){}
    else window.location.reload();
  } 
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
