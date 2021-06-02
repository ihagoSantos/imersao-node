const { ok, deepStrictEqual } = require('assert');
const assert = require('assert'); // módulo vanilla
const database = require('./database');
const DEFAULT_ITEM_CADASTRAR = { id:1, nome: 'Flash', poder: 'Speed' };

// Suite de testes
describe('Suite de manipulação de Herois', () => {

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id); // '[resultado]' é um destructuring para retornar apenas a primeira posição
        // ok(resultado, expected); // 'ok()' verifica se existe o expected dentro do resultado
        deepStrictEqual(resultado, expected); //'deepStrinctEqual()' verifica se o expected é estritamente igual ao resultado
    });
    // it('deve cadastrar um heroi, usando arquivos', async () => {
    //     const expected = {};
    //     // 
    //     assert.ok(null, expected);
    // })

});