'use strict';

(function () {
  const playerWinText = 'Player wins!';
  const computerWinText = 'Computer wins!';

  const outcomes = {
    rock: { 
      beats: {
        scissors: {
          verb: 'crushes', 
        },
        lizard: {
          verb: 'crushes',
        },
      },
    },
    paper: { 
      beats: {
        rock: {
          verb: 'covers'
        }, 
        spock: {
          verb: 'disproves'
        }, 
      },
    },
    scissors: { 
      beats: {
        'paper': {
          verb: 'cuts'
        }, 
        'lizard': {
          verb: 'decapitates'
        },
      },
    },
    lizard: { 
      beats: {
        'paper': {
          verb: 'eats',
        }, 
        'spock': { 
          verb: 'poisons' 
        },
      }, 
    },
    spock: { 
      beats: {
        'rock': {
          verb: 'vaporizes',
        }, 
        'scissors': {
          verb: 'smashes' 
        },
      },
    },
  };
  const options = Object.keys(outcomes);

  let computerWins = 0;
  let playerWins = 0;

  function getRandomInteger(max, min = 0, includeMax = false) {
    return Math.floor(Math.random() * (max - min + Number(includeMax && 1)) + min);
  }

  document.querySelectorAll('[data-rps-choice]').forEach((button) => button.addEventListener('click', handleClick));
  
  function handleClick(e) {
    const playerChoice = e.target.dataset.rpsChoice;
    const computerChoice =
      options[getRandomInteger(options.length)];

    const outcome = calculateOutcome(playerChoice, computerChoice);

    const flavorText = outcome === playerWinText ? getFlavourText(playerChoice, computerChoice) : getFlavourText(computerChoice, playerChoice);
    document.querySelector('[data-rps-result]').textContent = outcome;
    document.querySelector('[data-rps-flavor]').textContent = flavorText;
    updateScore(outcome);
    updateLog(playerChoice, computerChoice, outcome);
  }

  function calculateOutcome(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return "It's a tie!";
    } else if (computerChoice in outcomes[playerChoice].beats) {
      return playerWinText;
    }

    return computerWinText;
  }

  function getFlavourText(winnerChoice, loserChoice) {
    const verb = outcomes[winnerChoice].beats[loserChoice]?.verb;
    if(!verb) {
      return '';
    }
    return `${capitalizeFirstLetter(winnerChoice)} ${verb} ${loserChoice}!`;
  }

  function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.substr(1);
  }

  function updateScore(outcome) {
    if (outcome === playerWinText) {
      playerWins++;
    } else if (outcome === computerWinText) {
      computerWins++;
    }

    document.querySelector('[data-rps-wins=player]').textContent = playerWins;
    document.querySelector('[data-rps-wins=computer]').textContent = computerWins;
  }

  function updateLog(playerChoice, computerChoice, outcome) {
    const logEntry = `${playerChoice.toUpperCase()} vs ${computerChoice.toUpperCase()}: ${outcome}`;
    const logItem = document.createElement('li');
    logItem.textContent = logEntry;

    const logList = document.querySelector('[data-rps-log]');
    logList.prepend(logItem);
  }
})();
