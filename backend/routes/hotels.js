import express from "express";
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controller/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//CREATE
router.post("/",createHotel);
//UPDATE
router.put("/:id",verifyAdmin,updateHotel);
//DELETE
router.delete("/:id",verifyAdmin,deleteHotel);
//GET
router.get("/:id" , getHotel)
//GETAll
router.get("/", getAllHotel);
  
export default router;