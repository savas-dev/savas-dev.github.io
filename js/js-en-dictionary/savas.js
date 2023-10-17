

const inputWord = document.getElementById('inputWord');
const translateButton = document.querySelector('.translateButton');
const translatedDiv = document.getElementById('translatedDiv');
const title = document.querySelector('.title')
const meaning = document.querySelector('.meaning');
const error = document.querySelector('.error');
const errorSpan = document.querySelector('.errorSpan');
const audio = document.getElementById('audio');


async function FetchApi(){
    translatedDiv.style.display = 'none';
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord.value}`;
    const result = await fetch(url).then((res) => res.json());
    console.log(result);

    if(result.title){
        translatedDiv.style.display = 'none';
        error.style.display = 'block';
        errorSpan.textContent = "No such word found in English."
    }
    else{
        let number = Math.floor(Math.random() * (0 + 2 + 1)) + 0;
        error.style.display = 'none';
        translatedDiv.style.display = 'block';

        title.textContent = result[0].word;
        
        if(number > 0){
            meaning.textContent = result[0].meanings[0].definitions[0].definition;
        }else if(number > 1){
            meaning.textContent = result[0].meanings[number].definitions[0].definition;
        }
        else{
            meaning.textContent = result[0].meanings[0].definitions[0].definition;
        }
        audio.src = result[0].phonetics[0].audio;
    }

}

translateButton.addEventListener('click', FetchApi);

// run button with key enter
inputWord.onkeyup = function(e){
    if(e.code == "Enter"){
        FetchApi();
    }
}