import db from "../../../libs/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res){
    if (req.method !== "POST") return res.status(405).json({msg: "Method Not Allowed"})

    const {email,password} = req.body;

    const checkUser = await db("users").where({email}).first().debug()
    if (!checkUser) return res.status(401).json({msg: "Email Tidak Ada"})

    const checkPass = await bcrypt.compare(password, checkUser.password)
    if(!checkPass) return res.status(401).json({msg: "Password Salah"})

    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.email
    }, "w78vcwguviuwbviua", {
        expiresIn: "1d"
    })

    res.status(200).json({msg: "Berhasil Login", token,})
}