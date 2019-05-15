const friends = require('../data')

module.exports = app => {
  app.get('/friends', (req, res) => {
    res.json(friends)
  })
  app.post('/friends', (req, res) => {
    let newFriend = req.body
    friends.push(newFriend)
    res.send(friends)
  })
}
