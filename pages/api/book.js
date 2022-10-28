export default async function book(req, res) {
    const books = [
        {
            title: "Kurir Hidayah",
            author: "Muda Berdakwah",
            publisher: "Teman Nulis",
            sinopsis: "hidayah bagi setiap manusia"
        },
        {
            title: "Kurir Sedekah",
            author: "Muda Berdakwah",
            publisher: "Teman Nulis",
            sinopsis: "hidayah bagi setiap manusia"
        }
    ]

    try {
        const data = books

        res.status(200).json({msg: "Data Berhasil diambil", data,})
    } catch (error) {
        res.status(400).json({msg: "Gagal Mengambil data"})
    }
}