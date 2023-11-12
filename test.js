#!/usr/bin/env node

import chalk from 'chalk';
// import gradient from 'gradient'; THIS PART IS NOT WORKING
// import chalk-animation from 'chalk-animation';
import figlet from 'figlet';

// const readline = require('readline');
import readline  from 'readline';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let userPoints = 0;
let userName = '';

function playGame() {
    if (!userName) {
        rl.question(chalk.magentaBright('Enter your name: '), (name) => {
            userName = name;
            console.log(`Welcome, ${userName}!`);
            showMenu();
        });
    } else {
        showMenu();
    }
}

function showMenu() {
    rl.question(
        `Select an option:\n1. Play game\n2. My points\n3. Combinations\n4. Exit\nEnter your choice (1/2/3/4): `,
        (input) => {
            if (input === '1') {
                playSlotMachine();
                playGame();
            } else if (input === '2') {
                console.log(chalk.bgBlue(`Your current points: ${userPoints}`));
                playGame();
            }  else if (input === '3') {
                showCombinations();
                playGame();
            } else if (input === '4') {
                console.log('Thanks for playing!');
                rl.close();
            } else {
                console.log('Invalid choice. Please select a valid option.');
                showMenu();
            }
        }
    );
}
function showCombinations() {
    console.log(`
        Special symbols: 🎰 🍒 🔔 🍫
        1 special symbol: +5 points
        2 special symbols: +15 points
        3 special symbols: +30 points
        Getting 3 🎰 in a row: +200 points
        
        The game is over if you get 3 special symbols in a single play.
    `);
}
playGame();

 class SlotSymbol {
    constructor(name, emoji, value, special, sequence) {
      this.name = name;
      this.emoji = emoji;
      this.value = value;
      this.special = special;
      this.sequence = sequence;
    }
  }

  function rules(line, currentPoints) {
    const specialCount = line.filter(symbol => symbol.special === true).length;
  
    if (specialCount === 1) {
      return currentPoints + 5;
    } else if (specialCount === 2) {
      return currentPoints + 15;
    } else if (specialCount === 3) {
      // Check if all symbols are the special symbol "🎰"
      const allAreSeven = line.every(symbol => symbol.name === "seven");
      return allAreSeven ? currentPoints + 200 : currentPoints + 30;
    } 
    return currentPoints;
  }
  function playSlotMachine() {
    const symbols = [
        new SlotSymbol("cheery", "🍒", 10, true, 7),
        new SlotSymbol("seven", "🎰", 70, true, 10),
        new SlotSymbol("banana", "🍌", 2, false, 1),
        new SlotSymbol("target", "🎯", 10, false, 3),
        new SlotSymbol("girl", "💃", 5, false, 2),
        new SlotSymbol("kiwi", "🥝", 2, false, 1),
        new SlotSymbol("star", "⭐", 20, false, 4),
        new SlotSymbol("heart", "💜", 15, false, 4),
        new SlotSymbol("diamond", "💎", 25, false, 5),
        new SlotSymbol("dollar", "💸", 30, false, 5),
        new SlotSymbol("lemon", "🍋", 5, false, 2),
        new SlotSymbol("clover", "🍀", 12, false, 4),
        new SlotSymbol("bell", "🔔", 40, true, 8),
        new SlotSymbol("bar", "🍫", 50, true, 9)
      ];
      

     
    
    const line = generateLine(symbols);
  const totalPoints = calculatePoints(line);
  const modifiedPoints = rules(line, totalPoints);

  userPoints += modifiedPoints;

  const emojis = line.map((symbol) => symbol.emoji).join(' ');
  console.log(chalk.greenBright(`\n${emojis}\nYour total points: ${modifiedPoints}\n`));
  checkForWin();

function generateLine(symbols) {
  const line = [];
  for (let i = 0; i < 3; i++) {
    const symbol = getRandomSymbol(symbols);
    line.push(symbol);
  }
  return line;
}

function getRandomSymbol(symbols) {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}

function calculatePoints(line) {
  return line.reduce((points, symbol) => points + symbol.value, 0);
}
function checkForWin() {
    if (userPoints >= 500) {
      console.log(chalk.bold.green(`Congratulations, ${userName}! You have won the game with ${userPoints} points! 🎉`));
    } else {
      const allAreSeven = line.every(symbol => symbol.name === "seven");
      if (allAreSeven) {
        console.log("🎉🎉🎉🎉🎉YOU WON WITH THE BEST COMBINATION!!🎉🎉🎉🎉🎉");
      }
    }
  }
  }  
playGame()