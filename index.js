function setDate() {
    let date = new Date();

    function addZero(number) {
        if (number < 10) {
            number = "0" + number;
        }
        return number;
    }
    const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    let day = dayList[date.getDay()];
    let hour = date.getHours();
    if (hour > 12) {
        hour = hour - 12 + " PM";
    } else {
        hour += " AM";
    }
    let minutes = addZero(date.getMinutes());
    let seconds = addZero(date.getSeconds());
    let numberDay = addZero(date.getDate());
    let month = addZero(date.getMonth() + 1);
    let year = date.getFullYear();
    return `Today is : ${day}.<br />
Current time is : ${hour} : ${minutes} : ${seconds}<br />
Current date is: ${numberDay}-${month}-${year}<br />`;
}

function checkIfSunday() {
    let array = [];
    for (let year = 2022; year <= 2050; year++) {
        let date = new Date(year, 0, 1);
        if (date.getDay() === 0) {
            array.push(year);
        }
    }
    return array;
}

function nextChristmas() {
    let date = new Date();
    let xmas;
    if (date.getDate() > 25 && date.getMonth() === 11) {
        xmas = new Date(date.getFullYear() + 1, 11, 25);
    } else {
        xmas = new Date(date.getFullYear(), 11, 25);
    }
    let difference = Math.ceil((xmas.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (difference === 0) {
        return "Today is Christmas!!"
    } else {
        return `${difference} days`;
    }
}

function initSecondPage() {
    let random = Math.floor(Math.random() * (10) + 1);
    let counter = 0;
    let text = document.createElement('h2');
    let tries = document.createElement('h2');
    let input = document.createElement('input');
    let button = document.createElement('button');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '1');
    input.setAttribute('max', '10');
    text.innerText = "Try to guess a Number between 1 and 10. You have 4 tries";
    tries.innerHTML = "You have tried <span></span> times";
    button.innerHTML = "Guess";
    document.querySelector('body').append(text);
    document.querySelector('body').append(tries);
    document.querySelector('body').append(input);
    document.querySelector('body').append(button);
    let span = document.querySelector('span');
    span.innerHTML = counter;
    button.addEventListener('click', () => {
        if (input.value == random) {
            text.innerText = "Congratulations! You Won";
            tries.remove();
            input.remove();
            button.remove();
            document.getElementById('refresh').style.display = 'block';
        }
        if (input.value != random) {
            text.innerText = "Number is not correct. Try Again!";
            counter++;
            span.innerHTML = counter;
        }
        if (counter === 4) {
            text.innerText = "You failed 4 times. GAME OVER"
            tries.remove();
            input.remove();
            button.remove();
            document.getElementById('refresh').style.display = 'block';
        }
    });
}

function initPage() {
    let dateText = document.createElement('h2');
    let animationText = document.createElement('h1');
    let predictionText = document.createElement('p');
    let button = document.createElement('button');
    dateText.innerHTML = setDate();
    animationText.innerHTML = "Hello!!";
    predictionText.innerHTML = "From 2022 to 2050, the first of the year will be on Sunday in the following years: " + checkIfSunday().join(', ') + "<br />Days untill next christmas: " + nextChristmas();
    button.setAttribute('type', 'button');
    button.innerText = "Click here, to start a guessing game";
    document.querySelector('body').append(dateText);
    document.querySelector('body').append(animationText);
    document.querySelector('body').append(button);
    document.querySelector('body').append(predictionText);
    const intervalId = setInterval(() => {
        dateText.innerHTML = setDate();
        animationText.innerHTML = animationText.innerHTML[animationText.innerHTML.length - 1] + animationText.innerHTML.substring(0, animationText.innerHTML.length - 1);
    }, 300);
    button.addEventListener('click', () => {
        clearInterval(intervalId);
        dateText.remove();
        animationText.remove();
        predictionText.remove();
        button.remove();
        initSecondPage();
    });
}

window.addEventListener('DOMContentLoaded', initPage);