// [GET] /admin/dashboard

module.exports.dashboard = (req, res) => {
    // res.send('<h1>Trang tổng quan</h1>')
    res.render("admin/pages/dashboard/index", {
        titlePage: "Trang tổng quan"
    });
}
