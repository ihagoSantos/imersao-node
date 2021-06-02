const assert = require('assert'); // módulo vanilla
const { obterPessoas } = require('./service');

// instalamos o pacote nock, para simular requisicoes
const nock = require('nock');

// Switch de tests
describe('Star Wars Tests', function(){
    // antes de todos os tests execute
    this.beforeAll(() => {
        const response = {
            count:1,
            next:null,
            previous:null,
            results:[
                {
                    name:"R2-D2",
                    height:"96",
                    mass:"32",
                    hair_color:"n/a",
                    skin_color:"white, blue",
                    eye_color:"red",
                    birth_year:"33BBY",
                    gender:"n/a",
                    homeworld:"http://swapi.dev/api/planets/8/",
                    films:["http://swapi.dev/api/films/1/","http://swapi.dev/api/films/2/","http://swapi.dev/api/films/3/","http://swapi.dev/api/films/4/","http://swapi.dev/api/films/5/","http://swapi.dev/api/films/6/"],
                    species:["http://swapi.dev/api/species/2/"],
                    vehicles:[],
                    starships:[],
                    created:"2014-12-10T15:11:50.376000Z",
                    edited:"2014-12-20T21:17:50.311000Z",
                    url:"http://swapi.dev/api/people/3/"
                }
            ]
        };

        // Simula a requisição para que não seja preciso requisitar direto na api
        nock(`https://swapi.dev/api/people`)
        .get('/?search=r2-d2&format=json')
        .reply(200, response)
    })


    it('deve buscar o r2d2 com o formato correto', async () => {
        const expected = [{
            nome: 'R2-D2', peso: '96'
        }];
        const nomeBase = `r2-d2`;
        const resultado = await obterPessoas(nomeBase);

        assert.deepStrictEqual(resultado, expected);

    })
});