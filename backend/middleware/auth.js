const jwt = require('jsonwebtoken');
module.exports = function auth(requiredRoles = []) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Authentication required.' });
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      if (requiredRoles.length && !requiredRoles.includes(req.user.role)) return res.status(403).json({ message: 'You do not have permission for this action.' });
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid or expired session. Please log in again.' });
    }
  };
};
