const homeRouters = require('./home_router.js')
const productRouters = require('./product_router.js')

module.exports = (app) => {
  app.use('/', homeRouters);

  //(req, res) => {
      // res.render("client/pages/home/index"); //Ở sẵn trong mục views rồi nên không cần thêm nữa
  //}
  // Phần comment trên được thay bằng homeRouters
  app.use('/products', productRouters);
}