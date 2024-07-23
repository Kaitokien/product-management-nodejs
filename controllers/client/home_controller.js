// [GET] /

module.exports.index = (req, res) => {
  res.render("client/pages/home/index", {
    titlePage: "Trang chủ"
  }); 
}

//Sau cái exports là tên hàm