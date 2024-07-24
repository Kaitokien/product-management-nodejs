const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/product_controller")
const multer = require('multer');

// const storageMulter = require('../../helpers/storageMulter');

const upload = multer();
const validate = require('../../validates/admin/product_validate');
const uploadCloudinary = require('../../middlewares/admin/uploadCloudinary_middleware');

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post('/create',
  upload.single("thumbnail"),
  uploadCloudinary.upload,
  validate.createPost,  
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id", 
  upload.single("thumbnail"),
  uploadCloudinary.upload,
  validate.createPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;