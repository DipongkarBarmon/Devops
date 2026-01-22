import { Router } from "express";

import {
  getAllpost,
  getOnePost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js'

const router=Router();


router.route('/').get(getAllpost).post(createPost)

router.route('/:id')
.get(getOnePost)
.patch(updatePost)
.delete(deletePost)


export default router;