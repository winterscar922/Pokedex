var container = document.querySelector(".pokemons");
var cardcolors = ["#a5a58d", "#e63946", "#005f73", "#0a9396", "#48cae4", "#3d405b", "#e85d04", "#d1b3c4", "#e09f3e", "#f6bd60", "#ffa200", "#0091ad", "#cfd2cd", "#d08c60", "#d88c9a"];
var fetchpokemons = async () => {
    for (let i = 1; i <= 201; i++) {
        await getpokemon(i);
    }
}

var getpokemon = async (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    create_card(pokemon, number);
}

fetchpokemons();


function create_card(pokemon, number) {
    const create_div = document.createElement("div");
    create_div.classList.add("pokemon");
    var ind = Math.floor(Math.random() * 15);
    create_div.style.backgroundColor = cardcolors[ind];
    const type = pokemon.types[0].type.name;
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    // console.log(pokemon.abilities[0].ability.name);

    var pokeabilities = [];
    var Type = [];
    var moves=[];

    for (let i = 0; i < pokemon.abilities.length; i++) {
        pokeabilities.push(pokemon.abilities[i].ability.name);
    }
    for (let i = 0; i < pokemon.types.length; i++) {
        Type.push(pokemon.types[i].type.name);
    }
    for (let i = 0; i < Math.min(3,pokemon.moves.length); i++) {
        moves.push(pokemon.moves[i].move.name);
    }

    const contains = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/shiny/${number}.png">
            <div class="info">
                <span class="name"> #${number} </span>
                <p class="name">${name}</p>
            </div>
        
            <div  class="details">
                <b>Type: </b>  ${Type}
                <br>
                <b>Abilities: </b> ${pokeabilities}
                <br>
                <b>Moves:</b> ${moves}
            </div>
        <div>
        `;
    create_div.innerHTML = contains;
    container.append(create_div);
}

