const Cart = require('../../models/cart_model');

module.exports.cartId = async (req, res, next) => {
  if(!req.cookies.cartId) {
    // Tạo giỏ hàng
    const cart = new Cart();
    await cart.save();
    const expiresCookie = 365 * 24 * 60 * 60 * 1000;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie)
    });
    // console.log(cart);
  } else {
    // Lay gio hang ra
  }
  next();
}