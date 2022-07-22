const jwt = require('jsonwebtoken');
const error404Page = async (req, res) => {
  
  const decoded = jwt.verify(req.session.token, 'klfkawefoauiwhnefiua');
  res.render("pages/404", { name:decoded.data.name });
};

module.exports = {
  error404Page,
};
