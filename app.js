
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}






const getAnswerArray = async (pokemonInTheImg) => {
    try {

        const arr = []
        const arrId = [];
        const config = { headers: { Accept: 'application/json' } }
        // const res = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonInTheImg + '/', config);
        // arr.push(res.data)
        arrId.push(pokemonInTheImg)
        for (let i = 0; i < 3; i++) {
            let randPokemon = getRandomInt(1010)
            while (arrId.includes(randPokemon)) {
                randPokemon = getRandomInt(1010)
            }
            arrId.push(randPokemon)
            // console.log(res.data.id === rest.data.id)
            // arr.push(rest.data)
        }
        // console.log(arrId)
        shuffle(arrId)
        // console.log(arrId)
        // console.log(arrId)
        for (let i = 0; i < 4; i++) {
            const rest = await axios.get('https://pokeapi.co/api/v2/pokemon/' + arrId[i] + '/', config);
            arr.push(rest.data)
        }

        // console.log(arr)

        // return res.data.main.temp;
        // shuffle(arr)
        // console.log(arr)

        return arr
    } catch (e) {
        return "ERROR"
    }
}


async function delFunc() {


    const option1Radio = document.getElementById('option1');
    const option2Radio = document.getElementById('option2');
    const option3Radio = document.getElementById('option3');
    const option4Radio = document.getElementById('option4');

    let selectedValue;
    if (option1Radio.checked) {

        console.log('Option 1 is selected');
        selectedValue = (option1Radio.nextElementSibling).innerText
    } else if (option2Radio.checked) {

        console.log('Option 2 is selected');
        selectedValue = (option2Radio.nextElementSibling).innerText
    } else if (option3Radio.checked) {

        console.log('Option 3 is selected');
        selectedValue = (option3Radio.nextElementSibling).innerText
    } else if (option4Radio.checked) {

        console.log('Option 4 is selected');
        selectedValue = (option4Radio.nextElementSibling).innerText
    } else {
        console.log('No option is selected');
        selectedValue = ''
    }

    let choiceID = await getChoiceID(selectedValue)
    console.log(selectedValue)
    console.log(choiceID)
    const pokeImgTwo = document.querySelector('img')
    console.log((pokeImgTwo.src).substring(73, (pokeImgTwo.src).indexOf('.png')))
    const correctID = (pokeImgTwo.src).substring(73, (pokeImgTwo.src).indexOf('.png'))
    let wasCorrect = 0
    if (choiceID == correctID) {
        wasCorrect++
    }





    const score = document.querySelector("#correct").innerText
    let realNum = parseInt(score.substring(0, score.search('/')))

    realNum += wasCorrect
    console.log(realNum)
    console.log(selectedValue)
    const conto = document.querySelector(".container")
    conto.style.display = "none"
    const winningCont = document.createElement("div")
    winningCont.classList.add('container')
    const p = document.createElement("p")
    p.innerText = "You got " + realNum + "/10 correct"
    winningCont.append(p)

    document.body.append(winningCont)
}

const getChoiceID = async (selectedValue) => {
    try {
        if (selectedValue != '') {
            const config = { headers: { Accept: 'application/json' } }
            // const res = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonInTheImg + '/', config);
            // arr.push(res.data)
            const rest = await axios.get('https://pokeapi.co/api/v2/pokemon/' + selectedValue + '/', config);


            // console.log(rest.data.id)

            // return res.data.main.temp;
            // shuffle(arr)
            // console.log(arr)

            return rest.data.id

        } else {
            return null
        }

    } catch (e) {
        return "ERROR"
    }
}

