const APİ_URL = "https://api.github.com/users/";
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');



async function getUser(username) {
  try {
    const { data } = await axios(APİ_URL + username);
    createUserCard(data);
    getRepos(username);
    console.log(data);
  } catch (error) {
    if(error.response.status == 404){
        createErrorCard('No profile with this username...');
    }
    console.log(error);
  }
}

async function getRepos(username){
    try {
        const { data } = await axios(APİ_URL + username + '/repos?sort=created');
        addReposToCard(data);
        console.log(data);
      } catch (error) {
        createErrorCard('Problem fetching repos...')
      }
}

function addReposToCard(repos){
    const reposEl = document.getElementById('repos');
    repos
    // if we want slice data use this line .slice(0, 3)
    .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

function createErrorCard(message){
    const cardHtml = `
        <div class="card">
            <h1>${message}</h1>
        </div>
    `;

    main.innerHTML = cardHtml;
}

function createUserCard(user){
    const cardHtml = `
    <div class="card">
    <div>
        <img src="${user.avatar_url}" alt="" class="avatar">
    </div>
    
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Public Repos</strong></li>
            </ul>

            <div id="repos" class="repos"></div>
        </div>

    </div>
    `;
    main.innerHTML = cardHtml;

}


form.addEventListener('submit', (e) =>{
  
    e.preventDefault();
    const user = search.value

    if(user){
        getUser(user);
        search.value = '';
    }
})