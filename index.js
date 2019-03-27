// connect to our database 
const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'classroomdb'
});

connection.connect(err => {
    if (err) throw err;
    askCommand();
});

function askCommand() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Create Student", "Select Students", "Update a Student", "Delete Student", "Exit"],
            name: "command"
        }
    ]).then(answer => {
        // Create - INSERT
        if(answer.command === "Create Student") {
            createStudent();
        } else if (answer.command === "Select Students") {
            // Read - SELECT
            selectAllStudents();
        } else if (answer.command === "Update a Student") {
             // Update students - UPDATE
            updateStudent();
        } else if (answer.command === "Delete Student") {
            deleteStudent();
        } else {
            console.log("See ya later! 👋")
            connection.end();
        }
    });
}

function createStudent() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the student?",
        },
        {
            type: "input",
            name: "GPA",
            message: "Whats the student's GPA?"
        },
        {
            type: "input",
            name: "favSubject",
            message: "Whats the student's favorite subject?"
        },
        {
            type: "input",
            name: "roomNumber",
            message: "Whats the student's room number?"
        }
    ]).then(answers => {
        connection.query("INSERT INTO students SET ?", answers, (err, response) => {
            if (err) throw err;
            console.log(`Student added: ${answers.name}`);
            askCommand();
        });
    });
    
}

function selectAllStudents() {
    connection.query("SELECT * FROM students", (err, response) => {
        if(err) throw err;
        console.table(response);
        askCommand();
    });
}

function updateStudent() {
    inquirer.prompt([
        {
            name: "id",
            message: "Select the student by id you want to update",
            type: "input"
        },
        {
            name: "column",
            message: "What column do you want to update?",
            type: "input"
        },
        {
            name: "value",
            message: "What value do you want to give this column",
            type: "input"
        }
    ]).then(answers => {
        connection.query("UPDATE students SET ? WHERE ?", [
            {
                [answers.column]: answers.value 
            },
            {
                id: answers.id
            }
        ], (err, response) => {
            if(err) throw err;
            console.log(`User updated with ${answers.id}`);
            askCommand();
        });
    })
}

function deleteStudent() {
    inquirer.prompt([
        {
            name: "id",
            message: "Select student by id to delete",
            type: "input"
        }
    ]).then(answer => {
        connection.query("DELETE FROM students WHERE ?", answer, (err, response) => {
            if(err) throw err;
            console.log(`Deleted a student with id of ${answer.id}`);
            askCommand();
        });
    })
}
