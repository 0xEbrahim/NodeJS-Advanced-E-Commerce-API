const setIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

const setObjFilterToBody = (req, res, next) => {
  const { categoryId } = req.params;
  let filterObj = {};
  if (categoryId) filterObj = { category: categoryId };
  req.filterObj = filterObj;
  next();
};

export { setIdToBody, setObjFilterToBody };
