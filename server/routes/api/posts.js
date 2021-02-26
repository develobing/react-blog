import express from 'express';
import auth from '../../middleware/auth.js';
import Post from '../../models/Post.js';

const router = express.Router();

/**
 * @routes  GET
 * @desc    Get all posts
 * @access  Private
 * @author  Robin
 */
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

/**
 * @routes  POST
 * @desc    Create post
 * @access  Private
 * @author  Robin
 */
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, contents, fileUrl, creator } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
    });
    res.json(newPost);
  } catch (err) {
    console.log('err', err);
  }
});

export default router;
