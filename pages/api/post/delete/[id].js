import db from "../../../../libs/db.js"
import authorization from "../../../../middlewere/authorization.js";

export default async function handler(req, res){
    if (req.method !== "DELETE") {
        return res.status(400).json({msg: "Method Not Allowed"})
    }

    await authorization(req,res)

    const {id} = req.query;

    await db("posts").where({id}).del()

    res.status(200).json({msg: "Berhasil menghapus data!"})
}