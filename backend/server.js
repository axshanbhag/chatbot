require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

if (process.env.MONGO_URI) {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
} else {
    console.error('❌ MONGO_URI is not defined. Please add it to your .env file.');
}

const chatRoute = require('./routes/chat');
app.use('/api', chatRoute);
app.get('/', (req, res) => {
    res.send('Server is running!');
});

if (process.env.HUGGINGFACE_API_KEY) {
    console.log('✅ HUGGINGFACE_API_KEY is set.');
} else {
    console.error('❌ HUGGINGFACE_API_KEY is not defined. Please add it to your .env file.');
}

if (process.env.MONGO_URI) {
    console.log('✅ MONGO_URI is set.');
} else {
    console.error('❌ MONGO_URI is not defined. Please add it to your .env file.');
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));