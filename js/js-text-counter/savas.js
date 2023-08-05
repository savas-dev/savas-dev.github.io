

const textArea = document.querySelector('textarea');
const totalCharacter = document.querySelector('.totalCharacter');
const leftCharacter = document.querySelector('.leftCharacter');

textArea.addEventListener('keyup', UpdateCounter)

function UpdateCounter(){
    totalCharacter.textContent = textArea.value.length;
    leftCharacter.textContent = textArea.getAttribute('maxlength') - textArea.value.length;
}

UpdateCounter();