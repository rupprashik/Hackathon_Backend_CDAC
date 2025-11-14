const express =require ('express');

const app=express();

app.listen(4000,(req,res)=>
{
    console.log("Server started on 400");
})
