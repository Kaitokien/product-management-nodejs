const Product = require('../../models/product_model');
const productsHelper = require('../../helpers/products');

// [GET] /
module.exports.index = async (req, res) => {
  // Lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  }).limit(2);
  const newProducts = productsHelper.priceNewProduct(productsFeatured);
  res.render("client/pages/home/index", {
    titlePage: "Trang chủ",
    productsFeatured: newProducts
  }); 
}

//Sau cái exports là tên hàm