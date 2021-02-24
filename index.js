const mysql = require('mysql');
const inquirer = require('inquirer');
//Defines the connections for mysql
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'C@rb0n2020',
  database: 'employee_db',
});

//Renders the functionality of the webpage when initally activated.
const init = () => {
    const initQuestions = [
        {
            message: 'Would you like to add to, view, or update tables?',
            type: 'list',
            choices: ['add to table', 'view table', 'update table', 'end application'],
            name: 'userAction'
        }
    ]
    //The question above will be propmted to the terminal to ask the user if they would like to add, view, or update a table.
    inquirer.prompt(initQuestions)
    .then(response => {
        if(response.userAction === 'add to table') {
            addSelection();
        }
        else if (response.userAction === 'view table') {
            viewSelection();
        }
        else if (response.userAction === 'update table') {
            updateSelection();
        }
        else {
            endApplication();
        }
    });
};

//If the user would like to add to a table, this will inquire on which table to add too. 
const addSelection = () => {
    const addTableSelection = [
        {
            message: 'Which table would you like to add too?',
            type: 'list',
            choices: ['department', 'employee', 'role'],
            name: 'addTableSelection'
        }
    ]
    inquirer.prompt(addTableSelection)
    .then(response => {
        if(response.addTableSelection === 'department') {
            addDepartmentQuestions();
        }
        else if(response.addTableSelection === 'employee') {
            addEmployeeQuestions();
        }
        else {
            addRoleQuestions();
        }
    });
};

//If the user would like to view a table, this willo inquire on which table to view.
const viewSelection = () => {
    const viewTableSelection = [
        {
            message: 'Which table would you like to view?',
            type: 'list',
            choices: ['department', 'employee', 'role'],
            name: 'viewTableSelection'
        }
    ]
    inquirer.prompt(viewTableSelection)
    .then(response => {
        if(response.viewTableSelection === 'department') {
            readDepertment();
        }
        else if(response.viewTableSelection === 'employee') {
            readEmployee();
        }
        else {
            readRole();
        }
    });
}

const readDepertment = () => {
    const query = connection.query(
        "SELECT * FROM department",
        (err, res) => {
            if (err) throw err;
            console.log(res);
            init();
        }
    );
};

const readEmployee = () => {
    const query = connection.query(
        "SELECT * FROM employee",
        (err, res) => {
            if (err) throw err;
            console.log(res);
            init();
        }
    );
};

const readRole = () => {
    const query = connection.query(
        "SELECT * FROM role",
        (err, res) => {
            if (err) throw err;
            console.log(res);
            init();
        }
    );
};
//If the user would like to update a table, this will inquire on which table to update?
const updateSelection = () => {
    const updateTableSelection = [
        {
            message: 'Which table would you like to update?',
            type: 'list',
            choices: ['department', 'employee', 'role'],
            name: 'updateTableSelection'
        }
    ]
    inquirer.prompt(updateTableSelection)
    .then(response => {
        if(response.updateTableSelection === 'department') {
            updateDepartmentQuestions();
        }
        else if(response.addTableSelection === 'employee') {
            updateEmployeeQuestions();
        }
        else {
            updateRoleQuestions();
        } 
    });
};

const updateDepartmentQuestions = () => {
    const updateDepQuestions = [
        {
            message: 'What is the ID of the column you would like to edit?',
            type: 'input',
            name: 'depQuestion'
        }
    ]
}

const updateEmployeeQuestions = () => {
    const updateDepQuestions = [
        {
            message: 'What is the ID of the column you would like to edit?',
            type: 'input',
            name: 'depQuestion'
        }
    ]
}

/*const updateDepartmentQuestions = () => {
    const updateDepQuestions = [
        {
            message: 'What is the ID of the column you would like to edit?',
            type: 'input',
            name: 'depQuestion'
        }
    ]
}
*/
//If the user decides to add to department table, this will ask the required questions to render a new department.
const addDepartmentQuestions = () => {
 const addDepQuestions = [
     {
        message: 'What is your departments ID?',
        type: 'input',
        name: 'departmentID'
     },
     {
         message: 'What is the name of your department?',
         type: 'input',
         name: 'departmentName'
     }
 ];
 inquirer.prompt(addDepQuestions)
 .then(response => {
    const query = connection.query(
        "INSERT INTO department SET ?",
        {
            name: response.departmentName
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${response.affectedRows} product inserted!`);
            init();
        }
    );
 });
};

//If the the user decides to add to the Employee table, then the questions will be asked to render the new employee column.
const addEmployeeQuestions = () => {
    const addEmpQuestions = [
        {
            message: 'What is your ID number?',
            type:'input',
            name:'ID'
        },
        {
            message: 'What is your first name?',
            type:'input',
            name:'firstName'
        },
        {
            message: 'What is your last name?',
            type:'input',
            name:'lastName'
        },
        {
            message: 'What is your role ID number?',
            type:'input',
            name:'roleID'
        },
        {
            message: 'What is your managers ID?',
            type:'input',
            name:'managerID'
        }
    ];
    inquirer.prompt(addEmpQuestions)
    .then(response => {
        const query = connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: response.roleID,
                manager_id:response.managerID
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${response.affectedRows} product inserted!`);
                init();
            }
        );
    });
};

const addRoleQuestions = () => {
    const addRolQuestions = [
        {
            message: 'What is your role ID number?',
            type: 'input',
            name: 'roleID'
        },
        {
            message: 'What is your title?',
            type: 'input',
            name: 'title'
        },
        {
            message: 'What is your salary?',
            type: 'input',
            name: 'salary'
        },
        {
            message: 'What is your department ID number?',
            type: 'input',
            name: 'departmentID'
        } 
    ];
    inquirer.prompt(addRolQuestions)
    .then(response => {
        const query = connection.query(
            "INSERT INTO role SET ?",
            {
                title: response.title,
                salary: response.salary,
                department_id: response.departmentID
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${response.affectedRows} product inserted!`);
                init();
            }
        );
    });
};


//This is sating that after a connection is made, we will query mysql to get some information back.
const afterConnection = () => {
  //This will select all columns from the products table.
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    //This will show the response that we are getting back from the database.
    //res will be an array of JS objects.
    //console.log(res);
    //Ends the connection, closing all open connections.
  });
  init();
};

const endApplication = () => {
    console.log('Thankyou, come back soon!!!');
    connection.end();
};

//Will define some bahevior for after the database has connected.
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  afterConnection();
});
