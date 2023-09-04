const mainPageSect = document.getElementById('main-page')
const mainPageContainer = document.getElementById('main-page-container')
const modeBtns = mainPageSect.getElementsByClassName('mode-buttons')
const classicModeBtn = document.getElementById('classicModeBtn')
const twoBtnsModeBtn = document.getElementById('twoBtnsModeBtn')
const distracitonsModeBtn = document.getElementById('distractionModeBtn')
const multicolorModeBtn = document.getElementById('multicolorModeBtn')
const testBoardSect = document.getElementById('test-board')
const testBoardContainer = document.getElementById('test-board-container')
const testInfoSect = document.getElementById('test-info')
const testInfoContainer = document.getElementById('test-info-container')
const infoText = document.getElementById('info-text')
let start = 0
let finish = 0
let showGreenVar

const test = {
    minTimeToGreen: 500,
    maxTimeToGreen: 1000, //Zmienić na 5000
    totalAttempts: 5,
    attemptsToGo: 5,
    times: [],
    oneBtn: true,
    distractions: false,
    mulitcolor: false,
    startTime: 0,
    finishTime: 0,

    classicStart: function() {
        test.attemptsToGo = 3 //Zmienic na 5
        test.totalAttempts = 3
        test.times = []
        test.oneBtn = true
        test.distractions = false
        test.mulitcolor = false
        mainPageSect.style.display = "none"     
        testInfoSect.style.display = "block"
        infoText.innerHTML = "Click to start"
        testInfoContainer.removeEventListener("click", test.classicStart)
        testInfoContainer.addEventListener("click", test.classicOneAttempt)
        
    },
    classicOneAttempt: function() {
        testInfoContainer.removeEventListener("click", test.classicOneAttempt)
        testBoardContainer.addEventListener("mousedown", test.falseStartClassic)
        testInfoSect.style.display = "none"
        testBoardSect.style.display = "block"
        timeToGreen = Math.floor(Math.random() * (test.maxTimeToGreen-test.minTimeToGreen+1) + 450)
        showGreenVar = window.setTimeout(() => {
            console.log("green")
            testBoardContainer.removeEventListener("mousedown", test.falseStartClassic)
            testBoardContainer.style.backgroundColor = "green"
            test.startTime = performance.now()
            testBoardContainer.addEventListener("mousedown",test.finishClassicAttempt)
            check = performance.now()
                console.log("Wasted time: ", check - test.startTime)
        },timeToGreen)
    },
    finishClassicAttempt: function() {
        test.finishTime = performance.now()
        testBoardContainer.removeEventListener("mousedown",test.finishClassicAttempt) 
        testInfoContainer.style.backgroundColor = "var(--infoColor)"
        attemptSpeed = Math.floor(test.finishTime,0)-Math.floor(test.startTime,0)
        test.times.push(attemptSpeed)  
        
        console.log(test.times)
        testInfoSect.style.display = "block"
        testInfoContainer.style.backgroundColor = "var(--infoColor)"
        testBoardSect.style.display = "none"
        testBoardContainer.style.backgroundColor = "var(--infoColor)"
        test.attemptsToGo -= 1 

        if (test.attemptsToGo > 0) { 
            infoText.innerHTML = 'Reaction: ' + attemptSpeed + " ms"
            testInfoContainer.addEventListener("click", test.classicOneAttempt)
        } else {
            averageTime = Math.floor(test.times.reduce((x, y) => { return x + y },0) / test.totalAttempts)
            infoText.innerHTML = 'Reaction: ' + attemptSpeed + " ms<br>Average time of " + test.totalAttempts + ": " + averageTime + " ms<br><br>Click to try again"
            testInfoContainer.addEventListener("click", test.classicStart)
        }
    },
    falseStartClassic: function() {
        console.log("false")
        testBoardContainer.removeEventListener("mousedown", test.falseStartClassic)
        clearTimeout(showGreenVar)    
        testInfoSect.style.display = "block"
        testInfoContainer.style.backgroundColor = "var(--testRed)"
        testBoardSect.style.display = "none"
        testBoardContainer.style.backgroundColor = "var(--infoColor)"

        infoText.innerHTML = 'False start<br><br>Click to try again '
        testInfoContainer.addEventListener("click", test.classicOneAttempt)

    }
}
classicModeBtn.addEventListener("click",test.classicStart)



