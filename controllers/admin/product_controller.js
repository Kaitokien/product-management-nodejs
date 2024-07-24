const Product = require("../../models/product_model")

const systemConfig = require('../../config/system');

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const { model } = require("mongoose");
// [GET] /admin/products

module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  const filterStatus = filterStatusHelper(req.query);
  
  let find = {
    deleted: false
  };
  
  if(req.query.status)
    find.status = req.query.status;

  const objectSearch = searchHelper(req.query);

  if(objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Pagination
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countProducts
  );

  // End Pagination

  // Sort
  let sort = {};

  if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }

  // End Sort

  const products = await Product.find(find)
  .sort({ position: "desc" })
  .limit(objectPagination.limitItems)
  .skip(objectPagination.skip);

  // console.log(products);

  res.render("admin/pages/products/index", {
    titlePage: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}

// [PATCH] /admin/products/change-status/:status/:id 
//:status, :id là các router động
module.exports.changeStatus = async (req, res) => {
  // console.log(req.params); // param là object chứa các router động
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({_id: id}, {status: status});

  req.flash("success", "Updated Successfully");

  res.redirect("back");
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  // console.log(req.body);
  console.log(type)
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids }}, {status: "active"});
      req.flash("success", `Updated successfully with ${ids.length} item(s)`);
      break;
    
    case "inactive":
      await Product.updateMany({ _id: { $in: ids }}, {status: "inactive"});
      req.flash("success", `Updated successfully with ${ids.length} item(s)`)
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids }}, 
        {
          deleted: true,
          deletedAt: new Date()
        });
        req.flash("success", `Deleted ${ids.length} item(s) successfully`)
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split('-');
        position = parseInt(position);
        await Product.updateOne({_id: id}, {position: position});
      }
      req.flash("success", `Successfully moved ${ids.length} item(s)`)
      break;
    default:
      break;
  }
  res.redirect("back");
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id}); // Xoa vinh vien trong database
  await Product.updateOne(
    {_id: id}, 
    {
      deleted: true,
      deletedAt: new Date()
    }
  );

  res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    titlePage: "Danh sách sản phẩm",
  });
}

module.exports.createPost = async (req, res) => {
  
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  
  // req.body.position = parseInt(req.body.position);

  if(req.body.position === "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    
    const product = await Product.findOne(find);

    res.render("admin/pages/products/edit", {
      titlePage: "Chỉnh sửa sản phẩm",
      product: product
    });
  } catch (error) {
    req.flash("error", "No product found");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(req.file){
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thành công");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại");
  }
  res.redirect("back");
}

module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    
    const product = await Product.findOne(find);
    // console.log(product)

    res.render("admin/pages/products/detail", {
      titlePage: product.title,
      product: product
    });
  } catch (error) {
    req.flash("error", "No product found");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}