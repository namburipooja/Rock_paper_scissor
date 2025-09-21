
        let playerScore = 0;
        let computerScore = 0;
        let drawScore = 0;

        const choices = {
            rock: { emoji: '🪨', name: 'Rock' },
            paper: { emoji: '📄', name: 'Paper' },
            scissors: { emoji: '✂️', name: 'Scissors' }
        };

        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        function getRandomChoice() {
            const choiceKeys = Object.keys(choices);
            const randomIndex = Math.floor(Math.random() * choiceKeys.length);
            return choiceKeys[randomIndex];
        }

        function determineWinner(playerChoice, computerChoice) {
            if (playerChoice === computerChoice) {
                return 'draw';
            } else if (winConditions[playerChoice] === computerChoice) {
                return 'win';
            } else {
                return 'lose';
            }
        }

        function updateScore(result) {
            if (result === 'win') {
                playerScore++;
                document.getElementById('playerScore').textContent = playerScore;
            } else if (result === 'lose') {
                computerScore++;
                document.getElementById('computerScore').textContent = computerScore;
            } else {
                drawScore++;
                document.getElementById('drawScore').textContent = drawScore;
            }
        }

        function displayResult(result) {
            const resultElement = document.getElementById('result');
            resultElement.className = 'result show ' + result;
            
            let resultText = '';
            switch(result) {
                case 'win':
                    resultText = '🎉 You Win!';
                    break;
                case 'lose':
                    resultText = '💻 Computer Wins!';
                    break;
                case 'draw':
                    resultText = '🤝 It\'s a Draw!';
                    break;
            }
            
            resultElement.textContent = resultText;
            
            setTimeout(() => {
                resultElement.classList.remove('show');
            }, 3000);
        }

        function playGame(playerChoice) {
            // Animate player choice
            const playerChoiceDisplay = document.getElementById('playerChoice');
            const computerChoiceDisplay = document.getElementById('computerChoice');
            
            // Show player choice immediately
            playerChoiceDisplay.textContent = choices[playerChoice].emoji;
            playerChoiceDisplay.classList.add('animate-choice');
            
            // Animate computer thinking
            let thinkingCount = 0;
            const thinkingAnimation = setInterval(() => {
                const thinkingChoices = ['🪨', '📄', '✂️'];
                computerChoiceDisplay.textContent = thinkingChoices[thinkingCount % 3];
                thinkingCount++;
            }, 100);
            
            // Stop thinking animation and show result after 1 second
            setTimeout(() => {
                clearInterval(thinkingAnimation);
                
                const computerChoice = getRandomChoice();
                computerChoiceDisplay.textContent = choices[computerChoice].emoji;
                computerChoiceDisplay.classList.add('animate-choice');
                
                const result = determineWinner(playerChoice, computerChoice);
                updateScore(result);
                displayResult(result);
                
                // Remove animation classes
                setTimeout(() => {
                    playerChoiceDisplay.classList.remove('animate-choice');
                    computerChoiceDisplay.classList.remove('animate-choice');
                }, 300);
            }, 1000);
        }

        function resetGame() {
            playerScore = 0;
            computerScore = 0;
            drawScore = 0;
            
            document.getElementById('playerScore').textContent = '0';
            document.getElementById('computerScore').textContent = '0';
            document.getElementById('drawScore').textContent = '0';
            document.getElementById('playerChoice').textContent = '?';
            document.getElementById('computerChoice').textContent = '?';
            document.getElementById('result').textContent = '';
            document.getElementById('result').className = 'result';
        }
    