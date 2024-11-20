fetch(`https://swapi.dev/api/people/`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP ERROR!`);
        }
        return response.json();
    })
    .then((data) => {
        const characters = data.results;
        const charDisplay = document.getElementById('charDisplay');

        charDisplay.innerHTML = '';

        characters.forEach((character) => {
            const characterName = document.createElement('li');
            characterName.textContent = character.name;
            charDisplay.appendChild(characterName);
        });
    })
    .catch((error) => {
        console.error('Error fetching the characters:', error);
        const charDisplay = document.getElementById('charDisplay');
        charDisplay.innerHTML = `<p>Erro fetching data. Sorry...</p>`
    })
    //     .catch(error => {
    //     const people = document.getElementById('people');
    //     people.innerHTML = `<li>${error.message}</li>`;
    // });
        // console.log(data);
        // const info = data.data;
        // const charDisplay = document.getElementById('charDisplay');
        // charDisplay.innerHTML = '';
  