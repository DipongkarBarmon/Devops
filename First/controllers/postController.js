import Post from '../models/postModel.js'

const getAllpost =async(req,res)=>{
   try {
      const posts=await Post.find();
      res.status(200).json({
        status:"success",
        results:posts.length,
        data:{
          posts
        }
      })
   } catch (error) {
     res.status(400).json({
       status:"fail"
     })
   }
}

const getOnePost= async(req,res)=>{
    const {id}=req.params;
    try {
       const onePost =await Post.findById(id)
       res.status(200).json({
         status:"Success",
         data:{
           onePost
         }
       })
    } catch (error) {
        console.log(error)
        res.status(400).json({
          status:"fail"
        })
    }
}

const createPost= async(req,res)=>{
  
    try { 
        
       const post =await Post.create(req.body)
       res.status(200).json({
         status:"Success",
         data:{
           post
         }
       })
    } catch (error) { 
        console.log(error)
        res.status(400).json({
          status:"fail"
        })
    }
}


const updatePost= async(req,res)=>{
    const {id}=req.params;
    try {
       const post =await Post.findByIdAndUpdate(id,req.body,{
         new:true,
         runValidators:true
       })
       res.status(200).json({
         status:"Success",
         data:{
           post
         }
       })
    } catch (error) { 
        console.log(error)
        res.status(400).json({
          status:"fail"
        })
    }
}

const deletePost= async(req,res)=>{
    const {id} =req.params;
    try {
       const post =await Post.findByIdAndDelete(id)
       res.status(200).json({
         status:"Success",
         data:{
           post
         }
       })
    } catch (error) { 
        console.log(error)
        res.status(400).json({
          status:"fail"
        })
    }
}
export {
  getAllpost,
  getOnePost,
  createPost,
  updatePost,
  deletePost
  
}