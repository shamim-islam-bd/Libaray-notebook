
// // create and send Token and save into cookie
exports.sendToken = (user, res, statusCode) => {
    // Create jwt token.
    const token = user.getJwtToken();
    console.log('token from getjwtToken: ', token);

    // Options for cookie.
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode).cookie('token', token, options).json({
        token,
        user
    });
 }