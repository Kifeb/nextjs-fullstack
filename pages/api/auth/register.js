import db from "../../../libs/db.js";
import bcrypt from 'bcryptjs'

export default async function handler(req, res){
    if(req.method !== "POST") return res.status(405).json({msg: "Method Not Allowed"})
    const {email, password} = req.body


    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt)

    const register = await db("users").insert({
        email,
        password: passwordHash
    })

    const registeredUser = await db("users").where({id: register}).first().debug()

    res.status(200).json({msg: "Berhasil Mendaftar", data: registeredUser})
}