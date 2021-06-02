const { get } = require('axios');
const URL = `https://swapi.dev/api/people`;

module.exports = {
    obterPessoas,
    mapearPessoas
}

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`;
    const result = await get(url);
    
    return result.data.results.map(mapearPessoas);
}

function mapearPessoas(item) {
    return {
        nome: item.name,
        peso: item.height
    }
}
