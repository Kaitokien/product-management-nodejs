const ProductCategory = require('../../models/product-category_model');
const systemConfig = require('../../config/system');

//[GET] /admin/products-category
module.exports.index = (req, res) => {
  res.render("admin/pages/products-category/index", {
    titlePage: "Danh mục sản phẩm"
  })
}

module.exports.create = (req, res) => {
  res.render("admin/pages/products-category/create", {
    titlePage: "Tạo danh mục sản phẩm"
  })
}

module.exports.createPost = async (req, res) => {
  if(req.body.position === "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  
  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}