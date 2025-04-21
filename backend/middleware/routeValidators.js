export default (req, res, next) => {
    try {
      new URL(req.originalUrl, 'http://test.com');
      next();
    } catch (err) {
      console.error('Invalid route path detected:', req.originalUrl);
      return res.status(400).json({ error: 'Invalid URL path' });
    }
  };