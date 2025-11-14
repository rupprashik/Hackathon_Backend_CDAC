const express = require('express');
const pool = require('../db/db');
const cryptoJs = require('crypto-js')
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const result = require('../utils/result')
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
    console.log("Loginnnnnnn")
    const encryptedPassword = String(cryptoJs.SHA256(password))

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`

    pool.query(sql, [email, encryptedPassword], (error, data) => {
        if (data) {
            if (data.length != 0) {
                console.log(data)
                const payload = {
                    userId: data[0].u_id,
                }
                const token = jwt.sign(payload, config.secret)
                const body = {
                    token: token,
                    firstName: data[0].first_name,
                    lastName: data[0].last_name,
                }
                console.log("at last")
                res.send(result.createSuccessResult(body))
            } else res.send(error)
        } else res.send(error)
    })
})
module.exports = router