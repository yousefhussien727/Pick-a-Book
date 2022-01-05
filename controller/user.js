const accSchema = require('../model/account');
const path = require('path');

function displaySignIn(req, res, next) {
    res.type('html');
    res.sendFile(path.join(__dirname, '../view/signIn.html'));
}

async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        console.log("Users Retrieved: " + users);
        res.status(200).json({ success: true, data: users })

    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false })
    }
}

async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        console.log("User Retrieved: " + user);
        res.status(200).json({ success: true, data: user })
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false })
    }
}

async function createUser(req, res, next) {
    // const user = {
    //     accountID: 111,
    //     type: "User",
    //     fname: "Basel",
    //     lname: "Marawan",
    //     email: "basel@gmail.com",
    //     password: "b123",
    // };
    const user = await User.create(req.body);

    new accSchema(user).save()
        .then(user => {
            console.log('A New Account is added: ' + user);
            return res.json({ success: true, message: 'A New Account is added: ' + user });
        })
        .catch(err => {
            console.log('Database Error: ' + err);
            return res.json({ success: false, message: 'Database Error: ' + err });
        })
}

async function updateUser(req, res, next) {
    // const user = {
    //     accountID: 111,
    //     type: "User",
    //     fname: "Basel",
    //     lname: "Marawan",
    //     email: "basel@gmail.com",
    //     password: "b123",
    // };

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!user) {
        console.log(err);
        return res.status(400).json({ success: false })
    }
    console.log("User Updated: " + user);
    res.status(200).json({ success: true, data: user });
}

async function deleteUser(req, res, next) {

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            console.log(err);
            return res.status(400).json({ success: false });
        }
        console.log("User Deleted: " + user);
        res.status(200), json({ success: true, data: {} });

    } catch (err) {
        console.log(err);
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