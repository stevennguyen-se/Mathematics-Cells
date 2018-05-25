// THE GAME CANVAS
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// FETCH GAME SETTINGS AND DATA
var cellWidth = window.cellSettings.width;
var cellHeight = window.cellSettings.height;

var cellBackgroundColor = window.cellSettings.backgroundColor;
var cellTextColor = window.cellSettings.textColor;

var cellBackgroundColor_Sign = window.cellSettings.backgroundColor_Sign;
var cellTextColor_Sign = window.cellSettings.textColor_Sign;

var cellBackgroundColor_Prime = window.cellSettings.backgroundColor_Prime;
var cellTextColor_Prime = window.cellSettings.textColor_Prime;

var cellBorderColor = window.cellSettings.borderColor;
var cellBorderLineHeight = window.cellSettings.borderLineHeight;
var cellPadding = window.cellSettings.padding;

var infoText = window.gameSettings.infoText;

var canvasBackgroundColor = window.cavasSettings.backgroudColor;
var canvasWidth = window.cavasSettings.width;
var canvasHeight = window.cavasSettings.height;

var gameTitle = window.gameSettings.gameTitle;
var gameDescription = window.gameSettings.gameDescription;

// ALL HTML ELEMENTS
var container;
var heading;
var questionH1;
var levelH3;
var scoreContainer;
var addition;
var extra;
var infoButton;
var lauchScreenButton;
var infoBoard;
var launchScreenBoard;
var launchScreenContent;
var launchScreenTitle;
var launchScreenDescription;
var timer;
var scoreSound;
var timeOutSound;
var gameOverSound;

// MATRIX - this matrix will hold all game objects when the game is running
var matrix;
var cols = 0;
var rows = 0;

// IN GAME - variables which will be used in the game
var numberLimit = window.gameData.numberLimit;
var lowerIndex = window.gameData.lowerIndex;
var upperIndex = window.gameData.upperIndex;
var timeLimit = window.gameData.timeLimit;
var bonusTime = window.gameData.bonusTime;
var difficulty = window.gameData.difficulty;
var choice_1 = null;
var choice_2 = null;
var sign = null;
var value = null;
var clear = false;
var currentScore = 0;
var question = null;
var currentLevel = 0;
var totalCells = 0;
var totalDeadCells = 0;
var isRunning = false;

// THIS IS THE MAIN FUNCTION WHICH WILL BE CALLED 1
function main() {
    // initial the game
    initial(canvasWidth, canvasHeight);
    // create necessary HTML elements in the game
    createUI();
    // load sounds
    loadSounds();
    // launch the menu screen
    launchScreen(gameTitle, gameDescription, "Play");
}


// THIS FUNCTION IS USED TO LAUNCH MENU OR GAME-OVER SCREEN
function launchScreen(title, description, buttonText) {
    // create the launch screen container
    launchScreenBoard = createDiv(null, null, ["launch-screen", "is-visible"]);

    // create a content container
    launchScreenContent = createDiv(launchScreenBoard, null, ["launch-screen-content"]);
    // create a title for the content container
    launchScreenTitle = createH(launchScreenContent, title, 1, null);
    // create a description for the content container
    launchScreenDescription = createP(launchScreenContent, description, null);
    // create a button for the content container
    lauchScreenButton = createButton(launchScreenContent, buttonText, ["launch-screen-button"]);
    // add an event to the button
    lauchScreenButton.addEventListener("click", function () {
        // hide the the launch screen container
        launchScreenBoard.classList.remove("is-visible");
        // start the game
        startGame();
    });
}

// THIS FUNCTION IS USED TO START THE GAME
function startGame() {
    // set initial values
    currentScore = 0;
    currentLevel = 0;
    totalDeadCells = 0;
    // fecth the game data based on the current level
    newLevel(currentLevel + 1);
    // display game data to the corresponding HTML elements
    updateUI();
    // draw all game objects
    draw();
    // the game is running
    isRunning = true;
    // reset the timer
    resetTimer();
    // activate the timer
    runTimer();
}

// THIS FUNCTION IS USED TO LOAD ALL NECESSARY SOUNDS
function loadSounds() {
    scoreSound = new sound(window.gameSounds.socreCounter);
    timeOutSound = new sound(window.gameSounds.timeOut);
    gameOverSound = new sound(window.gameSounds.gameOver);
}

