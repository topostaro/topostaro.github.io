
let myHeading = document.querySelector('h1');
let myImage = document.querySelector('img');
let myButton = document.querySelector('button');


myHeading.onclick = function () {
    myHeading.textContent = 'Hello, world!';
}

/*
document.querySelector('html').onclick = function() {
    alert('Don`t click me!');
}
*/
myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/animal-dance.png');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
}

function setUserName() {
    let myName = prompt('Please enter your name.');
    if(!myName || myName === null) {
        setUserName();
    } else {
        localStorage.setItem('name', myName);
        myHeading.innerHTML = 'Mozilla is cool, ' + myName;
    }
}

if(!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla is cool, ' + storedName;
}

myButton.onclick = function() {
    setUserName();
}
