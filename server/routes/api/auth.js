import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import auth from '../../middleware/auth.js';
import { JWT_SECRET } from '../../config/index.js';

const router = express.Router();

/**
 * @routes  POST /api/auth
 * @desc    Auth user
 * @access  Public
 * @author  Robin
 */
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: '모든 필드를 채워주세요.' });
  }

  // Check for exisiting user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: '유저가 존재하지 않습니다.' });

  const isMatched = await user.matchPassword(password);
  if (!isMatched)
    return res.status(400).json({ msg: '비밀번호가 일치하지 않습니다.' });

  let token = user.getSignedJwtToken();

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/**
 * @routes  POST
 * @desc    Logout
 * @access  Public
 * @author  Robin
 */
router.post('/logout', (req, res) => {
  res.json({ msg: '로그아웃 성공' });
});

/**
 * @routes  GET
 * @desc    GET user info
 * @access  Private
 * @author  Robin
 */
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('유저가 존재하지 않습니다.');
    res.json(user);
  } catch (err) {
    console.log('err', err);
    res.status(400).json({ msg: err.message });
  }
});

export default router;
