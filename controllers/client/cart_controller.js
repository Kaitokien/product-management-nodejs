const Cart = require("../../models/cart_model");

// [POST] /cart/:productId
module.exports.add = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;

  const cart = await Cart.find({
    _id: cartId
  })
  // console.log(cart.products);

  const existProductInCart = cart.products.find(item => item.product_id == productId);
  console.log(existProductInCart)

  if(existProductInCart) {
    const quantityNew = quantity + existProductInCart.quantity;
    await Cart.updateOne({
      _id: cartId,
      "products.product_id": productId
    }, {
      $set: {
        "products.$.quantity": quantityNew
      }
    })
  } else {
    const objectCart = {
        product_id: productId,
        quantity: quantity
      }

      await Cart.updateOne({
        _id: cartId
      },
      {
        $push: { products: objectCart }
      }
    )
  }
  req.flash('success', 'Đã thêm sản phẩm vào giỏ hàng')
  res.redirect('back');
}