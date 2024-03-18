const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getSingleUser = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json(user)

    } catch (error) {
        res.status(500).json({ message: "Internal Server error" })

    }
}

const createUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, email, password: hashedPassword });
    try {
        await user.save();
        res.status(201).send('User created Successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
const getAuthToken = async (req, res) => {
    const { username, password } = req.body;
    const name = User.find({
        "$or": [{
            "username": username
        }, {
            "email": username
        }]
    });
    name.then(async (data) => {
        if (data?.length > 0) {
            const passwordMatch = await bcrypt.compare(password, data[0].password);
            if (passwordMatch) {
                const token = jwt.sign({ ...data[0] }, 'secretkey', { expiresIn: '1h' });
                res.status(200).json({ 'message': 'User Login Succesfully', 'token': token.toString() });

            }
            else {
                res.status(400).json({ 'message': 'Wrong Password' });
            }
        }
        else {
            res.status(400).json({ 'message': 'Wrong username or password' });
        }
    })
}

const deleteUser = async (req, res) => {
    try {
        await User.remove({ _id: req.params.userId })
        res.status(200).json({ message: "Done", })

    } catch (error) {
        res.json(error)

    }
}


module.exports = { getUsers, getSingleUser, deleteUser, createUser,getAuthToken };