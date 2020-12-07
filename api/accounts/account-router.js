const express = require('express');
const router = express.Router();
const Account = require('./account-model');
router.get('/', async (req, res) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'no accounts data retrieved' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Account.getById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ errorMessage: 'no account with specified ID found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the data' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newAccount = req.body;
    const data = await Account.create(newAccount);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the data' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    await Account.update(id, changes);
    const updated = await Account.getById(id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the data' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Account.delete(id);
    res.json({ message: `Account with the specified ${id} was deleted` });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the data' });
  }
});

module.exports = router;
