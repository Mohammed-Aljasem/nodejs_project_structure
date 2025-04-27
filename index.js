const express = require('express');
const app = express();
const userRoutes = require('./routes/usersRoutes');
app.use(express.json());
const mongoose = require('mongoose');

// Use the user routes
app.use('/users', userRoutes);
// Home route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
mongoose.connect('mongodb://127.0.0.1:27017/myapp_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('✅ Connected to MongoDB');

        // Start the server *after* successful DB connection
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });

