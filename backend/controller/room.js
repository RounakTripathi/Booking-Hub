import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// Create Room
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (err) {
            return next(err); // If updating hotel fails, handle error
        }

        res.status(201).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

// Update Room
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedRoom) return next(createError(404, "Room not found"));

        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

// Delete Room
export const deleteRoom = async (req, res, next) => {
    try {
        // ✅ Find the room first to get the hotelId
        const room = await Room.findById(req.params.id);
        if (!room) return next(createError(404, "Room not found"));

        // ✅ Delete the room
        await Room.findByIdAndDelete(req.params.id);

        // ✅ Update the hotel (remove the room from its rooms array)
        await Hotel.findByIdAndUpdate(room.hotelId, { 
            $pull: { rooms: req.params.id } 
        });

        res.status(200).json({ message: "Room deleted successfully" });
    } catch (err) {
        next(err);
    }
};

// Get a Single Room
export const getRoom = async (req, res, next) => {
    try {
        const gotRoom = await Room.findById(req.params.id);
        if (!gotRoom) return next(createError(404, "Room not found"));

        res.status(200).json(gotRoom);
    } catch (err) {
        next(err);
    }
};

// Get All Rooms
export const getRooms = async (req, res, next) => {
    try {
        const gotRooms = await Room.find();
        res.status(200).json(gotRooms);
    } catch (err) {
        next(err);
    }
};
