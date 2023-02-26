
// ИГРА
// Нажав на кнопку начать игра запускается, генерируется задача,
// пользователь может вводить ответ
// появляется кнопка проверить

// Нажав кнопку проверить мы сравниваем ввод пользователя с ответом
// Вывести результат и правильное значение, 
// сменить кнопку на начать заново


const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0)
    return randomNum
}

const getTask = () => {

    const symbol = (Math.random() > 0.5) ? "+" : "-"
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
    gameState.rightAnswer = eval(task)
    return task
}

const toggleGameState = () => {
    gameState.taskInProcess = !gameState.taskInProcess
}

const gameElements = document.getElementById("my_game").children
const title = gameElements[0]
const userTask = gameElements[1]
const userAnswer = gameElements[2]
const btnGame = gameElements[3]

const gameState = {
    taskInProcess: false,
    rightAnswer: null,
}


const startGameFunc = () => {

    if (!gameState.taskInProcess) {
        title.innerText = "Игра началась"
        userAnswer.value = null
        // генерирует задачу и ответ
        // const task = getTask()
        // показываем задачу пользователю
        // userTask.innerText = task
        userTask.innerText = getTask()
        userAnswer.hidden = false
        // меняю кнопку и меняю состояние
        btnGame.innerText = "Проверить!"
        // gameState.taskInProcess = true
        toggleGameState()
    } else {
        // сравнить ответ с правильным
        const isRight = gameState.rightAnswer == userAnswer.value
        // вывести результат
        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
        // вывести поздравление
        title.innerText = (isRight) ? "ВЕРНО!" : "НЕ ВЕРНО!"
        // поменять кнопку и состояние
        btnGame.innerText = "Начать заново"
        // gameState.taskInProcess = false
        toggleGameState()
    }
}

btnGame.addEventListener("click", startGameFunc)
userAnswer.addEventListener("keydown", (e) => {
    // console,log(e)
    if (e.key === "Enter") {
        startGameFunc()
    }
    else if (e.key === "Escape") {
        userAnswer.blur()
    }
})









const choosedE1 = document.querySelectorAll(".choosed_block-container > div")
const counterEl = document.querySelector(".choosed_block span")

const choosedState = {
    countElement: 0,
    setCountValue(value) {
        this.countElement += value
        counterEl.innerText = this.countElement
    }
}

const evenFunc = (e) => {
    if (e.target.className === "") {
        e.target.className = "choosed_element"
        choosedState.setCountValue(1)
    } else {
        e.target.className = ""
        choosedState.setCountValue(-1)
    }
}


for (let i = 0; i < choosedE1.length; i++) {
    choosedE1[i].addEventListener("click", evenFunc)
}
// choosedE1[2].removeEventListener("click", evenFunc) 


// 6 lesson
//----------------------------------
// const timeIsOver = () => {
//     alert("Время вышло")
// }
// setTimeout(timeIsOver, 2000)
//-----------------------------------
//-----------------------------------
// const timeIsOver = () => {
//     alert("Время вышло")
// }
// setInterval(timeIsOver, 3000)
// const alarm = setInterval(timeIsOver, 3000)
// clearInterval(alarm)


// const alarm = setInterval(() => {
//     let wantToSleep = confirm("Хотите ли вы спать?")
//     if (wantToSleep) {
//         console.log("tic")
//     } else {
//         clearInterval(alarm)
//     }
// }, 3000)
//-----------------------------------
//-----------------------------------

//    console.log("1")
//    setTimeout(() => {
//     console.log("2")
//    }, 0)   
//    console.log("3")
//-----------------------------------
//-----------------------------------
const postsBlock = document.querySelector(".posts_block-container")
const showPostsBTN = document.querySelector(".posts_block button")


// const func = () => 5



function addPost(title, body) {
    const postTitle = document.createElement("h3")
    const postBody = document.createElement("span")
    const postItem = document.createElement("p")

    postTitle.innerText = title
    postBody.innerText = body

    postItem.append(postTitle, postBody)
    postsBlock.append(postItem)

}

function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        for (el of data) {
            addPost(el.title, el.body)
        }
        // addPost(data[7].title, data[7].body)        
    })
    .catch(err => console.log(err.message))
}

// function createPost(title, body, userId) {
//     fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: 'POST',
//         body: JSON.stringify ({
//             // title: title,
//             // body: body,
//             // userId: userId,
//             title,
//             body,
//             userId,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//         .then(res => {
//             console.log(res)            
//         })
//         .catch(err => console.log(err.message))
// }
// createPost("title", "body", 15)

showPostsBTN.onclick = () => {getPosts()}
