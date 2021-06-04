const Commander = require('commander');
const database = require('./database');
const Database = require('./database');
const Heroi = require('./Heroi');
async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")
        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar um Heroi")
        .option('-r, --remover', "Remove um Heroi pelo id")
        .option('-a, --atualizar [value]', "Atualiza um Heroi pelo id")
        .parse(process.argv)
    
        try {
            
            const options = Commander.opts();// retorna opcoes do Commander que foram informadas pelo usuario
            const heroi = new Heroi(options);
        
        if(options.cadastrar) {  
            // remove o id undefined do heroi
            delete heroi.id;      

            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Heroi não foi cadastrado!');
                return;
            }else{
                console.log("Heroi cadastrado com sucesso!");
            }
        }

        if(options.listar){
            const resultado = await Database.listar();
            console.log(resultado)
            return;
        }

        if(options.remover){
            const resultado = await Database.remover(heroi.id);
            if(!resultado){
                console.error("Não foi possível remover o heroi!");
                return;
            }
            else{
                console.log("Heroi removido com sucesso!");
            }
            return;
        }
        if(options.atualizar){
            const idParaAtualizar = options.atualizar;
            delete heroi.id;
            // remover todas as chaves que estiverem como undefined | null
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
            if(!resultado){
                console.error("Não foi possível atualizar o heroi");
                return
            }else{
                console.log("Heroi atualizado com sucesso!");
                return;
            }
        }


    } catch (error) {
        console.error('DEU RUIM', error);
    }
}

main();