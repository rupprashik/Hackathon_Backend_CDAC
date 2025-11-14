const express = require('express');
const pool = require('../db/db');
const cryptoJs = require('crypto-js')
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


router.post('/add', (req, res) => {
    const { r_id, review,rating,movie_id,user_id} = req.body;
    console.log("pass_change")
    const sql = `Insert into reviews values(?,?,?,now(),?,?)`
    pool.query(sql, [ r_id, review,rating,movie_id,user_id], (error, data) => {
        if (!error) 
            {
                res.send({status:"Success"})
            } 
            else res.send({status:"error",error})
        } 
    )
    })



module.exports = router