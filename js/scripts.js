document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("search-wrapper");
    const input = document.getElementById("search-box");

    let pokemonData = [];

    fetch("data/pokemon.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            pokemonData = data;
        });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const query = input.value.trim().toLowerCase();

        const result = pokemonData.find(function (pokemon) {
            return (
                pokemon.name.toLowerCase() === query ||
                String(pokemon.pokedex_number) === query
            );
        });

        if (!result) {
            console.log("Pokemon Not Found");
            return;
        }

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

        const formattedPokedexNo = `#${String(info.pokedexNumber).padStart(3, "0")}`;

        document.getElementById("pokedex-number").textContent = formattedPokedexNo;
        document.getElementById("name").textContent = info.name;
        document.getElementById("hp").textContent = info.hp;
        document.getElementById("attack").textContent = info.attack;
        document.getElementById("defense").textContent = info.defense;
        document.getElementById("sp-attack").textContent = info.spAttack;
        document.getElementById("sp-defense").textContent = info.spDefense;
        document.getElementById("speed").textContent = info.speed;

        document.getElementById("pokemon-sprite").src = 
            `https://projectpokemon.org/images/normal-sprite/${info.name.toLowerCase()}.gif`;

        input.value = "";
    });

    document.getElementById("reset-button").addEventListener("click", function () {
            location.reload()
        })
});