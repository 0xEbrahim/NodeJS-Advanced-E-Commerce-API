
const setToBody = (req, res, next) => {
    if(!req.body.category)
        req.body.category = req.params.categoryId;
    next();
}

export {setToBody}