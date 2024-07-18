// Setiing up the words 
const words = [];

const easyWords = [
    "Apple", "Ball", "Cat", "Dog", "Fish", "Giraffe", "Hat",
    "Igloo", "Jacket", "Kite", "Lion", "Monkey", "Nest", "Orange", "Pig",
    "Queen", "Rabbit", "Snake", "Tiger", "Umbrella", "Violin", "Whale",
    "Yacht", "Zebra", "Ant", "Bee", "Car", "Drum", "Egg", "Fan", "Goat",
    "House", "Ice", "Jug", "Key", "Leaf", "Mouse", "Nail", "Owl",
    "Pen", "Quilt", "Ring", "Star", "Table", "Unicorn", "Vase", "Water",
    "Box"
];

const mediumWords = [
    "Airport", "Bicycle", "Courage", "Dolphin", "Elephant", "Festival", "Giraffe", "Harmony",
    "Inspire", "Journey", "Kangaroo", "Library", "Mountain", "Notebook", "Ostrich", "Penguin",
    "Quarantine", "Rainbow", "Sandwich", "Treasure", "Universe", "Victory", "Whisper", "Xylophone",
    "Yesterday", "Zookeeper", "Adventure", "Butterfly", "Chocolate", "Dinosaur", "Eclipse", "Firework", "Galaxy",
    "Helicopter", "Invention", "Jellyfish", "Knowledge", "Landscape", "Meteor", "Nostalgia", "Octopus",
    "Pyramid", "Question", "Rocket", "Sunshine", "Telescope", "Umbrella", "Volcano", "Waterfall",
    "Blueprint"
];

const hardWords = [
    "Astonishment", "Benevolent", "Conundrum", "Discombobulate", "Ephemeral", "Flabbergasted", "Gastronomy", "Hypothesis",
    "Incongruous", "Juxtaposition", "Kaleidoscope", "Labyrinthine", "Metamorphosis", "Nomenclature", "Obfuscate", "Paradoxical",
    "Quintessential", "Reverberation", "Sophisticated", "Transcendental", "Ubiquitous", "Vicissitude", "Whimsical", "Xenophobia",
    "Yielding", "Zephyr", "Anachronism", "Bibliophile", "Cacophony", "Defenestration", "Ebullient", "Felicity", "Gregarious",
    "Halcyon", "Ineffable", "Jocund", "Kerfuffle", "Lugubrious", "Munificent", "Nefarious", "Obstreperous",
    "Perspicacious", "Quixotic", "Recalcitrant", "Sesquipedalian", "Tintinnabulation", "Unfathomable", "Verisimilitude", "Wanderlust",
    "Blunderbuss"
];

// Level 

const lvl = {
    easy: 6,
    medium: 5,
    hard: 4
};


// Default level

let defaultLevelName = "easy";
let defaultLevelSeconds = lvl[defaultLevelName];
let defaultLevelWords = easyWords;
words.push(...easyWords);

// Catch Selectors 

let startButton = document.querySelector(".start");
let lvlSpan = document.querySelector(".lvl");
let secondsSpan = document.querySelector(".seconds");
let wordDiv = document.querySelector(".word");
let textArea = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let remainingTime = document.querySelector(".time span");
let userScore = document.querySelector(".got");
let totalScore = document.querySelector(".total");
let finishDiv = document.querySelector(".finish");
let easyDiff = document.querySelector(".easy");
let mediumDiff = document.querySelector(".medium");
let hardDiff = document.querySelector(".hard");

// Setting level name , seconds and score

lvlSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
totalScore.innerHTML = words.length;

easyDiff.addEventListener("click", function () {
    defaultLevelName = "easy";
    defaultLevelSeconds = lvl[defaultLevelName];
    lvlSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    words.length = 0;
    words.push(...easyWords);
    totalScore.innerHTML = words.length;
})

mediumDiff.addEventListener("click", function () {
    defaultLevelName = "medium";
    defaultLevelSeconds = lvl[defaultLevelName];
    lvlSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    words.length = 0;
    words.push(...mediumWords);
    totalScore.innerHTML = words.length;
})

hardDiff.addEventListener("click", function () {
    defaultLevelName = "hard";
    defaultLevelSeconds = lvl[defaultLevelName];
    lvlSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    words.length = 0;
    words.push(...hardWords);
    totalScore.innerHTML = words.length;
})

// disaple Paste Event 

textArea.onpaste = function () {
    return false;
}

// Start Game

startButton.addEventListener("click", function () {
    this.remove();
    textArea.focus();
    // Generate Word Function
    genWard();
}
)

function genWard() {
    let word = words[Math.floor(Math.random() * words.length)];
    let wordIndex= words.indexOf(word);
    wordDiv.innerHTML = word;
    words.splice(wordIndex, 1);
    upcomingWords.innerHTML = "";
    let upcomingWord = words[Math.floor(Math.random() * words.length)];

    // Genereate Upcoming Words

    for (let i = 0; i < words.length; i++){
        let newWordDiv = document.createElement("div");
        newWordDiv.innerHTML = words[i];
        upcomingWords.appendChild(newWordDiv);
    }

    // Start Play Function
    startPlay();
}

function startPlay (){
    remainingTime.innerHTML = defaultLevelSeconds;
    let timer = setInterval( () => {
        remainingTime.innerHTML--;
        if (remainingTime.innerHTML == "0") {
            clearInterval(timer);
            if (wordDiv.innerHTML.toLowerCase() == textArea.value.toLowerCase()) {
                textArea.value = "";
                userScore.innerHTML++;
                if (words.length > 0) genWard();
                else{
                    upcomingWords.remove();
                    finishDiv.style.display = "block";
                    let winDiv = document.createElement("div");
                    winDiv.classList.add("win");
                    winDiv.innerHTML = "Congratulation!";
                    finishDiv.appendChild(winDiv);
                    textArea.disabled = true;
                    playAgain();
                }
            }
            else {
                finishDiv.style.display = "block";
                let loseDiv = document.createElement("div");
                loseDiv.classList.add("lose");
                loseDiv.innerHTML = "Game Over!";
                finishDiv.appendChild(loseDiv);
                textArea.disabled = true;
                playAgain();
            }
        }
    }, 1000);
}

// Play Again 

function playAgain () {
    let playAgain = document.createElement("div");
    playAgain.classList.add("play-again");
    playAgain.innerHTML = "Play Again";
    finishDiv.after(playAgain);
    playAgain.addEventListener("click", () => {
        location.reload();
    })
}