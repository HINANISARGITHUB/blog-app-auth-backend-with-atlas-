import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  // 1. Cookie se token nikalna
  const token = req.cookies.token;

  // 2. Token check karna
  if (!token) {
    return res.status(401).json({ msg: 'Not authorized, login required' });
  }

  try {
    // 3. Token verify karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. User ID ko request object mein save karna (taaki aage routes mein use ho sake)
    req.userId = decoded.userId;

    // 5. Next middleware ya controller par jana
    next();
  } catch (error) {
    // 6. Agar token expire ho gaya ho ya galat ho
    console.error("Auth Error:", error.message);
    res.status(401).json({ msg: 'Session expired or invalid token' });
  }
};