const express = require('express');
const pool = require('../db/db');
const cryptoJs = require('crypto-js')
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, mobile, birth } = req.body;

    const encryptedPassword = String(cryptoJs.SHA256(password))

    const sql = `INSERT INTO users(first_name, last_name, email, password, mobile, birth) VALUES(?,?,?,?,?,?)`

    pool.query(
        sql, [first_name, last_name, email, encryptedPassword, mobile, birth],
        (error, data) => {
            res.send(data)
        }
    )
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const encryptedPassword = String(cryptoJs.SHA256(password))

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`

    pool.query(sql, [email, encryptedPassword], (error, data) => {
        if (data) {
            if (data.length != 0) {
                const payload = {
                    userId: data[0].id,
                }
                const token = jwt.sign(payload, config.secret)
                const body = {
                    token: token,
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
                }
                res.send(body)
            } else res.send(error)
        } else res.send(error)
    })
})

router.post('/change_pass', (req, res) => {
    const { email, password,new_pass } = req.body;

    const encryptedPassword = String(cryptoJs.SHA256(password))
    const encryptedPassword1 = String(cryptoJs.SHA256(new_pass))

    //const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
    console.log("pass_change")
    const sql = `update users set password = ? WHERE email = ? AND password = ?`
    pool.query(sql, [encryptedPassword1,email, encryptedPassword], (error, data) => {
        if (!error) 
            {
                res.send({status:"Success"})
            } 
            else res.send({status:"error"})
        } 
    )
    })

module.exports = router