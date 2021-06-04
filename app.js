const express=require('express');
const mongoose=require('mongoose');
const app=express();
const methodOverride = require('method-override');
const Post=require("./models/post");

const url="mongodb+srv://anujsid596:mother1234@cluster0.kpmeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"||"mongodb://localhost:27017/Post_app";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
	console.log("connected");
})
.catch((err)=>{
	console.log("disconnected");
})

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");


app.get('/',async (req,res)=>{
    const posts=await Post.find({});
    res.render('home',{posts});
})

app.get('/new',async (req,res)=>{
    res.render('new');
})

app.post('/new',async(req,res)=>{
    const post=await new Post({content:req.body.content, name:req.body.name, like:req.body.like});
    post.save();
    res.redirect('/');
})

app.get('/liked',async(req,res)=>{
    const posts=await Post.find({like:"true"});
    res.render('liked',{posts});
})

app.get('/disliked',async (req,res)=>{
    const posts=await Post.find({like:"false"});
    res.render('disliked',{posts});
})

app.get('/:id',async (req,res)=>{
    const post=await Post.findById(req.params.id);
    res.render('show',{post});
})

app.get('/:id/edit',async(req,res)=>{
    const post=await Post.findById(req.params.id);
    res.render('edit',{post});
})

app.put('/:id',async(req,res)=>{
    const post=await Post.findByIdAndUpdate(req.params.id,req.body);
	res.redirect("/"+req.params.id);
})

app.delete("/:id", async(req,res)=>{
	const post=await Post.findByIdAndDelete(req.params.id);
	res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
	console.log("server started");
})
