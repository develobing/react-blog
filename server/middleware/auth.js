import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

const auth = (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({
      msg: '토큰 없음, 인증 실패',
    });
  }

  try {
    const token = bearerToken.split(' ').pop();
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('err', err);
    res.status(400).json({ msg: '토큰이 유효하지 않습니다.' });
  }
};

export default auth;
