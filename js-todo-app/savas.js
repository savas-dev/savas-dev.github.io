

const addForm = document.querySelector('.addForm');
const list = document.querySelector('.todos');
const noContent = document.querySelector('.no-content');
const allLi = document.querySelectorAll('li');
const li = [];
const search = document.querySelector('.search input');
const buttonClear = document.querySelector('.buttonClear');
var liCount = localStorage.getItem('liCount');

console.log(localStorage.getItem('liCount'));

if(liCount <= 0){
    console.log(localStorage.getItem('liCount', liCount));
    noContent.classList.remove('d-none');
}

if(localStorage.getItem('html') != null){
    list.innerHTML = localStorage.getItem('html');
}

//li.length = allLi.length

// we catch and add all allLi elements to li[]
for (let index = 0; index < allLi.length; index++) {
    li.push(index); 
}

const generateTemplate = (todo)=>{
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <img class="delete" width="20" height="20" src="delete.png" alt="delete"></a>
    </li>
    `;

    list.innerHTML += html;
    
    // we add todo li html to li[]
    localStorage.setItem('html', list.innerHTML);
    liCount++;
    localStorage.setItem('liCount', liCount);
    console.log(liCount);
    
    if(liCount > 0){
        noContent.classList.add('d-none');
    }
}



addForm.addEventListener('submit', e =>{
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo.length > 0){
        generateTemplate(todo);
        addForm.reset();
    }
})

list.addEventListener('click', e=>{
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        localStorage.setItem('html', list.innerHTML);
        // we remove last index from li[]
        if(liCount > 0){
            liCount--;
        }
        localStorage.setItem('liCount', liCount);
        console.log(liCount);


        if(liCount <= 0){
            noContent.classList.remove('d-none');
        }

    }

    

})

const filterTodos = (term)=>{
    Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
}

search.addEventListener('keyup', ()=>{
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
})

buttonClear.addEventListener('click', e=>{
    e.preventDefault();
    list.innerHTML = '';
    liCount = 0;
    if(liCount <= 0){
        noContent.classList.remove('d-none');
    }
    localStorage.clear();
    console.log(liCount);
})