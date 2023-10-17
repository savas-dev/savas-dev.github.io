const jokeButton = document.querySelector(".jokeButton");
const jokeText = document.querySelector(".jokeText");

const apiKey = "MeejEyhR3Z5HlpxaxzgLmg==ScJjq6zmd1vC9RqW";
const apiURL = "https://api.api-ninjas.com/v1/jokes?limit=1";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

async function GetJoke() {
  try {
    const jokeButtonDefaultText = jokeButton.textContent;
    jokeText.textContent = "Updating...";
    jokeButton.textContent = "Loading...";
    jokeButton.disabled = true;
    const response = await fetch(apiURL, options);
    const data = await response.json();

    jokeText.textContent = data[0].joke;
    jokeButton.textContent = jokeButtonDefaultText;
    jokeButton.disabled = false;
  } catch (error) {
    jokeText.textContent = "Something went wrong. Plase try again"
    jokeButton.textContent = 'Tell me a joke';
    jokeButton.disabled = false;
  }
}

jokeButton.addEventListener("click", GetJoke);
