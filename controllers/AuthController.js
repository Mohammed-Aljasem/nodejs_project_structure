const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
    static async login(req, res){
        const { email, password } = req.body;
        const userModel = new User();
        const user = (await userModel.whereMore({email}))?.[0];
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { email: user.email, id: user._id, username: user.username, name: user.name, avatar: user.avatar },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        userModel.update(user.id, {token})
        res.json({ token, email: user.email, username: user.username });
    }

    static async register(req, res) {
        const {email, password,} = req.body;
        const userModel = new User();
        const userExists = (await userModel.whereMore({email}))?.[0];
        if (userExists) return res.status(400).json({message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({...req.body, password: hashedPassword})

        res.status(201).json({message: 'User registered successfully'});
    }
}

module.exports = AuthController;
