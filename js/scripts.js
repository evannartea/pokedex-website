const form = document.getElementById("search-wrapper")
const input = document.getElementById("search-box")

let pokemonData = []

fetch("pokemon.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        pokemonData = data;
    });

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const query = input.value.trim().toLocaleLowerCase();

    const result = pokemonData.find(function (pokemon) {
        return (
            pokemon.name.toLocaleLowerCase() === query ||
            String(pokemon.pokedex_number) === query
        );
    });

    form.reset();
});