const service = require('./service');

Array.prototype.meuMap = function(callback) {
    const novoArrayMapeado = [];
    for(let indice = 0; indice <= this.length - 1; indice++){
        const resultado = callback(this[indice], indice);
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado;
}

main();
async function main(){
    try {
        const result = await service.obterPessoas('a');
        // const names = [];
        // console.time('forEach')
        // result.results.forEach(pessoa => {
        //     names.push(pessoa.name);
        // });
        // console.timeEnd('forEach')
        // console.time('map')
        // const names = result.results.map(pessoa => pessoa.name);
        // console.timeEnd('map')
        
        const names = result.results.meuMap(function (pessoa, indice) {
            return `${indice} = ${pessoa.name}`;
        });
        console.log(names);
    } catch (error) {
        console.error('DEU RUIM', error);
    }
}