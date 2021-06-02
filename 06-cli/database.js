const { readFile } = require('fs'); // modulo de arquivos vanilla
const { promisify } = require('util'); // modulo para transformar função em promise
const readFileAsync = promisify(readFile); // converte readFile para promise

class Database {
    
    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }

    /**
     * Ler arquivo - para ler aquivos .json, não precisa chamar função readFile, apenas o require. Mas dessa forma, ajuda a simular para outros tipos
     * de arquivo, como um txt por exemplo.
     */
    async obterDadosArquivo() {
        // arquivo vem no tipo buffer
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    escreverArquivo() {

    }
    
    async listar(id) {
        const dados = await this.obterDadosArquivo();
        // caso passe o id, só retorna o item que possui o id específico, caso contrário, retorna todos
        const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true); 
        
        return dadosFiltrados;
    }
}

module.exports = new Database();