// THIS FUNCTION IS USED TO CREATE NECESSARY HTML ELEMENTS IN THE GAME SUCH AS <DIV> OR <H1>...<H6>
function createUI() {
    // create containers for the elements
    container = createDiv(null, null, ["container"]);
    heading = createDiv(container, null, ["heading"]);

    // create and add HTML elements to the page
    questionH1 = createH(heading, question + "=?", 1, ["title"]);
    scoreContainer = createDiv(heading, "0", ["score-container"]);
    levelH3 = createH(container, currentLevel, 3, ["level"]);

    // create the timer
    timer = createDiv(container, timeLimit, ["timer"]);

    // add the game canvas to the document
    container.appendChild(canvas);

    // create info button and click event - infoBoard will hold the message which will be displayed
    infoBoard = createDiv(null, infoText, ["description"]);
    infoButton = createButton(container, "i", ["info-button"]);
    infoButton.onclick = function () {
        // hide or display the element by adding or removing the "show" class
        infoBoard.classList.toggle('show');
    };
}

// THIS FUNCTION IS USED TO RUN THE TIMER
function runTimer() {
    // set interval to change the value of the timer
    var counterDown = setInterval(function () {
        // get the current value
        var time = timer.innerText;
        // part to integer number
        var counter = parseInt(time);
        // if the counter != 0, keep decreasing the timer
        if (counter !== 0) {
            var newValue = counter - 1;
            timer.innerText = newValue.toString();
            // this the counter is small than 5, play warning sounds
            if (counter <= 5) {
                timeOutSound.play();
            }
        } else {
            // stop the timer
            clearInterval(counterDown);
            // game is over when the time is out
            gameOver();
        }
    }, 1000);
}

// THIS FUNCTION IS USED WHEN THE TIME IS OVER
function gameOver() {
    console.log("Game Over!");
    isRunning = false;
    // play the game over sound
    gameOverSound.play();
    // launch the game over screen
    launchScreen("GAME OVER", "Your score is: " + currentScore, "PLAY AGAIN!");

}

// THIS FUNCTION IS USED TO ADD BONUS SECONDS TO THE TIMER
function increaseTimer(value) {
    // get the current time
    var time = timer.innerText;
    // parse to a integer number
    var counter = parseInt(time);
    // add bonus time
    var newTime = counter + value;
    // set new value to the timer
    timer.innerText = newTime.toString();
}

// THIS FUNCTION IS USED TO RESET THE TIMER
function resetTimer() {
    timer.innerText = timeLimit;
}

// THIS FUNCTION IS USED TO CREATE 2D ARRAYS BASED ON THE NUMBER OF ROWS AND THE NUMBER OF COLUMN
// create2DArray(2, 2) -> will return a [2x2] array
function create2DArray(cols, rows) {
    var array = new Array(cols);
    for (var i = 0; i < array.length; i++) {
        array[i] = new Array(rows);
    }
    return array;
}

// THIS FUNCTION IS USED TO INITIAL THE GAME - only run 1 time
// w = the width of the game canvas and h is the height of the game canvas
function initial(w, h) {
    //add padding to the canvas
    canvas.width = w + cellPadding;
    canvas.height = h + cellPadding;

    // calculate the numbers of cols and the number of rows in the game canvas based on the Cell width and the Cell height
    cols = Math.floor(canvas.width / cellWidth);
    rows = Math.floor(canvas.height / cellHeight);
    // calculate total cells
    totalCells = cols * rows;
    // draw the canvas
    ctx.fillStyle = canvasBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // center the canvas
    canvas.classList.add("center");

    // set onclick listener to detect mouse clicks
    canvas.onclick = function (event) {
        // run the game based on the X and Y
        play(event.clientX, event.clientY);
    };

    // create a matrix based on the numbers of cols and the numbers of rows
    matrix = create2DArray(cols, rows);
}

// THIS FUNCTION IS USED TO GENERATE A RANDOM NUMBER BASED ON A GIVEN RANGE
function generateNumber(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

// THIS FUNCTION IS USED TO CLEAR IN-GAME VARIABLES - will run after performing every equation based on users' choices
function clearVaribles() {
    // clear all variables
    choice_1 = null;
    choice_2 = null;
    sign = null;
    value = null;
}

// THIS FUNCTION IS USED TO REMOVE THE STATUS OF THE CANVAS
function reset() {
    // clear the in-game variables
    clearVaribles();

    // set all game objects back
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            matrix[i][j].isChosen = false;
        }
    }

    // draw the game objects in the cavas
    draw();
}

