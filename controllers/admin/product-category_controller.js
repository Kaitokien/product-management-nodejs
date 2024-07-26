const ProductCategory = require('../../models/product-category_model');
const systemConfig = require('../../config/system');
const createTreeHelper = require('../../helpers/createTree');

//[GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find);
  const newRecords = await createTreeHelper.tree(records);

  res.render("admin/pages/products-category/index", {
    titlePage: "Danh mục sản phẩm",
    records: newRecords
  })
}

module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };

  const records = await ProductCategory.find(find);
  const newRecords = await createTreeHelper.tree(records);
  res.render("admin/pages/products-category/create", {
    titlePage: "Tạo danh mục sản phẩm",
    records: newRecords
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