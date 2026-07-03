document.addEventListener("DOMContentLoaded", function () {
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
    const type12Icon = document.getElementById("type2");
    const pokemonSprite = document.getElementById("pokemon-sprite");
    const cry = document.getElementById("pokemon-cry");

    let pokemonData = [];
    let currentIndex = -1;

    fetch("data/pokemon.json")
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            pokemonData = data;
        });

    // Form
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const query = input.value.trim().toLowerCase();

        const result = pokemonData.find(function(pokemon) {
            return (
                pokemon.name.toLowerCase() === query ||
                String(pokemon.pokedex_number) === query
            );
        });

        if (!result) {
            console.log("Pokemon Not Found");
            return;
        };
        
        // Store stats
        const info = {
            pokedexNumber: result.pokedex_number,
            name: result.name,
            type1: result.type1,
            type2: result.type2,
            hp: result.hp,
            attack: result.attack,
            defense: result.defense,
            spAttack: result.sp_attack,
            spDefense: result.sp_defense,
            speed: result.speed,
        };
        
        // Format Pokedex Number
        const formattedPokedexNo = `#${String(info.pokedexNumber).padStart(3, "0")}`;

        pokedexNo.textContent = formattedPokedexNo;
        name.textContent = info.name;
        hp.textContent = info.hp;
        attack.textContent = info.attack;
        defense.textContent = info.defense;
        spAttack.textContent = info.spAttack;
        spDefense.textContent = info.spDefense;
        speed.textContent = info.speed;

        // Get types
        type1Icon.src = `images/types/${info.type1.toLowerCase()}IC_DPPt.png`;

        if (info.type2) {
            type12Icon.src = `images/types/${info.type2.toLowerCase()}IC_DPPt.png`;
            type12Icon.style.display = "inline-block"; 
        } else {
            type12Icon.style.display = "none";
        }   

        // Get sprites
        pokemonSprite.src = `https://projectpokemon.org/images/normal-sprite/${info.name.toLowerCase()}.gif`;

        // Get cries
        cry.src = `https://play.pokemonshowdown.com/audio/cries/${info.name.toLowerCase()}.mp3`;
        cry.currentTime = 0;
        cry.volume = 0.1;
        cry.play();

        input.value = "";
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