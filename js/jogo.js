const grelha = document.querySelector('.grelha');

const spanJogador = document.querySelector('.jogador');
const temporizador = document.querySelector('.temporizador');
const personagens = [
    'aux_farmacia',
    'bombeiro',
    'carpinteiro',
    'contabilista',
    'eletricista',
    'esteticista',
    'geriatra',
    'informatico',
    'pasteleiro',
    'tec_logistica',

];

const createElement = (tag,className)=> {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

let primeiraCarta = '';
let segundaCarta = '';

const verificarFimJogo = () => {
    
    const cartasDesativadas = document.querySelectorAll('.carta-revelada');
    if(cartasDesativadas.length === 20) {
    clearInterval(this.loop);//Pára o loop do temporizador
    alert(`Parabéns, ${spanJogador.innerHTML}! Você terminou o jogo em ${temporizador.innerHTML}!`);
        
    }

}


const verificarCartas = () => {
    const primeiraPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundaPersonagem = segundaCarta.getAttribute('data-personagem');

    if (primeiraPersonagem === segundaPersonagem) {

        primeiraCarta.firstChild.classList.add('carta-revelada');
        segundaCarta.firstChild.classList.add('carta-revelada');
        
        primeiraCarta = '';
        segundaCarta = '';

        verificarFimJogo();

    }else {

        setTimeout(() => {
        primeiraCarta.classList.remove('revelar-carta');
        segundaCarta.classList.remove('revelar-carta');

        primeiraCarta = '';
        segundaCarta = '';
        }, 1500);//espera 1500ms para remover a classe revelar-carta e esconder as cartas
    }
}


const revelarCarta = ({target}) => {
    if (target.parentNode.className.includes('revelar-carta')) {
        return;
    }
    if (primeiraCarta === '') {
        target.parentNode.classList.add('revelar-carta');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta === '') {
        target.parentNode.classList.add('revelar-carta');
        segundaCarta = target.parentNode;
        verificarCartas();

    }
   

 
}

const createCard = (personagem) => {
    const carta = createElement('div', 'carta');
    const frente = createElement('div','face frente');
    const verso = createElement('div','face verso');

    frente.style.backgroundImage = `url('../imagens/${personagem}.jpg')`;


    carta.appendChild(frente);
    carta.appendChild(verso);

    carta.addEventListener('click',revelarCarta);
    carta.setAttribute('data-personagem', personagem);
        
    

    return carta;
}

const carregarJogo  = () => {
    const duplicarPersonagens = [...personagens, ...personagens];
    const arrayMisturado = duplicarPersonagens.sort(() => Math.random() - 0.5);

    arrayMisturado.forEach((personagem) => {

        
            
        
            const carta = createCard(personagem);
            grelha.appendChild(carta);
           
    })
}

const iniciarTemporizador = () => {
    this.loop = setInterval(() => {
        const temporizadorAtual = +temporizador.dataset.segundos || 0; // Armazena os segundos em um atributo
        const novosSegundos = temporizadorAtual + 1;

        // Converte para minutos e segundos
        const minutos = Math.floor(novosSegundos / 60);
        const segundos = novosSegundos % 60;

        // Atualiza o texto do temporizador no formato MM:SS
        temporizador.innerHTML = `${minutos}:${segundos.toString().padStart(2, '0')}`;

        // Armazena o novo tempo no dataset
        temporizador.dataset.segundos = novosSegundos;
    }, 1000);
}


window.onload = () => {
    const nomeJogador = localStorage.getItem('jogador');
    spanJogador.innerHTML = nomeJogador;
    iniciarTemporizador();
    carregarJogo();}