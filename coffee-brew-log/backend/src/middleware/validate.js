function validateBrew(req, res, next) {
  const { beans, method, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;
  const errors = [];

  if (!beans || String(beans).trim() === '') {
    errors.push({ field: 'beans', message: 'Beans field is required' });
  }
  if (!method || String(method).trim() === '') {
    errors.push({ field: 'method', message: 'Method is required' });
  }
  if (coffeeGrams === undefined || coffeeGrams === null || coffeeGrams === '') {
    errors.push({ field: 'coffeeGrams', message: 'Coffee grams is required' });
  } else if (Number(coffeeGrams) <= 0) {
    errors.push({ field: 'coffeeGrams', message: 'Coffee grams must be greater than 0' });
  }
  if (waterGrams === undefined || waterGrams === null || waterGrams === '') {
    errors.push({ field: 'waterGrams', message: 'Water grams is required' });
  } else if (Number(waterGrams) <= 0) {
    errors.push({ field: 'waterGrams', message: 'Water grams must be greater than 0' });
  }
  if (rating === undefined || rating === null || rating === '') {
    errors.push({ field: 'rating', message: 'Rating is required' });
  } else if (Number(rating) < 0 || Number(rating) > 5) {
    errors.push({ field: 'rating', message: 'Rating must be between 0 and 5' });
  }
  if (!tastingNotes || String(tastingNotes).trim() === '') {
    errors.push({ field: 'tastingNotes', message: 'Tasting notes are required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = { validateBrew };
