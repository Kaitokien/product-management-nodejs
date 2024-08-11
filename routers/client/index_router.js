const homeRouters = require('./home_router.js')
const productRouters = require('./product_router.js')
const categoryMiddleware = require('../../middlewares/client/category_middleware.js');

module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use('/', homeRouters);

  //(req, res) => {
      // res.render("client/pages/home/index"); //Ở sẵn trong mục views rồi nên không cần thêm nữa
  //}
  // Phần comment trên được thay bằng homeRouters
  app.use('/products', productRouters);
  // Dòng 6: luôn sử dụng categoryMiddleware.category để sau này có nhân bản thêm nữa thì các trang luôn sử dụng categoryMiddleware.category
}