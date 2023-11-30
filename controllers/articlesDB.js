const { article: potato } = require('../middleware/db/articlesDB')


const littleQuery = "SELECT (5 + 5) AS count;";
const articlesDB = (req, res) => {
  potato.query(littleQuery, (err, result) => {// potato is a way i tested changing the name!
    if (err) return res.status(500).json({ error: 'Internal error' });
    else {
      const rows = result.rows;
      const formattedRows = rows.map(row => Object.values(row).join('\t'));
      return res.json(formattedRows);
    };
  });
}
module.exports = { articlesDB };