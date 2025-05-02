let output = document.getElementById('result');
let nodad = document.getElementById('nodad');
let timmy = document.getElementById('timmy');
let generatedNumbers = [];
let subjectsArray = [];
roastArray = [];
uniqueArray = [];
let requestCounter = 0;
let minireloads = 0;
let sentenceInput = document.querySelector('.input-sentences');

function start() {
  let numRequests = parseInt(sentenceInput.value); // Convert input to a number
  requestCounter = 0; // Reset requestCounter

  while (requestCounter < numRequests+1) {
    console.log("requestCounter:" + requestCounter);
    printed();
    requestCounter++;
  }
}



connectorArray = [
  'you about dirty as hell',
  'boy you dirty as hell',
  'you thought I was finished with you ',
  'stop playing bro',
  'boy you goofy as hell',
  'You bout ugly as hell',
  'I don\'t wanna hear it'
];

roastArray = [
  'What’s your diabetes Applebee’s green peas brown leaves with your mommy please having hump back boy',
  'And I got a question for you Didn’t you use that to get a whoopin with your mom?',
  'you boi ugly as a 2x4 cardigan with my prime rib',
  'Tell me why when you was packin yo lunch with bologna and ritz crackers and you got jumped by Iranian cockroaches started juggling juuls with despicable me',
  'you asked for a GeForce graphics card',
  'I caught you tryna smoke a pack wit a yogi bear',
  'you thought your dad died in minecraft and didnt respawn yet.',
  'you look like a double dipped chocolate chip cliff flip glazed charcoal slim jim',
  'you threw a pokeball at your dad and thought you could catch him visible.',
  'your 97 year old grandma died and you called her the GHOST RIDER',
  `I caught you doing a protest with your grandma in New York with ${creaturenum} naked mole rats doing the Harlem shake`,
  'you heard the puss in boots death whistle and called 911',
  'you thought tacobell was a bell full of tacos',
  'you thought Burger King was a member of the Royal Family',
  'you thought McDonalds was a farm and started singing the song',
  'you look like you whisper to the 17 gerbils under your bed each night before you go to sleep',
  ' with that fat gloggy booger in your nose mr clog hunch frap no feet 9 arms 7 stomachs you\'re curled up until a ball like a autistic Bakugan',
  'you\'re BUILT LIKE AN ENDERMAN WITH HEIGHT SWAPPED TO WIDTH',
  'you hack pokemon but you cant hack a new dad',
  'you look like a inbred potato brain pickle munchin swamp havin deviously handicapped off-brand Digimon character',
  'you got expelled from school for growling at a urinal cake',
  'you look like you sexually identify as if the Joker was an IRL Among Us roleplayer.',
  'You got sexually assaulted by 9 year old e-daters on roblox.com',
  'I caught you on American Idol boy',
  'you took a 3 foot long Fischer-Price wiffle ball bat shoved it up in your butt',
  'You pulled your pants down and cranked the dougie with 8 geriatric dungbeetles in the middle of an old folks home,',
  'your ears are in the nether and yo eyebrows on max brightness',
  'yo neck is in incognito mode',
  'you look like the muffin mans drug dealer',
  'you got a level 7 diglet stickin out the top of yo head',
  'your ears are in the nether and yo eyebrows on max brightness'
];

function uniqueRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var creaturenum = 0;
var oldage = 0;
var subject = 0;

function GenerateSpecialNum() {
  creaturenum = uniqueRandomNumber(1,21);
  oldage = uniqueRandomNumber(50,100);
  age = uniqueRandomNumber(21,50);
  youngage = uniqueRandomNumber(1,20)
}

function add(value) {
  output.innerHTML += " " + value;
  console.log("roast added");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let roastIndex = 0;
let connectorIndex = 0;
let shuffledConnectors = shuffleArray(connectorArray);
IntUntilConnector = 0;
let usedRoasts = [];

function getNewRoast() {
  if (usedRoasts.length === roastArray.length) {
    usedRoasts = [];
  }

  let roastIndex = Math.floor(Math.random() * roastArray.length);
  let roast = roastArray[roastIndex];

  while (usedRoasts.includes(roast)) {
    roastIndex = Math.floor(Math.random() * roastArray.length);
    roast = roastArray[roastIndex];
  }

  usedRoasts.push(roast);

  return roast;
}


function getNewConnector() {
  if (connectorIndex >= connectorArray.length) {
    shuffledConnectors = shuffleArray(connectorArray);
    connectorIndex = 0;
  }
  return shuffledConnectors[connectorIndex++];
}

let SpecialNum = 0;

function printed() {
  console.log("work");
  SpecialNum = GenerateSpecialNum();
  let chosenRoast = getNewRoast();
  let chosenConnector = getNewConnector();
  IntUntilConnector++;
  if (requestCounter > 0) {
    console.log("request counter good");
    console.log(IntUntilConnector);
    if (IntUntilConnector == 5) {
      console.log("connector adding")
      add(`${chosenConnector}`);
      IntUntilConnector = 0;
    }
    add(`${chosenRoast}`);
  } else {
    SpecialNum = GenerateSpecialNum();
  }
}

sentenceInput.addEventListener('input', function () {
  console.log(sentenceInput.value);
});

