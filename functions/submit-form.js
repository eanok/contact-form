const mongoose = require('mongoose');

exports.handler = async function (event, context) {
  try {
    mongoose.connect('mongodb+srv://eanok:eanok@cluster0.6hrr0vk.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

    const ContactSchema = new mongoose.Schema({
      name: String,
      email: String,
      message: String,
    });

    const Contact = mongoose.model('Contact', ContactSchema);

    const { name, email, message } = JSON.parse(event.body);

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
