document.addEventListener("DOMContentLoaded", () => {
    const images = [
        'dumbo.jpg', 'dumbo.jpg',
        'tigre.jpg', 'tigre.jpg',
        'leon.jpg', 'leon.jpg',
        'mono.jpg', 'mono.jpg',
        'jirafa.jpg', 'jirafa.jpg',
        'cebra.jpg', 'cebra.jpg',
        'oso.jpg', 'oso.jpg',
        'panda.jpg', 'panda.jpg'
    ];

    const gameBoard = document.getElementById("gameBoard");
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(images);
        images.forEach(image => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.image = image;
            card.innerHTML = `<img src="images/${image}" alt="Animal Image">`;
            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;
        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.image === secondCard.dataset.image;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    createBoard();
});
