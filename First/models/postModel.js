import mongoose,{Schema} from "mongoose";

const postSchema=new Schema({
     title:{
       type:String,
       required:[true,"Post must have title"]
     },
     body:{
       type:String,
       required:[true,"Post must have body"]
     }
});

const Post=mongoose.model("post",postSchema);

export default Post;