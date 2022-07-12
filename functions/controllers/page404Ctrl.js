const error404 = async (req, res) => {
  res.render("pages/page404");
};

module.exports = {
  error404,
};
