import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { updateUser,deleteUser,getUser,getUsers } from "../controller/user.js";

const router = express.Router();


router.get("/authenticationverified",verifyToken,(req,res,next)=>{
    res.send("You are authenticated!!");
});
router.get("/checkUser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user, you are logged in and you can delete your account!!");
})
router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello ADMIN, you are logged in and you can delete all accounts!!")
})
//UPDATE
// router.put("/:id",verifyUser,updateUser);
// //DELETE
// router.delete("/:id",verifyUser,deleteUser);
// //GET
// router.get("/:id" ,verifyUser, getUser);
// //GETAll
// router.get("/",verifyAdmin, getUsers);

export default router;