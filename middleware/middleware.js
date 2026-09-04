import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                msg: "Authorization token required",
                mystatus: 401
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                msg: "Invalid token format",
                mystatus: 401
            });
        }

        const decoded = jwt.verify(token, process.env.MY_KEY);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token",
            mystatus: 401
        });
    }
};

export default verifyToken;