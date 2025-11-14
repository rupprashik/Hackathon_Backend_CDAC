const express =require ('express');
const userRouter = require('../routes/user');
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter)
app.listen(4000,'localhost',()=>
{

    console.log("Server started on 400");
})
