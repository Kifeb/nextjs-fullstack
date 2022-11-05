import db from "../../../../libs/db.js"
import authorization from "../../../../middlewere/authorization.js";

export default async function handler(req, res){

    if (req.method !== "PUT") {
        return res.status(400).json({msg: "Method Not Allowed"})
    }

    await authorization(req,res)

    const {id} = req.query;
    console.log(id);

    const {title, content} = req.body;
    console.log(title);
    await db("posts").where({id}).update({
        title,
        content
    })

    const data = await db("posts").where({id}).first()


    res.status(200).json({msg: "Post Succesesfully"})
}