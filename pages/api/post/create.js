import db from "../../../libs/db.js";
import authorization from "../../../middlewere/authorization.js";

export default async function handler(req, res) {
    if (req.method !== "POST"){
        return res.status(405).json({msg: "Method Not Allowed"}).end()
    }

    await authorization(req, res)

    const data = JSON.parse(req.body)
    const {title, content} = data

    const create = await db("posts").insert({
        title,
        content
    });

    const result = await db("posts").where("id", create).first()

    res.status(200);
    res.json({
        msg: "Success",
        data: result
    })
}