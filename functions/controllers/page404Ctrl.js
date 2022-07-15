const error404Page = async (req, res) => {
  res.render("pages/404");
};

module.exports = {
  error404Page,
};
