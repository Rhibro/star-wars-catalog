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
        const personDetail = document.getElementById('personDetail');

        charDisplay.innerHTML = '';

        characters.forEach((character) => {
            const characterName = document.createElement('li');
            characterName.classList.add('char-item');
            characterName.textContent = character.name;

            characterName.addEventListener('click', () => {
                // Clear previous details
                personDetail.innerHTML = '';
                
                // Show loading state
                personDetail.innerHTML = '<p>Loading...</p>';
                
                // Fetch character details using their URL
                fetch(character.url)
                    .then(response => response.json())
                    .then(characterData => {
                        // Clear loading message
                        personDetail.innerHTML = '';
                        
                        // Create and display character details
                        const details = `
                            <h3>${characterData.name}</h3>
                            <p>Height: ${characterData.height} cm</p>
                            <p>Mass: ${characterData.mass} kg</p>
                            <p>Hair Color: ${characterData.hair_color}</p>
                            <p>Eye Color: ${characterData.eye_color}</p>
                            <p>Birth Year: ${characterData.birth_year}</p>
                            <p>Gender: ${characterData.gender}</p>
                        `;
                        personDetail.innerHTML = details;
                        
                        // Fetch homeworld data
                        // fetch(characterData.homeworld)
                        //     .then(response => response.json())
                        //     console.log('Homeworld URL:', characterData.homeworld)
                        //     .then(homeworldData => {
                        //         const homeworldDiv = document.getElementById('homeworld');
                        //         const homeworldDetails = `
                        //             <h3>Homeworld: ${homeworldData.name}</h3>
                        //             <p>Population: ${homeworldData.population}</p>
                        //             <p>Climate: ${homeworldData.climate}</p>
                        //             <p>Terrain: ${homeworldData.terrain}</p>
                        //         `;
                        //         homeworldDiv.innerHTML = homeworldDetails;
                        //     })
                        //     .catch(error => {
                        //         personDetail.innerHTML = '<p>Error loading homeworld details...</p>';
                        //         console.error('Error:', error);
                        //     });
                    })
                    .catch(error => {
                        personDetail.innerHTML = '<p>Error loading character details...</p>';
                        console.error('Error:', error);
                    });
            });

            charDisplay.appendChild(characterName);
        }); // <-- Close characters.forEach here

    })
    .catch((error) => {
        console.error('Error fetching the characters:', error);
        const charDisplay = document.getElementById('charDisplay');
        charDisplay.innerHTML = `<p>Error fetching data. Sorry...</p>`;
    });
