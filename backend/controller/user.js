import User from "../models/User.js";

export const updateUser = async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedUser);
    }
    catch(err){
        next(err);
    }
};

export const deleteUser = async(req,res)=>{
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteUser);
    }
    catch(err){
        next(err);
    }
};

export const getUser = async(req,res)=>{
    try{
        const getUser = await User.findById(req.params.id);
        res.status(200).json(getUser);
    }
    catch(err){
        next(err);
    }
};

export const getUsers = async(req,res)=>{
    try{
        const getUsers = await User.find();
        res.status(200).json(getUsers);
    }
    catch(err){
        next(err);
    }
}




