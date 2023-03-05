const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

var validator = require('validator');

//const router = require('./router');

//var database = require('./db')
//const con = require('./db');
//var User = require("./modules/userModule");
//import userController from './controllers/userController';

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: 'http://localhost:3001'
  }));
  

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get('./healthcheck', (req, res) => {
    res.status(200).send('OK')
})

app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
})


const pool = mysql.createPool({
    host: "database-1.creu8l56kqj6.ap-northeast-1.rds.amazonaws.com",
    user: "admin",
    password: "Michelle0125!",
    database: 'assignment'
    });

app.get('/users', (req, res) => {
    pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        res.status(500).send('Error connecting to MySQL database');
    } else {
        const ID = req.query.id;
        const Email = req.query.email;
        // const sql = 'SELECT id, name, email FROM user WHERE id = ' + ID;
        let sql = '';

        if(!ID){
            sql = `SELECT id, name, email FROM user WHERE email = '${Email}'`;
        }
        else{
            sql = `SELECT id, name, email FROM user WHERE id = '${ID}'`;
        }



        connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching user data from MySQL database:', error);
            res.status(500).send('Error fetching user data from MySQL database');
        } else {
            const responseData = {
            data: {
                user: results,
                date: req.headers['request-date'],
            }
            };
            res.status(200).json(responseData);
        }
        // Release the MySQL connection
        connection.release();
        });
    }
    });
});

app.post('/users', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Check if the username matches the alphanumeric pattern
    if (!validator.isAlphanumeric(name)) {
        return res.status(400).json({ message: 'Username can only contain alphabets and numbers.' });
    }

    // Check if the email matches the email pattern
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Email format is not valid.' });
      }

    // Check if the password matches the password pattern
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[~`!@#$%^&*()_+={[}\]|\\:;"'<,>.?/]/;
    
    let count = 0;
    if (uppercaseRegex.test(password)) count++;
    if (lowercaseRegex.test(password)) count++;
    if (numberRegex.test(password)) count++;
    if (specialCharRegex.test(password)) count++;
    
    // Check if the password meets at least three requirements
    if (count < 3) {
        return res.status(400).json({ message: 'Password should contain at least 3 of the following: uppercase letters, lowercase letters, numbers, or special characters.' });
    }    

    
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL database:', err);
            res.status(500).send('Error connecting to MySQL database');
        }else {
            const sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
            connection.query(sql, [name, email, password], (error, results) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes('email')) {
                    // Return an error message if the email is already in use
                    res.status(409).send('Email address is already in use');
                } else {
                    // Return a generic error message for other types of errors
                    console.error('Error inserting user data into MySQL database:', error);
                    res.status(500).send('Error inserting user data into MySQL database');
                }
            }else {
                console.log('User data inserted into MySQL database');
                // Return a success message as a response
                //res.status(200).send('User data inserted into MySQL database');
                res.status(200).json({
                data: {
                    user: {
                        id: results.insertId,
                        name: name,
                        email: email,
                    },
                    date: req.headers['request-date'],
                },
                });
            }
            // Release the MySQL connection
            connection.release();
            });
        }
    });    
});