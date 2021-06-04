const { readFile, write, writeFile } = require('fs'); // modulo de arquivos vanilla
const { parse } = require('path');
const { promisify } = require('util'); // modulo para transformar função em promise
const readFileAsync = promisify(readFile); // converte readFile para promise
const writeFileAsync = promisify(writeFile);
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

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo();
        const id = heroi.id <= 2 ? heroi.id : Date.now();

        // Concatena parametro heroi com id passado
        const heroiComId = {
            id,
            ...heroi
        };
        // concatena objeto dados com objeto heroiComId
        const dadosFinal = [
            ...dados,
            heroiComId
        ]
        const resultado = await this.escreverArquivo(dadosFinal);
        return resultado;
    }
    
    async listar(id) {
        const dados = await this.obterDadosArquivo();
        // caso passe o id, só retorna o item que possui o id específico, caso contrário, retorna todos
        const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true); 
        
        return dadosFiltrados;
    }

    async remover(id){
        if(!id){
            return await this.escreverArquivo([]);
        }
        const dados = await this.obterDadosArquivo();
        // encontra o indice do item cujo id é igual ao informado
        const indice = dados.findIndex(item => item.id === parseInt(id));
        // caso não encontre, retorna excessao
        if(indice === -1) {
            throw Error('O usuario informado nao existe')
        }
        // remove o item com indice encontrado
        dados.splice(indice, 1);
        // escreve novamente o arquivo
        return await this.escreverArquivo(dados);
    }

    async atualizar(id, modificacoes) {
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        
        if(indice === -1) {
            throw Error('O heroi informado nao existe');
        }
        // acha objeto atual
        const atual = dados[indice];
        // cria novo objeto com modificacoes
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        // remove objeto atual
        dados.splice(indice, 1);
        // escreve arquivo com novos dados
        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ]);
        
    }
}

module.exports = new Database();