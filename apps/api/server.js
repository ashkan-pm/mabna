const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
app.use(cors())

const assets = require('./assets.json').data
const trades = require('./trades.json').data
const bidasks = require('./bidasks.json').data

app.get('/assets', (req, res) => {
  res.json({ data: assets })
})

app.get('/assets/:id', (req, res) => {
  res.json({ data: assets.filter((q) => q.entity.id === req.params.id) })
})

app.get('/trades', (req, res) => {
  const assetId = req.query.asset_id
  let data = trades
  if (assetId) {
    data = trades.filter((q) => q.entity.id === assetId)
  }
  res.json({ data })
})

app.get('/bidasks', (req, res) => {
  const assetId = req.query.asset_id
  let data = bidasks
  if (assetId) {
    data = bidasks.filter((q) => q.entity.id === assetId)
  }
  res.json({ data })
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
