import jwt from "jsonwebtoken";



const generateJWToken= (userId, res) => { /** might have to change userId to userName
    since i already have it in data model */

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    }  );

    // for security, performance, user experience
    res.cookie("authToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days in milliseconds
        httpOnly: true, // prevents from XSS attacks
        secure: process.env.NODE_ENV !== "development", // ensures cookies are only sent over HTTPS
        sameSite: 'Strict', // prevents CSRF

    });

    return token;
};

export default generateJWToken;