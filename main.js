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
const testBoardLeftSide = document.getElementById('test-board-left-side')
const testBoardRightSide = document.getElementById('test-board-right-side')

let start = 0
let finish = 0
let showGreenVar

const test = {
    minTimeToGreen: 1000,
    maxTimeToGreen: 1000, //Zmienić na 5000
    totalAttempts: 5,
    attemptsToGo: 5,
    times: [],
    greenSide: 3,
    leftDone: false,
    rightDone: false,
    oneBtn: true,
    distractions: false,
    mulitcolor: false,
    startTime: 0,
    finishTime: 0,

    //classic mode

    classicStart: function() {
        test.attemptsToGo = 5 //Zmienic na 5
        test.totalAttempts = 5
        test.times = []
        test.oneBtn = true
        test.distractions = false
        test.mulitcolor = false
        mainPageSect.style.display = "none"     
        testInfoSect.style.display = "block"
        infoText.innerHTML = "<h1>Click to start</h1><br>Click on green"
        testInfoContainer.removeEventListener("click", test.classicStart)
        testInfoContainer.addEventListener("click", test.classicOneAttempt)
        
    },
    classicOneAttempt: function() {
        testInfoContainer.removeEventListener("click", test.classicOneAttempt)
        testBoardContainer.addEventListener("mousedown", test.falseStartClassic)
        testInfoSect.style.display = "none"
        testBoardSect.style.display = "block"
        timeToGreen = Math.floor(Math.random() * (test.maxTimeToGreen-test.minTimeToGreen+1) + test.minTimeToGreen)
        console.log(timeToGreen)
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

    },

    //two buttons mode 

    twoBtnsStart: function() {
        test.attemptsToGo = 3 //Zmienic na 5
        test.totalAttempts = 3
        test.times = []
        test.oneBtn = false
        test.distractions = false
        test.mulitcolor = false
        mainPageSect.style.display = "none"     
        testInfoSect.style.display = "block"
        infoText.innerHTML = "<h1>Click to start</h1><br>Click left button when the left side turns green, right when the right side turns green and both when whole screen is green"
        testInfoContainer.removeEventListener("click", test.twoBtnsStart)
        testInfoContainer.addEventListener("click", test.twoBtnsOneAttempt)
    },
    twoBtnsOneAttempt: function() {
        console.log(test.attemptsToGo)
        testInfoContainer.removeEventListener("click", test.twoBtnsOneAttempt)
        testBoardContainer.addEventListener("mousedown", test.twoBtnsFalseStart)
        testInfoSect.style.display = "none"
        testBoardSect.style.display = "block"
        timeToGreen = Math.floor(Math.random() * (test.maxTimeToGreen-test.minTimeToGreen+1) + test.minTimeToGreen)
        console.log(timeToGreen)
        //test.greenSide = Math.floor(Math.random() * 3 + 1) // 1 - left, 2 - right, 3 - both
        test.greenSide = 1
        showGreenVar = window.setTimeout(() => {
            switch(test.greenSide){
                case 1:
                    console.log("case1")
                    test.rightDone = true
                    test.leftDone = false
                    testBoardLeftSide.style.backgroundColor = "var(--testGreen)"
                    // test.wrongSideTwoBtns(2) //  pass number of wrong side, NOT green one
                    break   
                case 2:
                    console.log("case2")
                    test.rightDone = false
                    test.leftDone = true
                    testBoardRightSide.style.backgroundColor = "var(--testGreen)"
                    // test.wrongSideTwoBtns(1)
                    break
                case 3:
                    test.rightDone = false
                    test.leftDone = false
                    testBoardLeftSide.style.backgroundColor = "var(--testGreen)"
                    testBoardRightSide.style.backgroundColor = "var(--testGreen)"
                    break
            }
            test.startTime = performance.now()
            testBoardContainer.removeEventListener("mousedown", test.twoBtnsFalseStart)
            testBoardContainer.addEventListener("mousedown", twoBtnsClicked = (event) => test.twoBtnsSideClicked(event))
            //testBoardRightSide.addEventListener("mousedown",test.twoBtnsRightSideClicked) //find event like mousedown to right button
            // testBoardContainer.addEventListener("mousedown",test.finishClassicAttempt) adjust to two buttons in progress
            check = performance.now()
                console.log("Wasted time: ", check - test.startTime)
        },timeToGreen)
    },
    twoBtnsFalseStart: function() {
        console.log("false start")
    },
    twoBtnsWrongSide: function() {
        testBoardContainer.removeEventListener("mousedown", test.falseStartClassic)
        clearTimeout(showGreenVar)    
        testInfoSect.style.display = "block"
        testInfoContainer.style.backgroundColor = "var(--testRed)"
        testBoardSect.style.display = "none"
        testBoardContainer.style.backgroundColor = "var(--infoColor)"
        infoText.innerHTML = '<h1>Wrong side</h1><br><br>Click to try again '
        testInfoContainer.addEventListener("click", test.twoBtnsOneAttemptOneAttempt)
    },
    twoBtnsSideClicked: function(event) {
        console.log("Side" + event.button)
        if (event.button === 0) {
            if(test.greenSide === 2) {
                test.twoBtnsWrongSide()
            } else {
                if (test.rightDone) {
                    test.twoBtnsFinishAttempt()
                } else {
                    test.leftDone = true
                }
            }
        } else if (event.button === 2) {
            console.log("right")
            if(test.greenSide === 1) {
                test.twoBtnsWrongSide()
            } else {
                if (test.leftDone) {
                    test.twoBtnsFinishAttempt()
                } else {
                    test.leftRight = true
                }
            }
        }
    },
    twoBtnsFinishAttempt: function() {
        test.finishTime = performance.now()
        testBoardContainer.removeEventListener("mousedown", twoBtnsClicked)
        testInfoContainer.style.backgroundColor = "var(--infoColor)"
        attemptSpeed = Math.floor(test.finishTime,0)-Math.floor(test.startTime,0)
        test.times.push(attemptSpeed)  
        
        testInfoSect.style.display = "block"
        testInfoContainer.style.backgroundColor = "var(--infoColor)"
        testBoardSect.style.display = "none"
        testBoardLeftSide.style.backgroundColor = "var(--infoColor)"
        testBoardRightSide.style.backgroundColor = "var(--infoColor)"
        test.attemptsToGo -= 1 
        console.log(test.attemptsToGo)

        if (test.attemptsToGo > 0) { 
            infoText.innerHTML = 'Reaction: ' + attemptSpeed + " ms"
            testInfoContainer.addEventListener("click", test.twoBtnsOneAttempt)
        } else {
            averageTime = Math.floor(test.times.reduce((x, y) => { return x + y },0) / test.totalAttempts)
            infoText.innerHTML = 'Reaction: ' + attemptSpeed + " ms<br>Average time of " + test.totalAttempts + ": " + averageTime + " ms<br><br>Click to try again"
            testInfoContainer.addEventListener("click", test.twoBtnsStart)
        }
    }
}
classicModeBtn.addEventListener("click",test.classicStart)
twoBtnsModeBtn.addEventListener("click",test.twoBtnsStart)
// testBoardContainer.addEventListener("contextmenu", event => event.preventDefault())
// testInfoContainer.addEventListener("contextmenu", event => event.preventDefault())


