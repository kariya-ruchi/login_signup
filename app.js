const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const collection=require('./mongodb');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res,next)=>{
    res.render("login.ejs");
})

app.get("/signup",(req,res,next)=>{
    res.render("signup.ejs");
})

app.post("/signup",async(req,res,next)=>{
    const data={
        email:req.body.email,
        password:req.body.password
    }
    await collection.insertMany([data]);
    res.render("home.ejs")
})

app.post("/login",async(req,res,next)=>{
    try{
        const verify=await collection.findOne({email:req.body.email})
        if(verify.password===req.body.password){
            res.render("home.ejs")
        }
        else{
            res.send("INCORRECT PASSWORD")
        }
    }
    catch{
        res.send("INCORRECT CREDENTIALS")

    }
})



app.listen(3000,()=>{
    console.log('PORT CONNECTED');
})