let numQs = -1
let correctCounter = 0
async function nextQuestion() {
    const option1Radio = document.getElementById('option1');
    const option2Radio = document.getElementById('option2');
    const option3Radio = document.getElementById('option3');
    const option4Radio = document.getElementById('option4');

    let selectedValue;

    // let selectedID
    if (option1Radio.checked) {
        console.log('Option 1 is selected');
        selectedValue = (option1Radio.nextElementSibling).innerText
        // selectedID
    } else if (option2Radio.checked) {

        console.log('Option 2 is selected');
        selectedValue = (option2Radio.nextElementSibling).innerText
        // selectedID
    } else if (option3Radio.checked) {

        console.log('Option 3 is selected');
        selectedValue = (option3Radio.nextElementSibling).innerText
        // selectedID
    } else if (option4Radio.checked) {

        console.log('Option 4 is selected');
        selectedValue = (option4Radio.nextElementSibling).innerText
        // selectedID
    } else {
        console.log('No option is selected');
        selectedValue = ''
    }
    let choiceID
    if (selectedValue !== '') {
        choiceID = await getChoiceID(selectedValue)

    }

    console.log(selectedValue)
    console.log(choiceID)
    const pokeImgTwo = document.querySelector('img')
    console.log((pokeImgTwo.src).substring(73, (pokeImgTwo.src).indexOf('.png')))
    const correctID = (pokeImgTwo.src).substring(73, (pokeImgTwo.src).indexOf('.png'))

    if (choiceID == correctID) {
        correctCounter++
    }



    const submitButton = document.querySelector('.submit');
    submitButton.style.display = "none"
    numQs++
    const correct = document.querySelector("#correct")
    correct.innerText = correctCounter + '/' + numQs
    const startButton = document.querySelector('.button-container button');
    startButton.innerText = 'Next'
    const pokemonInTheImg = getRandomInt(1010)
    // console.log(pokemonInTheImg)
    const pokeImg = document.querySelector('img')
    pokeImg.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonInTheImg + '.png'
    const pokeArray = await getAnswerArray(pokemonInTheImg);
    // console.log(pokeArray)

    const optionOneSpan = document.querySelector("#option1Span");
    optionOneSpan.textContent = pokeArray[0].name; // Change the text as needed
    let optionOneId = pokeArray[0].id

    const optionTwoSpan = document.querySelector("#option2Span");
    optionTwoSpan.textContent = pokeArray[1].name; // Change the text as needed
    let optionTwoId = pokeArray[1].id

    const optionThreeSpan = document.querySelector("#option3Span");
    optionThreeSpan.textContent = pokeArray[2].name; // Change the text as needed
    let optionThreeId = pokeArray[2].id

    const optionFourSpan = document.querySelector("#option4Span");
    optionFourSpan.textContent = pokeArray[3].name; // Change the text as needed
    let optionFourId = pokeArray[3].id



    // if (selectedValue === ) {

    // }

    // let gameEnd = 0
    if (numQs === 9) {
        const nextButton = document.querySelector('.button-container button');
        nextButton.style.display = "none"
        submitButton.style.display = "inline-block"
    }


    // let selectedValue;
    // if (option1Radio.checked) {

    //     console.log('Option 1 is selected');
    //     selectedValue = (option1Radio.nextElementSibling).innerText
    //     option1Radio.checked = false
    // } else if (option2Radio.checked) {

    //     console.log('Option 2 is selected');
    //     selectedValue = (option2Radio.nextElementSibling).innerText
    //     option2Radio.checked = false
    // } else if (option3Radio.checked) {
    //     option3Radio.checked = false
    //     console.log('Option 3 is selected');
    //     selectedValue = (option3Radio.nextElementSibling).innerText
    //     option3Radio.checked = false
    // } else if (option4Radio.checked) {
    //     option4Radio.checked = false
    //     console.log('Option 4 is selected');
    //     selectedValue = (option4Radio.nextElementSibling).innerText
    //     option4Radio.checked = false
    // } else {
    //     console.log('No option is selected');
    // }
    // console.log(selectedValue)
    option1Radio.checked = false
    option2Radio.checked = false
    option3Radio.checked = false
    option4Radio.checked = false

    // if (startButton.innerText === "submit" && gameEnd) {
    //     const conto = document.querySelector(".container")
    //     conto.style.display = "none"
    // }

    // Repeat the same process for other options if needed
}

const nextButton = document.querySelector('.button-container button');
nextButton.addEventListener('click', nextQuestion);

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', delFunc);


function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}