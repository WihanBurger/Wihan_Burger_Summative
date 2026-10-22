import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const secretKey = process.env.JWT_SECRET || 'spottybird_fallback_secret_key_2026';
      
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      
      next();
    } else {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};