document.addEventListener('DOMContentLoaded', function () {
    const boxes = document.querySelectorAll('.box');
    let currentPlayer = 'X';
    let playerImages = {
        'X': 'ab.jpg',
        'O': 'b.jpg'
    };
    let gameOver = false;
    let timer;
    let seconds = 10;
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;

   
    updateTime();
    updateScore();

  
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            if (!gameOver && !box.classList.contains('taken')) {
                box.classList.add('taken');

            
                const image = document.createElement('img');
                image.src = playerImages[currentPlayer];
                image.classList.add('img-fluid'); 
                box.innerHTML = ''; 
                box.appendChild(image);

              
                if (checkWin()) {
                    gameOver = true;
                    setTimeout(() => {
                        updateScore();
                        showGameOverPopup();
                    }, 500); 
                } else if (checkDraw()) {
                    gameOver = true;
                    setTimeout(() => {
                        updateScore();
                        showDrawPopup();
                    }, 500); 
                } else {
                    
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

    // Function to check for a win
    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => hasImage(playerImages[currentPlayer], index))
        );
    }

    
    function hasImage(imageSrc, index) {
        const content = boxes[index].firstChild;
        return content && content.nodeName === 'IMG' && content.src.endsWith(imageSrc);
    }

    function checkDraw() {
        return Array.from(boxes).every(box => box.classList.contains('taken'));
    }

    function updateTime() {
        timer = setInterval(function () {
            seconds--;
            document.getElementById('timer').textContent = seconds;


            if (seconds <= 0) {
                console.log(seconds)
                clearInterval(timer);
                showTimeoutAlert();

            }

        }, 1000);
    }

    function updateScore() {
        if (checkDraw()) {
           
            document.getElementById('score').textContent = 'Draw';
        } else if (checkWin()) {
           
            document.getElementById('score').textContent = 'Player ' + (currentPlayer === 'X' ? '1' : '2') + ' wins';
            console.log("hello")
        } else {
        
        }
    }

    function showGameOverPopup() {
        alert('Game Over! Player ' + currentPlayer + ' wins!');
    }

    function showDrawPopup() {
        alert('Game Over! It\'s a draw.');
    }

    function showTimeoutAlert() {
        alert('Game Timeout!.');
    }
});
