#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
async function Welcome() {
    let Username;
    console.log(`================================================`);
    const area = [`kharader`, `Defence`, `Landi`];
    let myarea;
    const number = Math.floor(Math.random() * 10);
    switch (true) {
        case number >= 0 && number <= 3:
            myarea = area[0];
            break;
        case number > 3 && number <= 6:
            myarea = area[1];
            break;
        case number > 6 && number <= 9:
            myarea = area[2];
            break;
        default:
            myarea = area[0];
            break;
    }
    const wel_Mess = `Welcome To ${myarea} `;
    console.log(chalk.bgWhite.blue.bold.underline(`           ` + wel_Mess));
    console.log(`================================================`);
    const getName = inquirer
        .prompt([
        {
            type: `input`,
            name: `name`,
            default: `player`,
            message: `Enter your name`,
        },
    ])
        .then((ans) => {
        let player = new Player(ans.name, 1000, 500);
        game(player);
    });
}
Welcome();
class Human {
    name;
    money;
    constructor(name, money) {
        (this.name = name), (this.money = money);
    }
}
class Player extends Human {
    balance;
    constructor(name, money, balance) {
        super(name, money);
        this.balance = balance;
    }
}
class Enemies extends Human {
    method;
    constructor(name, money, method) {
        super(name, money);
        this.method = method;
    }
}
async function game(player) {
    console.log(``);
    const police = new Enemies(`Policeman`, 300, `Bribe`);
    const robbers = new Enemies(`Robbers`, 600, `Robbery`);
    const family = new Enemies(`Family`, 200, `Basic Need`);
    let enemy;
    const number = Math.floor(Math.random() * 10);
    if (number > 0 && number <= 3) {
        enemy = police;
    }
    else if (number > 3 && number <= 6) {
        enemy = robbers;
    }
    else {
        enemy = family;
    }
    let selectOption = await inquirer
        .prompt([
        {
            type: `list`,
            name: `options`,
            message: `You have only Rs${player.money} ${player.name} and you have 3 options`,
            choices: [
                `Pay ${enemy.money} to ${enemy.name} for ${enemy.method}`,
                `Take money from your bank of current balance ${player.balance}`,
                `I want to Leave Karachi exit from game`,
            ],
        },
    ])
        .then((ans) => {
        switch (true) {
            case ans.options.includes(`Pay`):
                player.money = player.money - enemy.money;
                Welcome2(player.money);
                break;
            case ans.options.includes(`Take`):
                player.money = player.money + player.balance;
                Welcome2(player.money, player.balance);
                break;
            case ans.options.includes(`Karachi`):
                console.log(`Happy Ending`);
                break;
            default:
                break;
        }
    });
}
async function Welcome2(money, balance = 100) {
    let Username;
    console.log(`================================================`);
    const area = [`kharader`, `Defence`, `Landi`];
    let myarea;
    const number = Math.floor(Math.random() * 10);
    switch (true) {
        case number >= 0 && number <= 3:
            myarea = area[0];
            break;
        case number > 3 && number <= 6:
            myarea = area[1];
            break;
        case number > 6 && number <= 9:
            myarea = area[2];
            break;
        default:
            myarea = area[0];
            break;
    }
    if (money > 0) {
        const congrat = chalk.bgWhite.red.bold
            .underline `           congratulations you survived`;
        console.log(`================================================`);
        console.log(congrat);
        console.log(`================================================`);
        const wel_Mess = chalk.bgWhite.black.bold.underline `Welcome To ${myarea} `;
        console.log(`           ` + wel_Mess);
        console.log(`================================================`);
        let player = new Player(``, money, balance);
        game(player);
    }
    else {
        console.log(chalk.bgWhite.red.bold.underline(`You Lost the game because you don't have money`));
    }
}
