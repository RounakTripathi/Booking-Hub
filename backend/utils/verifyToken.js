import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"   Not authenticated!!"));
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){return next(createError(403,"Not a verified user"));}
        if (!user || !user.id) {
            console.log("Error: Token decoded, but no user ID found!");
            return next(createError(403, "Invalid token payload!"));
        }
        req.user = user;
        next();
    })
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next(); 
        } else {
            return next(createError(403, "Not authorized!"));
        }
    });
};


export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if (!req.user) {
            console.log("Error: req.user is undefined in verifyAdmin");
            return next(createError(403, "User not found in request!"));
        }

        if (req.user.isAdmin === undefined) {
            console.log("Error: isAdmin property is missing in token payload!");
            return next(createError(403, "Invalid token payload! isAdmin missing."));
        }

        if (!req.user.isAdmin) {
            return next(createError(403, "You are not authorized! Admin access required."));
        }

        next();
    })
}