import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    //connection and method 
    const { method } = req;
    await mongooseConnect()

    //post product request
    if (method === 'POST') {
        const { title, description, price } = req.body

        const productDoc = await Product.create({
            title,
            description,
            price
        })
        res.json(productDoc)
    }
}