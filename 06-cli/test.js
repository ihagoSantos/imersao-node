const { ok, deepStrictEqual } = require('assert');
const assert = require('assert'); // módulo vanilla
const database = require('./database');
const DEFAULT_ITEM_CADASTRAR = { id:1, nome: 'Flash', poder: 'Speed' };
const DEFAULT_ITEM_ATUALIZAR = { id:2, nome: 'Lanterna Verde', poder: 'Energia do Anel' };

// Suite de testes
describe('Suite de manipulação de Herois', () => {

    before(async () => {
        await database.remover();
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    });

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id); // '[resultado]' é um destructuring para retornar apenas a primeira posição
        // ok(resultado, expected); // 'ok()' verifica se existe o expected dentro do resultado
        deepStrictEqual(resultado, expected); //'deepStrinctEqual()' verifica se o expected é estritamente igual ao resultado
    });

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);
        deepStrictEqual(actual, expected);
    }); 

    it('deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        deepStrictEqual(resultado, expected); 
        
    });

    it('deve atualizar um heroi por id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        };
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
        deepStrictEqual(resultado, expected);
    });
});