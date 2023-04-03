const express=require('express');
const bodyparser=require('body-parser');

var app=express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");

const trySchema=new mongoose.Schema({
    name:String
});
const item =mongoose.model("task",trySchema);
const todo =new item({
    name:"Create some videos"
});
const todo2 =new item({
    name:"Learn React"
});
const todo3 =new item({
    name:"Learn DSA"
});
const todo4 =new item({
    name:"Take some rest"
});

//todo2.save();
//todo3.save();
//todo4.save();

app.listen("3000",function(){
    console.log("Server is running")
});
app.get("/",function(req,res){

    item.find().then(function(data){//reteiving the data
        console.log(data);
        res.render("list",{ejes:data})
    })
    .catch(function(err){
        console.log(err);
    });

});

app.post("/",function(req,res){
    const itemName=req.body.ele1;
    const todo4=new item({
        name:itemName
    });
    todo4.save();
    res.redirect("/");
});
app.post("/delete",function(req,res){
const checked=req.body.checkbox1;
item.findByIdAndRemove(checked).then(function(){
    
        console.log("deleted");
        res.redirect("/");
    })
.catch(function(err){
    console.log(err);
})
})










