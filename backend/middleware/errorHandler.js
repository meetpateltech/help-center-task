const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
  
    if (err.code && err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate key error: A card with this title already exists' });
    }
  
    res.status(500).json({ message: 'Something went wrong' });
  };
  
  module.exports = errorHandler;
  