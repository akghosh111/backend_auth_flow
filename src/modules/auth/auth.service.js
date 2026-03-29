import ApiError from "../../common/utils/api-error.js";
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js"


const hashToken = (token) => crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")

const register = async ({name, email, password, role}) => {
    //do user registration


    const existing = await User.findOne({email})
    if(existing) throw ApiError.conflict("Email already exists");

    const {rawToken, hashedToken} = generateResetToken()

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    // TODO: send an email to user with rawToken


    const userObj = user.toObject();

    delete userObj.password
    delete userObj.verificationToken

    return userObj;
}


const login = async ({email, password}) => {
    // take email and find user in db
    // check if password is correct
    // check if verified or not

    const user = await User.findOne({email}).select("+password");
    if(!user) throw ApiError.unauthorized("Invalid email or password");

    const isMatch = await user.comparePassword(password);

    if(!isMatch) throw ApiError.unauthorized("Invalid email or password");

    if(!user.isVerified) {
        throw ApiError.forbidden("Please verify your email before logging in")
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashToken(refreshToken)

    await user.save({ validateBeforeSave: false })

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return {user: userObj, accessToken, refreshToken}


}


const refresh = async (token) => {
    if(!token) throw ApiError.unauthorized("Refresh token missing");
    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded._id).select("+refreshToken");

    if(!user) throw ApiError.unauthorized("User not found");

    if(user.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token");
    }


    const accessToken = generateAccessToken({ id: user._id, role: user.role })

    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashToken(refreshToken)

    await user.save({ validateBeforeSave: false })

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return { accessToken, refreshToken }
}


const logout = async (userId) => {
    await User.findByIdAndUpdate(userId, {refreshToken: null})
}

const forgotPassword = async (email) => {
    const user = User.findOne({email})
    if(!user) throw ApiError.notfound("No account with that email");

    const {rawToken, hashedToken} = generateResetToken();
    user.resetPasswordtoken = hashedToken
    user.resetpasswordExpires = Date.now() + 15 * 60 * 1000;


    await user.save();
}

export {
    register,
    login,
    logout
}