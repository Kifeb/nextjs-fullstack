import jwt from "jsonwebtoken";

export default function authorization(req, res){
    return new Promise((resolve, reject) => {
        // Cek Header authorization
        const {authorization} = req.headers;
        if(!authorization) return res.status(401).json({msg: "Gagal Login"})

        // Pisahkan Bearer dan Tokennya
        const authHeader = authorization.split(" ");
        const [head, token] = [authHeader[0], authHeader[1]];
        // Cek type token
        if(head !== "Bearer") return res.status(403).json({msg: "Salah Type Auth"})
        
        //mencocokkan token dengan secretKey
        const verify = jwt.verify(token, "w78vcwguviuwbviua", (err, decoded) => {
            if(err) return res.status(401).json({msg: err.message})

            return resolve(decoded)
        })
    })
}
