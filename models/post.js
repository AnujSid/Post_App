const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
	content:String,
    name:String,
    like:String
});

module.exports=mongoose.model("Post",postSchema);