const dotenv=require('dotenv').config();
const express=require('express');
const bodyparser=require('body-parser');

var app=express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//const mongoose=require("mongoose");
//mongoose.connect("mongodb+srv://gunjangyl99:<YKcy6aW3ERN1A61O>@cluster0.otfyw7p.mongodb.net/test");

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

todo2.save();
todo3.save();
todo4.save();
const PORT=process.env.PORT|| 3000;
mongoose.set('strictQuery',false);
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log('Mongodb connected');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }

connectDB().then(()=>{
    app.listen(PORT,function(){
        console.log("Server is running")
    });
})

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










