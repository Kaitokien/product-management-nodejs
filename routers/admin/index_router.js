const dashboardRouters = require('./dashboard_router.js')
const systemConfig = require("../../config/system.js")
const productRouters = require('./product_router.js');
const deletedProducts = require('./deleted_product_router.js');
const productCategoryRouter = require('./product-category_router.js');
const rolesRouter = require('./roles_router');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', dashboardRouters);
    app.use(PATH_ADMIN + '/products', productRouters);
    app.use(PATH_ADMIN + '/deleted-products', deletedProducts);
    app.use(PATH_ADMIN + '/products-category', productCategoryRouter);
    app.use(PATH_ADMIN + '/roles', rolesRouter);
}