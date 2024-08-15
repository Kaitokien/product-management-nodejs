const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const orderSchema = new mongoose.Schema({
    // user_id: String,
    cart_id: String,
    user_info: {
      fullName: String,
      phone: String,
      address: String
    },
    products: [
      {
        product_id: String,
        price: Number,
        discountPercentage: Number,
        quantity: Number
      }
    ],
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema, "orders")

module.exports = Order;

/* Vì sao vẫn phải lưu thêm thuộc tính products, 
dù chúng ta có thể truy vấn sử dụng product_id?*/
/* Vì:
- Sau khi đặt hàng xong, đơn hàng có thể bị xóa và lúc đấy mảng products sẽ bị rỗng
- Sau khi đặt đơn hàng xong, tuy nhiên sau đó sản phẩm nằm trong đơn hàng lại được khuyến mại nên 
giá cả hàng hóa sẽ không được chính xác */
