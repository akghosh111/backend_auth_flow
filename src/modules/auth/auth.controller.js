import * as authService from "./auth.service.js"
import ApiResponse from "../../common/utils/api-response.js"


const register = async(req, res) => {
    const user = await authService.register(req.body);
    ApiResponse.created(res, "Registration success", user)
}

const login = async(req, res) => {
    const {user, accessToken, refreshToken} =await authService.login(req.body)

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.ok(res, "Login successful", {user, accessToken})

}


const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { accessToken } = await authService.refresh(token);
  ApiResponse.ok(res, "Token refreshed", { accessToken });
};

const logout = async(req, res) => {
    await authService.logout(req.user.id);
    res.clearCookie("refreshToken");
    ApiResponse.ok(res, "Logout Success")
}


const forgotPassword = async (req, res) => {
  await authService.forgotPassword(req.body.email);
  ApiResponse.ok(res, "Password reset email sent");
};


const resetPassword = async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);
  ApiResponse.ok(res, "Password reset successful");
};

const getMe = async(req, res) => {
    const user = await authService.getMe(req.user.id);
    ApiResponse.ok(res, "User Profile", user);
}


const verifyEmail = async(req, res) => {
    const{verificationToken} = req.params;
    await authService.verifyEmail(verificationToken);
    ApiResponse.ok(res, "Email Verified")
}


export {register, login, logout, getMe, verifyEmail, refreshToken, forgotPassword, resetPassword}