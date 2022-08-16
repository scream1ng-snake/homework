const users = [
  {id: 1, name: "Snickers"},
  {id: 2, name: "KitKat"},
  {id: 3, name: "Oreo"},
  {id: 4, name: "Mars"},
]

function getUsers(req, res) {
  if(req.params.id) {
    return res.send(users.find(user => user.id == req.params.id));
  }
  res.end(JSON.stringify(users));
}

function createUser(req, res) {
  const user = req.body;
  users.push(user);
  res.end(JSON.stringify(users));
}

module.exports = {
  getUsers,
  createUser
}