// THIS FUNCTION IS USED DRAW ALL GAME OBJECTS IN THE CANVAS
function draw() {
    // loop though the matrix
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            // call the draw function of the current game object
            matrix[i][j].draw();
        }
    }
}

// THIS FUNCTION IS USED TO CHECK THE INPUT NUMBER IS PRIME OR NOT
function checkPrime(number) {
    if (number < 2) {
        return false;
    }

    for (var i = 2; i < number; i++) {
        if (number % i === 0) return false;
    }

    return true;
}

// THIS FUNCTION IS USED TO UPDATE CELLS - will run after performing every equation based on users' choices
function updateCells(value1, value2, newSignValue) {
    // check prime
    var isPrime = checkPrime(value1);
    // create a new cell based on the value 1 and add to the matrix
    matrix[choice_1.col][choice_1.row] = new Cell(choice_1.col, choice_1.row, cellWidth, cellHeight, cellPadding, isPrime ? cellBackgroundColor_Prime : cellBackgroundColor, cellBorderColor, cellBorderLineHeight, value1, isPrime ? cellTextColor_Prime : cellTextColor, false);
    // hold the new cell
    choice_1 = matrix[choice_1.col][choice_1.row];

    // check prime
    isPrime = checkPrime(value2);
    // create a new cell based on the value 2 and add to the matrix
    matrix[choice_2.col][choice_2.row] = new Cell(choice_2.col, choice_2.row, cellWidth, cellHeight, cellPadding, isPrime ? cellBackgroundColor_Prime : cellBackgroundColor, cellBorderColor, cellBorderLineHeight, value2, isPrime ? cellTextColor_Prime : cellTextColor, false);
    // hold the new cell
    choice_2 = matrix[choice_2.col][choice_2.row];

    // create a new sign
    sign.value = getSign(newSignValue);
}

// THIS FUNCTION IS USED TO UPDATE UI ELEMENTS - such as Level and Question
function updateUI() {
    // update question
    questionH1.innerText = question + " = ?";
    // update level
    levelH3.innerText = "LEVEL: " + currentLevel;
    // update score
    scoreContainer.innerText = currentScore;
}

// THIS FUNCTION IS USED TO GENERATE A RADOM SIGN
function getSign(value) {
    // set the boundary for the value
    if (value > 4) {
        value = 4;
    }
    if (value < 0) {
        value = 0;
    }
    switch (value) {
        case 0:
            return "+";
        case 1:
            return "-";
        case 2:
            return "*";
        case 3:
            return "/";
        case 4:
            return "%";
    }
}

// THIS FUNCTION IS USED TO CREATE A NEW GAME LEVEL
function newLevel(level) {
    // save the current level
    currentLevel = level;
    // reset the total of dead cells to 0
    totalDeadCells = 0;
    // loop through the matrix
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            // create operations
            if (i == 0) {
                matrix[i][j] = new Cell(i, j, cellWidth, cellHeight, cellPadding, cellBackgroundColor_Sign, cellBorderColor, cellBorderLineHeight, getSign(generateNumber(0, difficulty)), cellTextColor_Sign, true);
            } else {
                // create numbers
                var randomNumber = generateNumber(0, numberLimit);
                var isPrime = checkPrime(randomNumber);
                matrix[i][j] = new Cell(i, j, cellWidth, cellHeight, cellPadding, isPrime ? cellBackgroundColor_Prime : cellBackgroundColor, cellBorderColor, cellBorderLineHeight, randomNumber, isPrime ? cellTextColor_Prime : cellTextColor, false);
            }
        }
    }

    // generate a random question
    question = generateNumber(numberLimit * lowerIndex, numberLimit * upperIndex);
    // create an animation when a new question is created
    questionH1.classList.add("tada");
    // remove the animation in the next 2 seconds
    window.setTimeout(function () {
        questionH1.classList.remove("tada");
    }, 3000);
}

// THIS FUNCTION IS USED TO COMPARE THE ANSWER TO THE QUESTION
function checkAnswer(answer) {
    return answer === question;
}

