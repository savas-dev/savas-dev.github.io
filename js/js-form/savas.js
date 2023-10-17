

const form = document.querySelector('.form');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const message = document.querySelector('.message');
const messageTitle = document.querySelector('.messageTitle')

let isValid = false;
let passwordMatch = false;

function ValidateForm(){
    isValid = form.checkValidity();
    if(!isValid){
        messageTitle.textContent = 'Please enter all fields22';
        messageTitle.style.color = 'red';
        return;
    }

    if(password.value === repassword.value){
        passwordMatch = true;
        password.style.borderColor = 'green';
        repassword.style.borderCollapse = 'green';
    }else{
        passwordMatch = false;
        messageTitle.textContent = 'Passwords not match';
        messageTitle.style.color = 'red';
        return;
    }

    if(isValid && passwordMatch){
        messageTitle.textContent = 'You are registered';
        messageTitle.style.color = 'green';
    }
}

function TakeFormInformation(){
    const user = {
        name: form.name.value,
        surname: form.surname.value,
        email: form.email.value,
        phone: form.phone.value,
        password: form.password.value,
        address: form.address.value
    }

    console.log(user);
}

function SubmitForm(e) {
    e.preventDefault();
    ValidateForm();

    if(isValid && passwordMatch){
        TakeFormInformation();
    }
}

form.addEventListener('submit', SubmitForm);