const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// FUNÇÃO PARA VIRAR AS CARTAS
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//FUNÇÃO PARA CHECAR SE AS CARTAS SÃO IGUAIS
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//FUNÇÃO PARA DESABILITAR AS CARTAS
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

//FUNÇÃO PARA DESVIRAR AS CARTAS
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

//FUNÇÃO PARA RESETAR O TABULEIRO
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//FUNÇÃO PARA EMBARALHAR AS CARTAS
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 20);
        card.style.order = ramdomPosition;
    })
})();

//ADICIONA O EVENTO DE CLIQUE NAS CARTAS
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});