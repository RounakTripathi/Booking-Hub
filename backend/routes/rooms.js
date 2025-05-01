import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controller/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:hotelId",createRoom);
//UPDATE
router.put("/:id",verifyAdmin,updateRoom);
//DELETE
router.delete("/:id",deleteRoom);
//GET
router.get("/:id", getRoom)
//GETAll
router.get("/", getRooms);

export default router;