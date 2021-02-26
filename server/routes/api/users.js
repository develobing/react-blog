import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import { JWT_SECRET } from '../../config/index.js';

const router = express.Router();

/**
 * @routes  GET /api/users
 * @desc    Get All users
 * @access  Public
 * @author  Robin
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users');
    res.status(200).json(users);
  } catch (err) {
    console.log('err', err);
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @routes  POST /api/users
 * @desc    Register user
 * @access  Public
 * @author  Robin
 */
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ meg: '모든 필드를 채워주세요.' });
  }

  // Check for existing user
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: '이미 가입된 유저입니다.' });

  let newUser = await User.create({ name, email, password });
  let token = newUser.getSignedJwtToken();

  res.json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: user.role,
    },
  });
});

export default router;
