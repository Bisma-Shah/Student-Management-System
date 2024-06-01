#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Display a Colourfull Welcome message
console.log(chalk.bold.rgb(284, 284, 284)(` \n  \t\t <<<==========================>>>`));
console.log(chalk.bold.rgb(284, 284, 284)(`<<<=======>>> ${chalk.bold.hex(`#61D3F8`)(`Welcome to \`Bisma Shah\` - Student-Management-App`)}  <<<=========>>>`));
console.log(chalk.bold.rgb(284, 284, 284)(`\t\t <<<==============================>>>\n`));
// Generate random student ID
const randomNumber = Math.floor(10000 + Math.random() * 80000);
// Initialize balance to zero
let balance = 0;
let answer = await inquirer.prompt([
    {
        name: "students",
        type: "input",
        message: chalk.yellow("Enter the student name"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.red.bold("Please Enter a Non-Empty Value.");
        }
    },
    {
        name: "courses",
        type: "list",
        message: chalk.green.bold("Select the course to enrolled"),
        choices: ["Web development", "Cloud computing", "Cybersecurity", "Microsoft Fundamentals", "Data Science"]
    }
]);
// Define course fees
const courses_Fee = {
    "Web development": 900000,
    "Cloud computing": 800000,
    "Cybersecurity": 700000,
    "Microsoft Fundamentals": 600000,
    "Data Science": 500000,
};
// Display course fee
console.log(chalk.rgb(248, 178, 235).bold(`\nCourse Fees: ${courses_Fee[answer.courses]}/-\n`));
// Display current balance
console.log(chalk.rgb(146, 229, 239).bold(`Balance: ${balance}\n`));
// Prompt for payment method and amount
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: chalk.yellow("Select Payment Method"),
        choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
    },
    {
        name: "amount",
        type: "input",
        message: chalk.rgb(247, 184, 107).bold("Transfer Money:"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.red.bold("Please Enter a Non-Empty Value.");
        },
    }
]);
// Confirm payment method
console.log(chalk.rgb(238, 244, 169).bold(`\nYou Select Payment Method ${paymentType.payment}.\n`));
// Get selected course fee
const courses_Fees = courses_Fee[answer.courses];
// Get payment amount
const paymentAmount = parseFloat(paymentType.amount);
// Validate payment amount
if (courses_Fees === paymentAmount) {
    console.log(chalk.rgb(134, 243, 230).bold(`Congratulations! You Have Successfully Enrolled: ${answer.courses}.\n`));
    // Prompt for next action
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: chalk.yellow("What would you like to do next?"),
            choices: ["View Status", "Exit"]
        }
    ]);
    // Display enrollment status
    if (ans.select === "View Status") {
        console.log(chalk.bold.rgb(151, 238, 143).bold("\n<<<==========>>> Status <<<==========>>>\n"));
        console.log(chalk.green.bold(`Student Name: ${answer.students}`));
        console.log(chalk.yellow.bold(`Student ID: ${randomNumber}`));
        console.log(chalk.cyan.bold(`Course: ${answer.courses}`));
        console.log(chalk.rgb(63, 249, 220).bold(`Course Fees Paid: ${paymentAmount}`));
        console.log(chalk.rgb(240, 152, 249).bold(`Balance: ${balance += paymentAmount}`));
    }
    else {
        console.log(chalk.rgb(147, 227, 193).bold("\nExiting Student Management System")); // Exit message
    }
    ;
}
else {
    console.log(chalk.red.bold("Invalid Amount Due to Course.\n")); // Error message for invalid payment amount
}
;
