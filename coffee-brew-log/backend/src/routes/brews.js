const express = require('express');
const router = express.Router();
const Brew = require('../models/Brew');
const { validateBrew } = require('../middleware/validate');

// GET /api/brews — list all brews, optional ?method= filter
router.get('/', async (req, res) => {
  try {
    const where = {};
    if (req.query.method) {
      where.method = req.query.method;
    }
    const brews = await Brew.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(brews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch brews' });
  }
});

// GET /api/brews/:id — single brew
router.get('/:id', async (req, res) => {
  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) {
      return res.status(404).json({ error: 'Brew not found' });
    }
    res.status(200).json(brew);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch brew' });
  }
});

// POST /api/brews — create a brew
router.post('/', validateBrew, async (req, res) => {
  try {
    const { beans, method, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;
    const brew = await Brew.create({
      beans: beans.trim(),
      method: method.trim(),
      coffeeGrams: Number(coffeeGrams),
      waterGrams: Number(waterGrams),
      rating: Number(rating),
      tastingNotes: tastingNotes.trim(),
    });
    res.status(201).json(brew);
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(e => ({ field: e.path, message: e.message }));
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: 'Failed to create brew' });
  }
});

// PUT /api/brews/:id — update a brew
router.put('/:id', validateBrew, async (req, res) => {
  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) {
      return res.status(404).json({ error: 'Brew not found' });
    }
    const { beans, method, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;
    await brew.update({
      beans: beans.trim(),
      method: method.trim(),
      coffeeGrams: Number(coffeeGrams),
      waterGrams: Number(waterGrams),
      rating: Number(rating),
      tastingNotes: tastingNotes.trim(),
    });
    res.status(200).json(brew);
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(e => ({ field: e.path, message: e.message }));
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: 'Failed to update brew' });
  }
});

// DELETE /api/brews/:id — delete a brew
router.delete('/:id', async (req, res) => {
  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) {
      return res.status(404).json({ error: 'Brew not found' });
    }
    await brew.destroy();
    res.status(200).json({ message: 'Brew deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete brew' });
  }
});

module.exports = router;
