const express = require('express')
const { join } = require('path')
const app = express()

app.use(express.static(join(__dirname, '/app/public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const routes = require('./app/routes')
routes(app)
// require('./routing')(htmlApp)
// require('./app/routing')(app

app.listen(3000)
