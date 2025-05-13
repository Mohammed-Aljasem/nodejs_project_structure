const express = require('express');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const BlockedTokensModel = require("./models/BlockedTokensModel");
const http = require('http');
const socketIo = require('socket.io');
const jwt = require("jsonwebtoken");


const server = http.createServer(app)
const io = socketIo(server)
const registerdUsers = {};
const onlineUsers = {};
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        io.emit('message', data);
    });
    socket.on('register', (data) => {
        registerdUsers[data.token] = data.token;
        const user = jwt.verify(data.token, process.env.JWT_SECRET);
        onlineUsers[user.username] = {...user, socket_id: socket.id};
        io.emit('online_users', onlineUsers);
    });

    socket.to('message', (data) => {
        io.emit('message', data);
    });
    socket.on('private_message', ({ send_to, message, send_from }) => {
        if (send_to) {
            io.to(send_to).emit('private_message', {
                send_from,
                message
            });
        }else {
            io.emit('message', {message, username: send_from});
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

var whitelist = ['http://localhost:3000', 'http://localhost:63343']

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // origin: "http://localhost:3000"
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}))

const apiLimiter = rateLimit({
    max: 100,
    windowMs: 1000 * 30,
    message: 'Too many request from this Ip, please try again later',
    handler: async (req, res, next, options) => {
        const blockedTokenModel = new BlockedTokensModel()
        const headers = req.headers['authorization'];
        const token =headers.split(' ')[1];

        await blockedTokenModel.create({token})
        return res.status(options.statusCode).send(options.message);
    }
});
app.use('/', apiLimiter);
i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        preload: ['en', 'ar'], // preload all supported languages
        backend: {
            loadPath: path.join(__dirname, 'locales/{{lng}}.json')
        }
    });

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(middleware.handle(i18next));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'landing.html'));
});
mongoose.connect('mongodb://127.0.0.1:27017/myapp_db', )
    .then(() => {
        console.log('✅ Connected to MongoDB');

        // Start the server *after* successful DB connection
        const PORT = 3000;
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });

