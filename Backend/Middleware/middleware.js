import jwt from "jsonwebtoken"


export const isAuthenticated = async (req, res, next) => {
    try {
       
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({
                message: "user not authenticated",
                success: false,
            })
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        const decode = jwt.verify(token, secretKey)
        if (!decode) {
            res.status(401).json({
                message: "Invalid token",
                success: false,
            })
        }
        req.id = decode.userId;

        next();

    }
    catch (e) {
        console.log(e);

    }
} 