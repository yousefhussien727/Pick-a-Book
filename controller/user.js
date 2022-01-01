const bookSchema = require('../model/book');
const path = require('path');

function displaySignIn(req, res, next) {
    res.type('html');
    res.sendFile(path.join(__dirname, '../view/signIn.html'));
}

async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users })

    } catch (err) {
        res.status(400).json({ success: false })
    }
}

async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ success: true, data: user })

    } catch (err) {
        res.status(400).json({ success: false })
    }
}
async function createUser(req, res, next) {
    const user = await User.create(req.body)
    res.status(201).json({ success: true, data: user });

}
async function updateUser(req, res, next) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!user) {
        return res.status(400).json({ success: false })
    }
    res.status(200).json({ success: true, data: user });
}

async function deleteUser(req, res, next) {

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(400).json({ success: false });
        }

        res.status(200), json({ success: true, data: {} });

    } catch (err) {
        res.status(400).json({ success: false });
    }
}

module.exports = {
    displaySignIn: displaySignIn,
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
};