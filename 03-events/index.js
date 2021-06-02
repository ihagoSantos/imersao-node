/**
 * PROMISE => Executa uma única vez
 * EVENT => É USADO PARA AÇÕES CONTÍNUAS
 */

const EventEmitter = require('events');

class MeuEmissor extends EventEmitter { }

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click';
// observador
meuEmissor.on(nomeEvento, function(click) {
    console.log('um usuario clicou', click);
});

// // emissão de eventos
// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0
// setInterval(function() {
//     meuEmissor.emit(nomeEvento, 'no ok' + (count++))
// }, 1000);

// Evento input de texto
const stdin = process.openStdin();
stdin.addListener('data', function(value) {
    console.log(`Você digitou: ${value.toString().trim()}`);
});