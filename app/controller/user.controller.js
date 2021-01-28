const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

//user create
exports.register = async(req, res) => {
    try {
        const userAlreadyExist = await userModel.findOne({ email: req.body.email });

        if (userAlreadyExist) {
            res.json({ status: 201, msg: 'User with same email address is already registerd.' });
        } else {
            let newUser = new userModel({
                name: req.body.name,
                email: (req.body.email).toLowerCase(),
                password: await bcrypt.hashSync(req.body.password),
                is_role: "admin",
                status: "active",
                created_at: new Date().toISOString(),
            });

            await newUser.save();
            res.json({ status: 200, msg: 'Your account created successfully.' });
        }
    } catch (e) {
        res.json({ status: 412, msg: e.message });
    }
}

//user login
exports.login = async(req, res) => {

    const user = await userModel.findOne({ email: (req.body.email.toLowerCase()) });

    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {

            let token = ({
                _id: user._id,
                name: user.name,
                email: user.email,
                is_role: user.is_role
            });
            const tokenData = await jwt.sign({ token }, process.env.SECRETKEY, { expiresIn: '365d' });

            let data = ({
                _id: user._id,
                name: user.name,
                email: user.email,
                is_role: user.is_role,
                created_at: user.created_at
            });

            res.json({ status: 200, token: tokenData, msg: 'User loged in successfully.', data: data })

        } else {
            res.json({ status: 400, msg: 'Invalid email or password.' });
        }

    } else {
        res.json({ status: 400, msg: 'Invalid email or password.' })
    }
}