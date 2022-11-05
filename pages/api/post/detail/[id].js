import jwt from "jsonwebtoken";
import db from "../../../../libs/db.js"
import authorization from "../../../../middlewere/authorization.js";


export default async function handler(req, res){
    // Query Database
    if(req.method !== "GET") return res.status(405).json({msg: "Method Not Allowed"})
    const {id} = req.query;

    await authorization(req, res);

    const post =  await db("posts").where({id}).first()
    if(!post) return res.status(404).json({msg: "Data Not Found"})

    try {
        res.status(200).json({msg: "Berhasil Mengambil data", data: post})    
    } catch (error) {
        res.status(401).json({msg: error.message})
    }


}