const Product = require("../../models/product_model")
const productsHelper = require('../../helpers/products');

// [GET] /products
module.exports.index = async (req, res) => { //Xóa product đi vì ở bên index_router đã có products rồi
  const products = await Product.find({
      status: "active",
      deleted: false
  }).sort({ position: "desc" });

  const newProducts = productsHelper.priceNewProduct(products);

  // console.log(newProducts);
  res.render("client/pages/products/index", {
      titlePage: "Trang danh sách sản phẩm",
      products: newProducts
  });
}

module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "active"
    }
    
    const product = await Product.findOne(find);

    res.render("client/pages/products/detail", {
      titlePage: product.title,
      product: product
    });
  } catch (error) {
    req.flash("error", "No product found");
    res.redirect(`/products`);
  }
}