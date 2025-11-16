const Contact = require('../models/contactModel');

const submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Message sent', contact });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { submitContact };
