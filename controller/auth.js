import { create, findOne, matchPassword, getSignedJwtToken as _getSignedJwtToken } from '../models/User'
import { sign } from 'jsonwebtoken'
import ErrorResponse from '../utils/ErrorResponse'
import auth from '../routes/auth'
const getSignedJwtToken = id => {
    return sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE

    })
}

const token = getSignedJwtToken(user._id);
res.status(200).json({ success: true, token })

export async function register(req, res, next) {
    const { firstName, lastName, email, password } = req.body;


    // create:

    const user = await create({
        firstName,
        lastName,
        email,
        password
    })
    res.status(200).json({ success: true, token, id })

}
export async function login(req, res, next) {

    const { email, password } = req.body;

    // check validity
    if (!email || !password) {

        return next(new ErrorResponse('Please enter an email and password', 400));

    }
    const user = await findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid info', 401));
    }
    const isMatch = await matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse('Invalid info', 401));
    }
    const token = _getSignedJwtToken();
    const id = user.getId();
    res.status(200).json({ success: true, token, id })
}

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        // Specify the CLIENT_ID of the app that accesses the backend
        audience: GOOGLE_CLIENT_ID,

    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

}
verify().catch(console.error);

export default auth;