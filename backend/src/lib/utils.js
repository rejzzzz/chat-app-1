import jwt from "jsonwebtoken";



const generateJWToken= (userId, res) => { /** might have to change userId to userName
    since i already have it in data model */

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    }  );

    
    res.cookie("authToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        httpOnly: true, 
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'Strict', 
        path: "/"

    });

    return token;
};

export default generateJWToken;