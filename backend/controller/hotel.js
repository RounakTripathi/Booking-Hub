import Hotel from "../models/Hotel.js";

export const createHotel = async(req,res)=>{
    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        res.status(500).json(err)
    }
};

export const updateHotel = async(req,res)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
        res.status(200).json(updatedHotel);
    }
    catch(err)
    {
        res.status(500).json(err);  
    }
};

export const deleteHotel = async(req,res)=>{
    try{
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.sendStatus(200).json(deleteHotel);
    }
    catch(err){
        res.sendStatus(500).json(err);
    }
};

export const getHotel = async(req,res)=>{
    try{
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel);
    }
    catch(err){
        next(err);
    }
};

export  const getAllHotel = async(req,res)=>{
    try{
        const allhotel = await Hotel.find();
        res.sendstatus(200).json(allhotel);
    }
    catch(err){
        res.sendstatus(500).json(err);
    }
};
