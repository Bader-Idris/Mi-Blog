const { article: potato } = require('../models/sql/articlesDB')


const littleQuery = 'SELECT 1 + 2';
const articlesDB = (req, res) => {
  potato.query(littleQuery, (err, result) => {// potato is a way i tested changing the name!
    if (err) return res.status(500).json({ error: 'Internal error' });
    else return res.json(result.rows[0]);
  });
}
module.exports = { articlesDB }