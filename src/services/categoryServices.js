import Category from '../models/categoryModel.js';
import slugify from 'slugify'

const getCategory = (req, res, next ) => {

}

const createCategory = async(req, res, next) => {
    const {name} = req.body;
    if(!name)
        return res.sendStatus(401);
    const newCategory = await Category.create({name,slug: slugify(name)});
    res.status(201).json({data : newCategory});
}

export { createCategory, getCategory };