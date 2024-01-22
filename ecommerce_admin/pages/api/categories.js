import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
    //connection and method 
    const { method } = req;
    await mongooseConnect()

    //category get request
    if (method === 'GET') {
        res.json(await Category.find({}).populate('parent'))
    }

    //post product request
    if (method === 'POST') {
        const { name, parentCategory, properties } = req.body;
        const parentCategoryObject = await Category.findOne({ _id: parentCategory });
        const categoryDoc = await Category.create({
            name,
            parent: parentCategoryObject ? parentCategoryObject._id : undefined,
            properties,
        });
        res.json(categoryDoc);
    }

    //Put product request
    if (method === 'PUT') {
        const { _id, name, parentCategory, properties } = req.body;
        const categoryDoc = await Category.updateOne({ _id }, {
            name,
            parent: parentCategory || undefined,
            properties
        });
        res.json(categoryDoc);
    }

    //Delete product request
    if (method === 'DELETE') {
        const { _id } = req.query;
        await Category.deleteOne({ _id });
        res.json('ok');
    }
}