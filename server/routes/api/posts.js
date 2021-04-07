import path from 'path';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import auth from '../../middleware/auth.js';
import Post from '../../models/Post.js';

dotenv.config();
const router = express.Router();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: 'robin-myblog',
    region: 'ap-northeast-2',
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

/**
 * @routes  GET /api/posts
 * @desc    Get all posts
 * @access  Public
 * @author  Robin
 */
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

/**
 * @routes  POST /api/posts
 * @desc    Create a post
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
    res.status(500).json({ msg: err.message });
  }
});

/**
 * @routes  POST /api/posts/image
 * @desc    Upload post image
 * @access  Public
 * @author  Robin
 */
router.post('/image', uploadS3.array('upload', 5), async (req, res, next) => {
  try {
    console.log(
      req.files.map((file) => {
        file.location;
      })
    );

    res.json({ uploaded: true, url: req.files.map((file) => file.location) });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ msg: err.message });
  }
});

export default router;
