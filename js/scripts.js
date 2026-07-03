document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("search-wrapper");
    const input = document.getElementById("search-box");

    const reset = document.getElementById("reset-button");
    const previous = document.getElementById("prev-button");
    const next = document.getElementById("next-button");

    const pokedexNo = document.getElementById("pokedex-number");
    const name = document.getElementById("name");
    const hp = document.getElementById("hp");
    const attack = document.getElementById("attack");
    const defense = document.getElementById("defense");
    const spAttack = document.getElementById("sp-attack");
    const spDefense = document.getElementById("sp-defense");
    const speed = document.getElementById("speed");

    const type1Icon = document.getElementById("type1");
    const type2Icon = document.getElementById("type2");
    const pokemonSprite = document.getElementById("pokemon-sprite");
    const pokemonCry = document.getElementById("pokemon-cry");
    
    // Fetch data
    async function getPokemon(query) {
        const url = `https://pokeapi.co/api/v2/pokemon/${query}`

        try {
            const response = await fetch(url)

            // Check response is ok
            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();
            return data;
        }
        catch(error) {
            console.error(error);
        }
    }

    // Return Pokemon after user input
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const query = input.value.trim().toLowerCase();

        const pokemon = await getPokemon(query);

        if (pokemon) {

            // Return text content for HTML

            // Get stats
            pokedexNo.textContent = `#${String(pokemon.id).padStart(3, "0")}`;
            name.textContent = pokemon.name;
            hp.textContent = pokemon.stats[0].base_stat;
            attack.textContent = pokemon.stats[1].base_stat;
            defense.textContent = pokemon.stats[2].base_stat;
            spAttack.textContent = pokemon.stats[3].base_stat;
            spDefense.textContent = pokemon.stats[4].base_stat;
            speed.textContent = pokemon.stats[5].base_stat;

            // Get types
            type1Icon.src = `images/types/${pokemon.types[0].type.name}IC_DPPt.png`;

            if (pokemon.types[1]) {
                type2Icon.src = `images/types/${pokemon.types[1].type.name}IC_DPPt.png`;
            }
            else {
                type2Icon.style.display = "none";
            }

            // Get sprites
            pokemonSprite.src = pokemon.sprites.other.showdown.front_default;

            // Get cries
            pokemonCry.src = pokemon.cries.legacy;
            pokemonCry.currentTime = 0;
            pokemonCry.volume = 0.1;
            pokemonCry.play();
        }
    });

    // Reset button
    reset.addEventListener("click", function() {
        setTimeout(function() {
            location.reload();
        }, 100);
    });

    // Keydown
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            previous.classList.add("pressed");
            previous.click();
        }

        if (event.key === "ArrowRight") {
            next.classList.add("pressed");
            next.click();
        }
    });

    // Keyup
    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowLeft") {
            previous.classList.remove("pressed");
        }

        if (event.key === "ArrowRight") {
            next.classList.remove("pressed");
        }
    });
});

// Add functionality to prev + next buttons
// Fix search box error handling for invalid pokemon query
// Fix edge cases - fairy types, weird characters in names