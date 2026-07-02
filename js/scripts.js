const form = document.getElementById("search-wrapper")
const input = document.getElementById("search-box")

let pokemonData = []

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

    const stats = {
        hp: result.hp,
        attack: result.attack,
        defense: result.defense,
        spAttack: result.sp_attack,
        spDefense: result.sp_defense,
        speed: result.speed,
    };

    document.getElementById("hp").textContent = stats.hp;
    document.getElementById("attack").textContent = stats.attack;
    document.getElementById("defense").textContent = stats.defense;
    document.getElementById("sp-attack").textContent = stats.spAttack;
    document.getElementById("sp-defense").textContent = stats.spDefense;
    document.getElementById("speed").textContent = stats.speed;
    
    form.reset();
});