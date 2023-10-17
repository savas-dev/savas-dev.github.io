

const generateButton = document.querySelector('.generateButton');
const inputPass = document.getElementById('inputPass');
const copyIcon = document.querySelector('.copyIcon');
const alertContainer = document.querySelector('.alertContainer');
const active = document.querySelector('.active');


generateButton.addEventListener('click', ()=>{
    const passwordLength = 14;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let password = '';
    for(let i = 0; i<passwordLength; i++){
        const randomChar = Math.floor(Math.random() * chars.length);
        password += chars[randomChar];
    }

    inputPass.value = password;
    
});

function CopyPassword(){
    inputPass.select();
    navigator.clipboard.writeText(inputPass.value);
}

function GetAlertContainer(){
    alertContainer.classList.remove('active');
}

function HideAlertContainer(){
    setTimeout(() =>{
        alertContainer.classList.add('active');
    }, 2000);
}

copyIcon.addEventListener('click', ()=>{
    if(inputPass.value){
        CopyPassword();
        GetAlertContainer();
        HideAlertContainer();
    }
    
    
});

