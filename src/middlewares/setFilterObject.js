const setToBody = (req, res, next) => {
     const { categoryId } = req.params;
  let filterObj = {};
  if (categoryId) filterObj = { category: categoryId };
  req.filterObj = filterObj;
  next();
}

export {setToBody}