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

    const bgMusic = document.getElementById("background-music");

    let currentId = null;
    const MAX_POKEMON = 1025;
    
    // Fetch data from API
    async function fetchData(query) {
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
    
    // Render pokemon
    async function getPokemon(query) {
        const pokemon = await fetchData(query);
        
        if (!pokemon)
            return;

        currentId = pokemon.id;

        //Get stats
        pokedexNo.textContent = `#${String(pokemon.id).padStart(3, "0")}`;
        name.textContent = pokemon.name;

        hp.textContent = pokemon.stats[0].base_stat;
        attack.textContent = pokemon.stats[1].base_stat;
        defense.textContent = pokemon.stats[2].base_stat;
        spAttack.textContent = pokemon.stats[3].base_stat;
        spDefense.textContent = pokemon.stats[4].base_stat;
        speed.textContent = pokemon.stats[5].base_stat;

        // Get types
        type1Icon.src = `images/types/${pokemon.types[0].type.name}IC_XY.png`;

        type2Icon.style.display = "inline-block";
        if (pokemon.types[1]) {
            type2Icon.src = `images/types/${pokemon.types[1].type.name}IC_XY.png`;
        }
        else {
            type2Icon.style.display = "none";
        }

        // Get sprites
        pokemonSprite.src = 
            pokemon.sprites.other.showdown.front_default ??
            pokemon.sprites.front_default;

        // Get cries
        pokemonCry.src = 
            pokemon.cries.legacy ??
            pokemon.cries.latest;
        pokemonCry.currentTime = 0;
        pokemonCry.play();
    }

    //Render easter egg
    function easterEgg() {
        bgMusic.pause();
        bgMusic.currentTime = 0;

        pokedexNo.textContent= "";
        name.textContent = "KING OF POP";
        hp.textContent = "MAX"
        attack.textContent = "MAX"
        defense.textContent = "MAX"
        spAttack.textContent = "MAX"
        spDefense.textContent = "MAX"
        speed.textContent = "MAX"

        type1Icon.src = "images/types/UnknownIC_Colo.png";
        type2Icon.style.display = "none";

        pokemonSprite.src = "images/michael-jackson.gif";
        
        pokemonCry.src = "audio/8bit_smooth_criminal.mp3";
        pokemonCry.play()
    }

    // Return Pokemon after user input
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const query = input.value.trim().toLowerCase();

        if (query === "michael jackson") {
            easterEgg();
        }
        else {
            await getPokemon(query);
        }
    });

    // Reset button
    reset.addEventListener("click", function() {
        setTimeout(function() {
            location.reload();
        }, 100);
    });

    // Previous/Next button functionality
    previous.addEventListener("click", async function() {
        if (!currentId || currentId <= 1)
            return;

        await getPokemon(currentId - 1);
    });

    next.addEventListener("click", async function() {
        if (!currentId || currentId >= MAX_POKEMON)
            return;

        await getPokemon(currentId + 1);
    });

    // Link to arrow keys
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

    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowLeft") {
            previous.classList.remove("pressed");
        }

        if (event.key === "ArrowRight") {
            next.classList.remove("pressed");
        }
    });
});
