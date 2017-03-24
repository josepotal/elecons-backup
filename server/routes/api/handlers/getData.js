module.exports = (req, res) => {
  const idUser = req.params.id
  const dataUser = require(`../../../data/users/${idUser}.json`)
  res.json (dataUser)
}