// THIS FUNCTION IS USED TO UPDATE SCORE WHEN USERS PERFORM A MATH EQUATION
function updateScore(score, isExtra) {
    // increase the current score
    currentScore += score;
    // set the content of the HTML element
    scoreContainer.textContent = currentScore;
    // show the added score to the screen
    if (isExtra) {
        extra = createDiv(scoreContainer, "+" + score, ["score-extra"]);
    } else {
        addition = createDiv(scoreContainer, score >= 0 ? "+" + score : score, score >= 0 ? ["score-addition"] : ["score-subtraction"]);
    }
}

// THIS FUNCTION IS USED WHEN A MATH EQUATION IS CREATED
function calculate() {
    // check division by 0
    if ((sign.value == "/" || sign.value == "%") && choice_2.value === 0) {
        updateCells(generateNumber(0, numberLimit), choice_1.value >= 0 ? "+∞" : "-∞", generateNumber(0, difficulty));
        choice_2.die();
        totalDeadCells++;
        // if there is no valid choices left, end game
        if (totalDeadCells == totalCells - 1 - rows) {
            gameOver();
        }
        reset();
        return;
    } else {
        // calculate the value based on the users' choices
        value = eval(choice_1.value + sign.value + " " + choice_2.value);
        value = Math.floor(value);
        var difference = value - choice_2.value;
        // play sound
        scoreSound.play();
        // if 2 prime numbers are consumed, add extra score and bonus time
        if (checkPrime(choice_1.value) && checkPrime(choice_2.value) && (value - choice_2.value) >= 0) {
            updateScore(difference * 2, true);
            increaseTimer(bonusTime);
        } else {
            // update score
            updateScore(difference, false);
        }

        console.log(value);
        // if answer == question, create a new game scene
        if (checkAnswer(value)) {
            console.log("END -> New question");
            clearVaribles();
            newLevel(currentLevel + 1);
            updateUI();
            draw();
            resetTimer();
        }
        // if answer != question, create new cells
        else {
            console.log("QUESTION: " + question);
            updateCells(generateNumber(0, numberLimit), value, generateNumber(0, difficulty));
            if (Math.abs(value) > question) {
                choice_2.die();
                totalDeadCells++;
                // if there is no valid choices left, end game
                if (totalDeadCells == totalCells - 1 - rows) {
                    gameOver();
                }
            }
            reset();
        }
    }
}

// THIS FUNCTION IS USED TO RUN THE GAME BASED ON THE USERS' INPUTS (X, Y)
function play(mouseX, mouseY) {
    if (isRunning) {
        var canvasRect = canvas.getBoundingClientRect();
        // because the canvas is centered I have to transform mouse click positions to canvas positions
        var canvasX = mouseX - canvasRect.left;
        var canvasY = mouseY - canvasRect.top;

        // loop through the matrix
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                // check whether the current cell contains the input point (X, Y) or not
                if (matrix[i][j].contain(canvasX, canvasY) && matrix[i][j] != choice_1 && matrix[i][j] != choice_2 && matrix[i][j] != sign) {
                    matrix[i][j].isChosen = !matrix[i][j].isChosen;

                    // if the cell is a mathematics sign
                    if (matrix[i][j].isSign) {
                        if (choice_1) {
                            if (sign) {
                                sign.isChosen = false;
                            }
                            // set the in-game variable - sign
                            sign = matrix[i][j];
                        } else {
                            reset();
                        }
                    }
                    // if the cell is a number cell
                    else {
                        // check whether the cell is dead or not - if the cell is dead, do notthinng
                        if (matrix[i][j].checkStatus()) {

                        } else {
                            // set the in-game variable based on the value of the current cell - choice1 and choice 2
                            if (!choice_1) {
                                choice_1 = matrix[i][j];
                            } else {
                                if (!sign) {
                                    choice_1.isChosen = false;
                                    choice_1 = matrix[i][j];
                                } else {
                                    if (!choice_2) {
                                        choice_2 = matrix[i][j];
                                        // this variable is used to confirm that a math equation is created
                                        clear = true;
                                    }
                                }
                            }
                        }
                    }
                    // draw new changes to the canvas
                    draw();
                }
            }
        }

        // if a math equation is created (clear is true), calculate the function
        if (clear) {
            calculate();
            clear = false;
        }
    } else {
        return;
    }
}

// run the function "main" when the app is ready
window.onload = main;
