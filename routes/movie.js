const express = require('express');
const pool = require('../db/db');
const cryptoJs = require('crypto-js')
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


router.post('/add', (req, res) => {
    const { m_id,title,release_date} = req.body;

    

    const sql = `INSERT INTO movies(m_id, title, release_date) VALUES(?,?,?)`

    pool.query(
        sql, [m_id,title,release_date],
        (error, data) => {
            res.send(data)
        }
    )
});

router.get('/print', (req, res) => {
    const sql = `select * from movies`
    console.log("print")
    pool.query(
        sql, [],
        (error, data) => {
            res.send(data)
        }
    )
});


module.exports = router